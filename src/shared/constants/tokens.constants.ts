/**
 * @description Tokens used by the framework.
 *
 */
export const TOKENS = Object.freeze({
  /** @description Token used to register and resolve the extended authentication service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  AUTH_SERVICE: 'authenticationService',
  /** @description Token used to register and resolve the background worker instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  BACKGROUND_WORKER: 'worker',
  /** @description Token used to register and resolve the base authentication service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  BASE_AUTH_SERVICE: 'baseAuthenticationService',
  /** @description Token used to register and resolve the cache instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CACHE: 'cache',
  /** @description Token used to register and resolve the cache key builder instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CACHE_KEY_BUILDER: 'cacheKeyBuilder',
  /** @description Token used to register and resolve the command pipelines behavior instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  COMMAND_PIPELINES_BEHAVIOR: 'commandPipelinesBehavior',
  /** @description Token used to register and resolve the concurrency service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CONCURRENCY_SERVICE: 'concurrencyService',
  /** @description Token used to register and resolve the configuration service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CONFIGURATION_SERVICE: 'configurationService',
  /** @description Token used to register and resolve the context accessor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CONTEXT_ACCESSOR: 'contextAccessor',
  /** @description Token used to register and resolve the CookieHAndler instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  COOKIE_HANDLER: 'cookieHandler',
  /** @description Token used to register and resolve the crypto service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CRYPTO_SERVICE: 'cryptoService',
  /** @description Token used to register and resolve the csrf token service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  CSRF_TOKEN_SERVICE: 'csrfTokenService',
  /** @description Token used to register and resolve the db context instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  DB_CONTEXT: 'dbContext',
  /** @description Token used to register and resolve the Event Dispatcher instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  EVENT_DISPATCHER: 'eventDispatcher',
  /** @description Token used to register and resolve the HttpAdapter instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  HTTP_ADAPTER: 'httpAdapter',
  /** @description Token used to register and resolve the HttpClientFactory instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  HTTP_CLIENT_FACTORY: 'httpClientFactory',
  /** @description Token used to register and resolve the HttpDispatcher instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  HTTP_DISPATCHER: 'httpDispatcher',
  /** @description Token used to register and resolve the HttpServer instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  HTTP_SERVER: 'httpServer',
  /** @description Token used to register and resolve the identity context accessor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  IDENTITY_ACCESSOR: 'identityAccessor',
  /** @description Token used to register and resolve the logger instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  LOGGER: 'logger',
  /** @description Token used to register and resolve the mediator instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  MEDIATOR: 'mediator',
  /** @description Token used to register and resolve the middleware instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  MIDDLEWARE: 'middleware',
  /** @description Token used to register and resolve the network context accessor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  NETWORK_CONTEXT_ACCESSOR: 'networkContextAccessor',
  /** @description Token used to register and resolve the query pipelines behavior instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  QUERY_PIPELINES_BEHAVIOR: 'queryPipelinesBehavior',
  /** @description Token used to register and resolve the request context instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  REQUEST_CONTEXT: 'requestContext',
  /** @description Token used to register and resolve the service resilience instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  RESILIENCE_SERVICE: 'resilienceService',
  /** @description Token used to register and resolve the route matcher instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  ROUTE_MATCHER: 'routeMatcher',
  /** @description Token used to register and resolve the ServerOptionsFactory instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  SERVER_OPTIONS_FACTORY: 'serverOptionsFactory',
  /** @description Token used to register and resolve the service container instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  SERVICE_CONTAINER: 'serviceContainer',
  /** @description Token used to register and resolve the service extractor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  SERVICE_EXTRACTOR: 'serviceExtractor',
  /** @description Token used to register and resolve the ServiceProxy instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  SERVICE_PROXY: 'serviceProxy',
  /** @description Token used to register and resolve the service scope accessor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  SERVICE_SCOPE_ACCESSOR: 'serviceScopeAccessor',
  /** @description Token used to register and resolve the TokenServiceExtractor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  TOKEN_SERVICE_EXTRACTOR: 'tokenServiceExtractor',
  /** @description Token used to register and resolve the TracingContextAccessor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  TRACING_CONTEXT_ACCESSOR: 'tracingContextAccessor',
  /** @description Token used to register and resolve the TransactionState instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  TRANSACTION_STATE: 'transactionState',
  /** @description Token used to register and resolve the UnitOfWork service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  UNIT_OF_WORK: 'unitOfWork',
  /** @description Token used to register and resolve the user context factory instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  USER_CONTEXT_FACTORY: 'userContextFactory',
  /** @description Token used to register and resolve the Validator service instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  VALIDATOR_SERVICE: 'validatorService',
})
