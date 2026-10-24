import type { ISsrCookie, ISsrCookieToSet } from '@/domain/config'

/**
 * @description Interface for the cookie handler
 * @interface ISsrCookieHandler
 *
 */
export interface ISsrCookieHandler {
  /**
   * @description Gets all cookies
   * @returns {ISsrCookie[]}
   * @memberof ISsrCookieHandler
   */
  getAll(): ISsrCookie[]
  /**
   * @description Set all cookies
   * @param {ISsrCookieToSet} cookie
   * @memberof ISsrCookieHandler
   */
  setAll(cookie: ISsrCookieToSet[]): void
  /**
   * @description Gets pending cookies
   * @returns {string[]}
   * @memberof ISsrCookieHandler
   * @returns {string[]}
   */
  getPendingCookies(): string[]
}
