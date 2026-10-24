import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { XenoRequest } from '../../types'

const { guards, sanitizeHelper } = vi.hoisted(() => ({
  guards: {
    isDefined: vi.fn((value: unknown) => value !== undefined && value !== null),
    isString: vi.fn((value: unknown) => typeof value === 'string'),
    isObject: vi.fn((value: unknown) => typeof value === 'object' && value !== null),
    isArray: vi.fn((value: unknown) => Array.isArray(value)),
  },
  sanitizeHelper: {
    stripControlChars: vi.fn(
      (value: string, maxLength: number = Number.MAX_SAFE_INTEGER): string | undefined => {
        if (value === 'DROP') return undefined
        return Array.from(value)
          .filter((character) => character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127)
          .join('')
          .slice(0, maxLength)
      },
    ),
    sanitizeObject: vi.fn((obj: unknown) => obj), // Aggiunto per evitare errori sul mock
  },
}))

// FIX: Usare i percorsi relativi invece del nome del pacchetto NPM
vi.mock('../guards.utils', () => ({ Guards: guards }))
vi.mock('../sanitize.utils', () => ({ SanitizeHelper: sanitizeHelper }))

import { HttpRouteParamHelper, RoutePatternHelper } from '../route.utils'

interface RequestOptions {
  contentType?: string
  jsonData?: unknown
  jsonError?: Error
  textData?: string
  textError?: Error
}

function makeRequest(method: string, url: string, path: string, options: RequestOptions = {}) {
  const json = vi.fn(async () => {
    if (options.jsonError !== undefined) throw options.jsonError
    return options.jsonData
  })
  const text = vi.fn(async () => {
    if (options.textError !== undefined) throw options.textError
    return options.textData ?? ''
  })
  const headers = {
    get: vi.fn((name: string) => (name === 'content-type' ? (options.contentType ?? null) : null)),
  }
  const query = HttpRouteParamHelper.extractQueryParams(url)

  const request = { method, url, path, headers, json, text, query } as unknown as XenoRequest

  return { request, json, text, headers }
}

describe('RoutePatternHelper', () => {
  it.each([
    ['  users/  ', '/users'],
    ['/users///', '/users'],
    ['   ', '/'],
    ['/', '/'],
  ])('normalizes path %j to %j', (path, expected) => {
    expect(RoutePatternHelper.normalizePath(path)).toBe(expected)
  })

  it.each([
    ['/users/:id', true],
    ['/users/{id}', true],
    ['/users/{id', false],
    ['/users', false],
  ])('identifies whether %s is dynamic', (path, isDynamic) => {
    expect(RoutePatternHelper.isDynamicPath(path)).toBe(isDynamic)
  })

  it('creates patterns for parameterized and escaped static segments', () => {
    const colonPattern = RoutePatternHelper.createRoutePattern('/users/:user-id')
    const bracePattern = RoutePatternHelper.createRoutePattern('/files/{file}')
    const escapedPattern = RoutePatternHelper.createRoutePattern('/items/a.b+')
    const rootPattern = RoutePatternHelper.createRoutePattern('/')

    expect(colonPattern.test('/users/42')).toBe(true)
    expect(colonPattern.test('/users/')).toBe(false)
    expect(bracePattern.test('/files/report')).toBe(true)
    expect(escapedPattern.test('/items/a.b+')).toBe(true)
    expect(escapedPattern.test('/items/axb+')).toBe(false)
    expect(rootPattern.test('/')).toBe(true)
  })

  it('parses normalized static and dynamic route patterns', () => {
    const staticRoute = RoutePatternHelper.parse(' /health/ ')
    const dynamicRoute = RoutePatternHelper.parse('/users/:id/')

    expect(staticRoute.isDynamic).toBe(false)
    expect(staticRoute.pattern.test('/health')).toBe(true)
    expect(dynamicRoute.isDynamic).toBe(true)
    expect(dynamicRoute.pattern.test('/users/abc')).toBe(true)
  })
})

describe('HttpRouteParamHelper', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    guards.isObject.mockImplementation(
      (value: unknown) => typeof value === 'object' && value !== null,
    )
    sanitizeHelper.stripControlChars.mockImplementation(
      (value: string, maxLength: number = Number.MAX_SAFE_INTEGER): string | undefined => {
        if (value === 'DROP') return undefined
        return Array.from(value)
          .filter((character) => character.charCodeAt(0) >= 32 && character.charCodeAt(0) !== 127)
          .join('')
          .slice(0, maxLength)
      },
    )
    sanitizeHelper.sanitizeObject.mockImplementation((obj: unknown) => obj)
  })

  it('extracts colon and brace path parameters, decodes and sanitizes their values', () => {
    expect(
      HttpRouteParamHelper.extractPathParams(
        '/users/:id/files/{name}',
        '/users/a%20b/files/report%0A.txt',
      ),
    ).toEqual({ id: 'a b', name: 'report.txt' })
  })

  it('skips parameters whose matching path segment is missing', () => {
    expect(HttpRouteParamHelper.extractPathParams('/users/:id/:tab', '/users')).toEqual({})
  })

  it('throws when a path parameter contains invalid URI encoding', () => {
    expect(() => HttpRouteParamHelper.extractPathParams('/users/:id', '/users/%E0%A4%A')).toThrow(
      URIError,
    )
  })

  it('extracts, sanitizes, truncates and overwrites duplicate query parameters', () => {
    const query = HttpRouteParamHelper.extractQueryParams(
      'http://localhost/search?term=first&term=last%0Avalue&bad%00key=value',
    )

    expect(query).toEqual({ term: 'lastvalue', badkey: 'value' })
    expect(sanitizeHelper.stripControlChars).toHaveBeenCalledWith('term', 64)
    expect(sanitizeHelper.stripControlChars).toHaveBeenCalledWith('last\nvalue', 512)
  })

  it('drops query entries when sanitization returns an undefined key or value', () => {
    expect(
      HttpRouteParamHelper.extractQueryParams('/search?DROP=value&keep=DROP&valid=yes'),
    ).toEqual({
      valid: 'yes',
    })
  })
  it('extracts combined JSON input, sanitizes nested values and applies query/path precedence', async () => {
    const body = JSON.parse(
      '{"id":"body","nested":{"value":"clean\\ntext","constructor":"blocked"},"array":[1,2],"__proto__":{"polluted":true}}',
    ) as unknown
    const { request, json, text, headers } = makeRequest(
      'post',
      'http://localhost/items/query-id?name=query&shared=query',
      '/items/path-id',
      { contentType: 'application/json; charset=utf-8', jsonData: body },
    )

    await expect(
      HttpRouteParamHelper.extractInput<{
        id: string
        name: string
        shared: string
        nested: object
      }>(request, '/items/:id'),
    ).resolves.toEqual({
      id: 'path-id',
      name: 'query',
      shared: 'query',
      nested: { value: 'cleantext' },
      array: [1, 2],
    })
    expect(json).toHaveBeenCalledOnce()
    expect(text).not.toHaveBeenCalled()
    expect(headers.get).toHaveBeenCalledWith('content-type')
  })

  it('parses URL-encoded bodies and preserves body fields absent from query and path', async () => {
    const { request, json, text } = makeRequest('PUT', '/submit?shared=query', '/submit', {
      contentType: 'application/x-www-form-urlencoded',
      textData: 'name=Ada&shared=body',
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/submit')).resolves.toEqual({
      name: 'Ada',
      shared: 'query',
    })
    expect(text).toHaveBeenCalledOnce()
    expect(json).not.toHaveBeenCalled()
  })

  it('uses plain text bodies when no content type is provided', async () => {
    const { request, text } = makeRequest('POST', '/submit', '/submit', { textData: 'raw body' })

    await expect(HttpRouteParamHelper.extractInput(request, '/submit')).resolves.toEqual({
      body: 'raw body',
    })
    expect(text).toHaveBeenCalledOnce()
  })

  it('uses plain text bodies for other content types', async () => {
    const { request, json, text } = makeRequest('PATCH', '/submit', '/submit', {
      contentType: 'text/plain',
      textData: 'raw body',
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/submit')).resolves.toEqual({
      body: 'raw body',
    })
    expect(text).toHaveBeenCalledOnce()
    expect(json).not.toHaveBeenCalled()
  })

  it.each(['GET', 'DELETE', 'HEAD'])('does not read a body for %s requests', async (method) => {
    const { request, json, text } = makeRequest(method, '/items/7', '/items/7', {
      contentType: 'application/json',
      jsonData: { ignored: true },
      textData: 'ignored',
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/items/:id')).resolves.toEqual({
      id: '7',
    })
    expect(json).not.toHaveBeenCalled()
    expect(text).not.toHaveBeenCalled()
  })

  it.each([
    ['application/json', { jsonError: new Error('invalid JSON') }],
    ['text/plain', { textError: new Error('unreadable body') }],
    ['application/x-www-form-urlencoded', { textError: new Error('unreadable form') }],
  ])('ignores body parsing failures for %s', async (contentType, errors) => {
    const { request } = makeRequest('POST', '/items/1', '/items/1', {
      contentType,
      ...errors,
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/items/:id')).resolves.toEqual({
      id: '1',
    })
  })

  it('returns an empty sanitized object for a nested value rejected by the object guard', async () => {
    guards.isObject
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
    const { request } = makeRequest('POST', '/submit', '/submit', {
      contentType: 'application/json',
      jsonData: { nested: {} },
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/submit')).resolves.toEqual({
      nested: {},
    })
  })

  it('replaces a string when sanitization returns undefined', async () => {
    const { request } = makeRequest('POST', '/submit', '/submit', {
      contentType: 'application/json',
      jsonData: { value: 'DROP' },
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/submit')).resolves.toEqual({
      value: '',
    })
  })
  it('wraps non-object JSON values as body input', async () => {
    const { request } = makeRequest('POST', '/submit', '/submit', {
      contentType: 'application/json',
      jsonData: null,
    })

    await expect(HttpRouteParamHelper.extractInput(request, '/submit')).resolves.toEqual({
      body: null,
    })
  })
})
