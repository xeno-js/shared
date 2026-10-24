import type { AuthPolicy, Dictionary, Optional } from '@/shared'

import type {
  IExtendendAuthService,
  IRequest,
  IServiceExtractor,
  IServiceScope,
  ISsrCookieHandler,
  IStrategy,
} from '../contracts'
import type { XenoRegistry } from '../registries'

export interface ISsrCookie {
  /**
   * Specifies the name of the cookie.
   */
  name: string
  /**
   * Specifies the string to be the value for the cookie.
   */
  value: string
}

export interface ISsrCookieToSet extends ISsrCookie {
  /**
   * Specifies the `number` (in seconds) to be the value for the [`Max-Age` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.2).
   *
   * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
   * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
   * so if both are set, they should point to the same date and time.
   */
  maxAge?: number
  /**
   * Specifies the `Date` object to be the value for the [`Expires` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.1).
   * When no expiration is set, clients consider this a "non-persistent cookie" and delete it when the current session is over.
   *
   * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
   * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
   * so if both are set, they should point to the same date and time.
   */
  expires?: Date
  /**
   * Specifies the value for the [`Domain` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.3).
   * When no domain is set, clients consider the cookie to apply to the current domain only.
   */
  domain?: string
  /**
   * Specifies the value for the [`Path` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.4).
   * When no path is set, the path is considered the ["default path"](https://tools.ietf.org/html/rfc6265#section-5.1.4).
   */
  path?: string
  /**
   * Enables the [`HttpOnly` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.6).
   * When enabled, clients will not allow client-side JavaScript to see the cookie in `document.cookie`.
   */
  httpOnly?: boolean
  /**
   * Enables the [`Secure` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.5).
   * When enabled, clients will only send the cookie back if the browser has an HTTPS connection.
   */
  secure?: boolean
  /**
   * Enables the [`Partitioned` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-cutler-httpbis-partitioned-cookies/).
   * When enabled, clients will only send the cookie back when the current domain _and_ top-level domain matches.
   *
   * This is an attribute that has not yet been fully standardized, and may change in the future.
   * This also means clients may ignore this attribute until they understand it. More information
   * about can be found in [the proposal](https://github.com/privacycg/CHIPS).
   */
  partitioned?: boolean
  /**
   * Specifies the value for the [`Priority` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).
   *
   * - `'low'` will set the `Priority` attribute to `Low`.
   * - `'medium'` will set the `Priority` attribute to `Medium`, the default priority when not set.
   * - `'high'` will set the `Priority` attribute to `High`.
   *
   * More information about priority levels can be found in [the specification](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).
   */
  priority?: 'low' | 'medium' | 'high'
  /**
   * Specifies the value for the [`SameSite` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).
   *
   * - `true` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
   * - `'lax'` will set the `SameSite` attribute to `Lax` for lax same site enforcement.
   * - `'none'` will set the `SameSite` attribute to `None` for an explicit cross-site cookie.
   * - `'strict'` will set the `SameSite` attribute to `Strict` for strict same site enforcement.
   *
   * More information about enforcement levels can be found in [the specification](https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-09#section-5.4.7).
   */
  sameSite?: boolean | 'lax' | 'strict' | 'none'
}

export interface AuthModuleOptions<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * The Authentication service instance
   */
  authService: (scope: IServiceScope<TRegistry>) => IExtendendAuthService
  /**
   * The token extractor function that extracts the token from the request
   */
  tokenExtractor?: Optional<
    (scope: IServiceScope<TRegistry>) => IServiceExtractor<Request['headers'], Optional<string>>
  >
  /**
   * The default cookie name used for authentication
   */
  defaultCookieName?: Optional<string>
  /**
   * The cookie handler options
   */
  cookieHandlerOptions?: Optional<{
    /**
     * Whether to enable the default cookie handler
     */
    enableDefault: Optional<{
      /**
       * Whether to enable the default cookie handler
       */
      enable: boolean
      /**
       * The default cookie options
       */
      options: Optional<Partial<ISsrCookieToSet>>
    }>
    /**
     * The custom cookie handler instance
     */
    cookieHandlerCustom: Optional<(scope: IServiceScope<TRegistry>) => ISsrCookieHandler>
  }>
}

/** @description Configuration for authorization, allowing the enabling of authorization strategies based on tenant, policy, roles, and permissions. If enabled, the authorization pipeline will evaluate the specified strategies for each command or query, ensuring that only authorized users can perform certain actions. The configuration also includes the ability to define custom authorization strategies via injection tokens, providing flexibility in implementing application-specific access rules.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface AuthorizationOptions<TRegistry extends XenoRegistry = XenoRegistry> {
  /** @description Configuration for policy-based authorization, allowing the definition of a policy registry and the option to enable role-based or permission-based checks. If policy-based authorization is enabled, the authorization pipeline will include a strategy that evaluates the defined policies for each command or query, ensuring that users meet the necessary criteria based on their roles and permissions. The policy registry allows for central management of authorization policies, making it easier to maintain and update access rules across the application.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  policies: Optional<Dictionary<AuthPolicy>>
  /** @description An optional array of custom authorization strategies defined via injection tokens. If provided, these strategies will be included in the authorization pipeline and evaluated for each command or query, allowing for custom logic to determine if a user is authorized to perform a specific action. This provides flexibility in implementing application-specific access rules that may not fit into standard tenant-based or policy-based checks. Each strategy should implement the IStrategy interface and return a boolean indicating whether the command or query is authorized.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  customAuthorizationStrategy?: Optional<
    (container: IServiceScope<TRegistry>) => IStrategy<IRequest>
  >[]
}
