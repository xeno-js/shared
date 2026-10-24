import type { Dictionary, Optional } from '../types/index'
import { Guards } from './guards.utils'

const start = String.fromCharCode(0)
const end = String.fromCharCode(31)
const del = String.fromCharCode(127)

const CONTROL_CHARS_REGEX = new RegExp(`[\\r\\n\\t${start}-${end}${del}]`, 'g')
const DANGEROUS_PROTOCOLS_REGEX = /^(javascript|data|vbscript):/i

/**
 * @description Centralized security utility for data and context sanitization.
 * Enforces OWASP guidelines preventing Log Injection (CWE-117), CRLF injection,
 * and URI protocol manipulation across all application layers.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export const SanitizeHelper = Object.freeze({
  /**
   * @description Removes carriage returns, line feeds, null bytes, and non-printable control characters.
   * Mitigates Log Forging and Log Injection attacks (CWE-117).
   * @param value The candidate string to sanitize.
   * @param maxLength Maximum allowable length after sanitization. Defaults to 256.
   * @returns Sanitized string or undefined if empty/non-string.
   */
  stripControlChars(value: Optional<string>, maxLength = 256): Optional<string> {
    if (Guards.isNullOrEmpty(value)) return undefined
    const clean = value.replace(CONTROL_CHARS_REGEX, '').trim()
    if (Guards.isNullOrEmpty(clean)) return undefined
    return clean.slice(0, maxLength)
  },

  /**
   * @description Sanitizes navigation paths and URLs, removing control characters
   * and preventing execution of dangerous pseudo-protocols (e.g. javascript:, data:).
   * @param path The path string to sanitize.
   * @param maxLength Maximum length of the path. Defaults to 512.
   * @returns Sanitized path or '/' fallback for unsafe inputs.
   */
  sanitizePath(path: Optional<string>, maxLength = 512): Optional<string> {
    if (Guards.isNullOrEmpty(path)) return undefined
    const clean = path.replace(CONTROL_CHARS_REGEX, '').trim()
    if (Guards.isNullOrEmpty(clean) || DANGEROUS_PROTOCOLS_REGEX.test(clean)) {
      return '/'
    }
    return clean.slice(0, maxLength)
  },

  /**
   * @description Sanitizes an array of strings (e.g. roles, permissions, scopes).
   * Strips control characters, filters out empty entries, and limits collection size.
   * @param items Array of strings to sanitize.
   * @param maxItemLength Maximum allowable character length per item. Defaults to 64.
   * @param maxItems Maximum total number of elements kept. Defaults to 50.
   * @returns Immutable array of sanitized strings.
   */
  sanitizeStringArray(
    items: Optional<string[]>,
    maxItemLength = 64,
    maxItems = 50,
  ): Optional<string[]> {
    if (Guards.isNullOrEmpty(items)) return undefined
    const sanitized = items
      .slice(0, maxItems)
      .map((item) => SanitizeHelper.stripControlChars(item, maxItemLength))
      .filter((item): item is string => Guards.isDefined(item))

    return sanitized
  },
  sanitizeObject(obj: unknown): Dictionary {
    if (!Guards.isObject(obj)) return {}
    const sanitized: Dictionary = {}
    const forbiddenKeys = new Set(['__proto__', 'constructor', 'prototype'])

    for (const [key, value] of Object.entries(obj as Dictionary)) {
      if (forbiddenKeys.has(key)) continue // Scarta chiavi pericolose

      if (Guards.isString(value)) {
        sanitized[key] = SanitizeHelper.stripControlChars(value) ?? ''
      } else if (Guards.isObject(value) && !Guards.isArray(value)) {
        sanitized[key] = SanitizeHelper.sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }
    return sanitized
  },
} as const)
