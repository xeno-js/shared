import type { Metadata, Optional, UserContext } from '@/shared'

import type {
  IAtomicCache,
  IBackgroundWorker,
  IBaseAuthService,
  ICacheKeyBuilder,
  ICommand,
  IConcurrencyService,
  IConfigurationService,
  IContextAccessor,
  ICryptoService,
  ICsrfTokenService,
  IDisposable,
  IEventDispatcher,
  IExtendendAuthService,
  IFactory,
  IHttpAdapter,
  IHttpClientFactory,
  IHttpDispatcher,
  IHttpServer,
  IIdentityAccessor,
  ILogger,
  IMediator,
  IMiddleware,
  INetworkContextAccessor,
  IPipelineBehavior,
  IQuery,
  IRequestContext,
  IRoute,
  IServerOptionsFactory,
  IServiceContainer,
  IServiceExtractor,
  IServiceProxy,
  IServiceResilience,
  IServiceScopeAccessor,
  ISsrCookieHandler,
  ITracingContextAccessor,
  ITransactionState,
  IUnitOfWork,
  IValidatorService,
  RequestContext,
} from '../contracts'

/**
 * @description This file defines the injection tokens used for dependency injection in the application.
 * Injection tokens are unique identifiers that are used to register and resolve dependencies in the container.
 * They can be symbols, strings, or classes, but using symbols is a common practice to avoid naming collisions.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface ApplicationRegistry<T = unknown, Ttx = unknown> {
  /** @description Token used to register and resolve the Extended AuthService instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly authenticationService: IExtendendAuthService
  /** @description Token used to register and resolve the BaseAuthService instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly baseAuthenticationService: IBaseAuthService
  /** @description Token used to register and resolve the InMemoryCache instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly cache: IAtomicCache
  /** @description Token used to register and resolve the CacheKeyBuilder instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly cacheKeyBuilder: ICacheKeyBuilder
  /** @description Token used to register and resolve the HttpClientFactory instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly httpClientFactory: IHttpClientFactory
  /** @description Token used to register and resolve the CookieHandler instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly cookieHandler: ISsrCookieHandler
  /** @description Token used to register and resolve the CommandPipeline behaviors in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly commandPipelinesBehavior: IPipelineBehavior<ICommand, unknown>
  /** @description Token used to register and resolve the ConcurrencyService instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly concurrencyService: IConcurrencyService
  /** @description Token used to register and resolve the ConfigurationService instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly configurationService: IConfigurationService
  /** @description Token used to register and resolve the CsrfTokenService instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly csrfTokenService: ICsrfTokenService
  /** @description Token used to register and resolve the CryptoService instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly cryptoService: ICryptoService
  /** @description Token used to register and resolve the DbContext instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly dbContext: T
  /** @description Token used to register and resolve the Event Dispatcher instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly eventDispatcher: IEventDispatcher
  /** @description Token used to register and resolve the Background Worker instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly worker: IBackgroundWorker
  /** @description Token used to register and resolve the IHttpDispatcher instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly httpDispatcher: IHttpDispatcher
  /** @description Token used to register and resolve the HTTP Adapter instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.2.1
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly httpAdapter: IHttpAdapter
  /** @description Token used to register and resolve the HTTP server factory instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.2.1
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly httpServer: IHttpServer
  /** @description Token used to register and resolve the Logger instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly logger: ILogger
  /** @description Token used to register and resolve the Mediator instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly mediator: IMediator
  /** @description Token used to register and resolve the RequestContextMiddleware in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly middleware: IMiddleware
  /** @description Token used to register and resolve the QueryPipeline behaviors in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly queryPipelinesBehavior: IPipelineBehavior<IQuery, unknown>
  /** @description Token used to register and resolve the RequestContext instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly requestContext: IRequestContext<RequestContext, ApplicationRegistry<T, Ttx>>
  /** @description Token used to register and resolve the IServiceResilience instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly resilienceService: IServiceResilience
  /** @description Token used to register and resolve the IRoute instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly routeMatcher: IRoute
  /** @description Token used to register and resolve the ServiceContainer instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly serviceContainer: IServiceContainer
  /** @description Token used to register and resolve the ServerOptionsFactory instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly serverOptionsFactory: IServerOptionsFactory
  /** @description Token used to register and resolve the ServiceExtractor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly serviceExtractor: IServiceExtractor<Request['headers'], Metadata>
  /** @description Token used to register and resolve the TokenServiceExtractor instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly tokenServiceExtractor: IServiceExtractor<Request['headers'], Optional<string>>
  /** @description Token used to register and resolve the UnitOfWork instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly unitOfWork: IUnitOfWork<T> & IDisposable
  /** @description Token used to register and resolve the ZodValidator instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly validatorService: IValidatorService
  /** @description Token used to register and resolve the IIdentityAccessor in the dependency injection container, allowing access only to current user identity information.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly identityAccessor: IIdentityAccessor
  /** @description Token used to register and resolve the IServiceScopeAccessor in the dependency injection container, granting controlled access to the current request scope.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly serviceScopeAccessor: IServiceScopeAccessor<ApplicationRegistry<T, Ttx>>
  /** @description Token used to register and resolve the IServiceProxy in the dependency injection container, granting controlled access to the current request scope.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly serviceProxy: IServiceProxy

  /** @description Token used to register and resolve the IContextAccessor instance in the dependency injection container to fetch execution context properties.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly contextAccessor: IContextAccessor<RequestContext>

  /** @description Token used to register and resolve the INetworkContextAccessor instance in the dependency injection container to fetch networking/observability context data.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly networkContextAccessor: INetworkContextAccessor

  /** @description Token used to register and resolve the UserContext factory in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly userContextFactory: IFactory<void, UserContext>

  /** @description Token used to register and resolve the TracingContextAccessor factory in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly tracingContextAccessor: ITracingContextAccessor

  /** @description Token used to register and resolve the TransactionState instance in the dependency injection container.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  readonly transactionState: ITransactionState<Ttx>
}
