import type { Dictionary, XenoRequest } from '../types'
import { Guards } from './guards.utils'
import { HttpHelper } from './http.utils'
import { SanitizeHelper } from './sanitize.utils'

/**
 * @description Helper class to parse and normalize route patterns.
 */
interface ParsedRoutePattern {
  /**
   * The normalized path pattern.
   */
  readonly pattern: RegExp
  /**
   * Whether the path pattern is dynamic.
   */
  readonly isDynamic: boolean
}

export const RoutePatternHelper = Object.freeze({
  /**
   * Normalizes a path by trimming leading and trailing slashes and ensuring that there is only one slash between segments.
   * @param path The path to normalize.
   * @returns The normalized path.
   */
  normalizePath(path: string): string {
    const trimmed = path.trim()
    const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    if (withLeadingSlash === '/') return '/'
    return withLeadingSlash.replace(/\/+$/, '')
  },

  /**
   * Checks if a path is dynamic.
   * @param path The path to check.
   * @returns True if the path is dynamic, false otherwise.
   */
  isDynamicPath(path: string): boolean {
    return path.includes(':') || (path.includes('{') && path.includes('}'))
  },

  /**
   * Creates a regular expression pattern for a path.
   * @param path The path to create a pattern for.
   * @returns The regular expression pattern for the path.
   */
  createRoutePattern(path: string): RegExp {
    const segments = path.split('/').filter(Boolean)
    const regexSegments = segments.map((segment) => {
      if (segment.startsWith(':') || (segment.startsWith('{') && segment.endsWith('}')))
        return '([^/]+)'
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    })
    return new RegExp(`^\\/${regexSegments.join('\\/')}\\/?$`)
  },

  /**
   * Parses a path and returns a normalized version of it.
   * @param path The path to normalize.
   * @returns The Parsed Route pattern
   */
  parse(path: string): ParsedRoutePattern {
    const normalized = this.normalizePath(path)
    const isDynamic = this.isDynamicPath(normalized)
    const pattern = isDynamic
      ? this.createRoutePattern(normalized)
      : new RegExp(`^${normalized}\\/?$`)
    return { pattern, isDynamic }
  },
})

const FORBIDDEN_BODY_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

function sanitizeBodyValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeBodyValue(item))
  }

  if (Guards.isString(value)) {
    return SanitizeHelper.stripControlChars(value) ?? ''
  }

  if (Guards.isObject(value)) {
    const sanitized: Dictionary = {}
    for (const [key, nestedValue] of Object.entries(value as Dictionary)) {
      if (FORBIDDEN_BODY_KEYS.has(key)) continue
      sanitized[key] = sanitizeBodyValue(nestedValue)
    }
    return sanitized
  }

  return value
}

export const HttpRouteParamHelper = Object.freeze({
  /**
   * Extracts the path parameters from a route pattern and a request path.
   * @param routePattern The route pattern.
   * @param requestPath The request path.
   * @returns An object containing the extracted path paramete rs.
   *
   * Eg:
   * routePattern: '/users/:id'
   * requestPath: '/users/123'
   * result: { id: '123' }
   */
  extractPathParams(routePattern: string, requestPath: string): Dictionary<string> {
    const params: Dictionary<string> = {}
    const patternSegments = routePattern.split('/').filter(Boolean)
    const pathSegments = requestPath.split('/').filter(Boolean)

    for (let i = 0; i < patternSegments.length; i++) {
      const segment = patternSegments[i]
      if (segment.startsWith(':') || (segment.startsWith('{') && segment.endsWith('}'))) {
        const paramName = segment.startsWith(':') ? segment.slice(1) : segment.slice(1, -1)
        const paramValue = pathSegments[i]
        if (Guards.isDefined(paramValue)) {
          const cleanValue = SanitizeHelper.stripControlChars(decodeURIComponent(paramValue))
          if (Guards.isDefined(cleanValue)) {
            params[paramName] = cleanValue
          }
        }
      }
    }
    return params
  },

  /**
   * Extract query parameters from the request URL
   * @param requestUrl - The request URL to extract query parameters from.
   * @returns An object containing the extracted query parameters.
   *
   * Eg:
   *
   *  http://localhost:3000/api/users?name=John&age=30
   *
   *  { name: 'John', age: '30' }
   */
  extractQueryParams(requestUrl: string): Dictionary<string> {
    const urlObj = HttpHelper.parseSafeUrl(requestUrl)
    const queryParams: Dictionary<string> = {}
    for (const [key, value] of urlObj.searchParams.entries()) {
      const cleanKey = SanitizeHelper.stripControlChars(key, 64)
      const cleanVal = SanitizeHelper.stripControlChars(value, 512)
      if (Guards.isDefined(cleanKey) && Guards.isDefined(cleanVal)) {
        queryParams[cleanKey] = cleanVal
      }
    }
    return queryParams
  },

  /**
   * Extract an unique input from the request URL based on the route pattern and the request path (Path Params + Query Params * Body)
   * @param req - The request object
   * @param routePattern - The route pattern
   * @returns The extracted input
   * @throws Error if the input is not found
   *
   */
  async extractInput<TInput = Dictionary>(req: XenoRequest, routePattern: string): Promise<TInput> {
    const pathParams = this.extractPathParams(routePattern, req.path)
    const queryParams = req.query ?? {}

    let bodyData: unknown = undefined
    if (['POST', 'PUT', 'PATCH'].includes(req.method.toUpperCase())) {
      try {
        const contentType = req.headers.get('content-type') ?? ''
        if (contentType.includes('application/json')) {
          bodyData = await req.json()
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          const text = await req.text()
          bodyData = Object.fromEntries(new URLSearchParams(text).entries())
        } else {
          bodyData = await req.text()
        }
      } catch {
        bodyData = undefined
      }
    }

    const cleanBody: Dictionary = !Guards.isDefined(bodyData)
      ? { body: bodyData }
      : Guards.isObject(bodyData)
        ? (sanitizeBodyValue(bodyData) as Dictionary)
        : { body: bodyData }

    return {
      ...cleanBody,
      ...queryParams,
      ...pathParams,
    } as TInput
  },
})
