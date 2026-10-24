import type { Optional } from '@/shared'

/**
 * @description Configuration for the rate limiter middleware.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface RateLimitOptions {
  /** Rather to enable the rate limiter (default: true) */
  enabled?: boolean
  /** Max number of requests per window (default: 100) */
  maxRequests?: number
  /** Time window in seconds (default: 60) */
  windowSeconds?: number
}

export interface CorsOptions {
  /** Rather to enable the CORS middleware (default: true) */
  enabled?: boolean
  /** Rather to enable the preflight OPTIONS request handle (default: true) */
  enablePreflight?: boolean
  /** Rather to enable the header 'Access-Control-Allow-Credentials' (default: true) */
  withCredentials?: boolean
  /** List of allowed origins (default: [APP_URL] o fallback localhost) */
  allowOrigins?: string[]
  /** Header allowed by the server (default: standard headers) */
  allowHeaders?: string[]
}

export interface MiddlewareConfig {
  /** Rather to enable the CSRF protection  (default: false) */
  isSSR?: boolean
  /** Policy Configuration for CORS and Preflight OPTIONS */
  cors?: CorsOptions
  /** Rate limit configuration  */
  rateLimit?: RateLimitOptions
  /** Configuration for CSRF protection */
  csrf?: Optional<CsrfOptions>
  /** Trusted IP header name (es. 'cf-connecting-ip') */
  trustedIpHeader?: Optional<string>
  /** List of trusted proxies (default: []) */
  trustedProxies?: string[]
  /** Name of the cookie used for authentication (default: 'sb-access-token') */
  authCookieName?: string
}

/**
 * @description
 * The csrf property is an object that contains configuration options for the CSRF middleware. The csrf property is used to configure the CSRF middleware that is responsible for handling CSRF requests and responses.
 */
interface CsrfOptions {
  /**
   * Secret used to sign CSRF tokens.
   */
  secret: string
  /**
   * @description the name of the cookie that will be used to store the CSRF token.
   */
  cookieName?: Optional<string>
  /**
   * @description the name of the header that will be used to send the CSRF token.
   */
  headerName?: Optional<string>
  /**
   * @description the number of seconds that the CSRF token will be valid for.
   */
  cookieMaxAgeSeconds?: Optional<number>
  /**
   * Cookie SameSite policy.
   */
  sameSite?: 'strict' | 'lax' | 'none'
}
