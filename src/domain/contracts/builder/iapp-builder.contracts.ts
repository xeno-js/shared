import type { SetupAction } from '@/shared'

import type {
  AuthModuleOptions,
  CacheConfig,
  HttpConfig,
  LoggerConfig,
  MiddlewareConfig,
} from '../../config'
import type { XenoRegistry } from '../../registries'
import type {
  AuthPlugin,
  CachePlugin,
  DbPlugin,
  HttpPlugin,
  HttpServerPlugin,
  LoggerPlugin,
  PipelinePlugin,
} from '../../types'
import type { IConfigurationService } from '../configuration'
import type { IServiceContainer } from '../container'
import type { NativeRouteDefinition } from '../http'
import type { IModule } from '../modules'
import type { IXenoApplication } from '../xeno_application'

/**
 * @description Contract interface for the XenoAppBuilder fluent API.
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface IAppBuilder<
  TRegistry extends XenoRegistry = XenoRegistry,
  TApp extends IXenoApplication<TRegistry> = IXenoApplication<TRegistry>,
> {
  /**
   * @description Adds an HTTP server plugin to the application.
   */
  addHttpServer(plugin: HttpServerPlugin<TRegistry>): this

  /**
   * @description Adds new routes to the application.
   */
  addRoutes(routes: NativeRouteDefinition<TRegistry>[]): this

  /**
   * @description Enables and configures middlewares in the application.
   */
  addMiddlewares(setupAction?: SetupAction<MiddlewareConfig, IConfigurationService>): this

  /**
   * @description Configures the logger for the application via plugins or setup action.
   */
  addLogger(plugin?: LoggerPlugin<TRegistry> | LoggerPlugin<TRegistry>[]): this
  addLogger(setupAction?: SetupAction<LoggerConfig<TRegistry>, IConfigurationService>): this

  /**
   * @description Configures caching for the application via plugin or setup action.
   */
  addCache(plugin?: CachePlugin<TRegistry>): this
  addCache(setupAction?: SetupAction<CacheConfig, IConfigurationService>): this

  /**
   * @description Configures authentication for the application via plugin or setup action.
   */
  addAuth(plugin: AuthPlugin<TRegistry>): this
  addAuth(setupAction: SetupAction<AuthModuleOptions<TRegistry>, IConfigurationService>): this

  /**
   * @description Configures database settings for the application.
   */
  addDb(plugin: DbPlugin<TRegistry>): this

  /**
   * @description Enables concurrency control service in the application.
   */
  addConcurrencyService(): this

  /**
   * @description Configures the CQRS pipeline settings for the application.
   */
  addPipeline(pluginOrPlugins?: PipelinePlugin<TRegistry> | PipelinePlugin<TRegistry>[]): this

  /**
   * @description Configures HTTP core settings and clients via plugin or setup action.
   */
  addHttpClient(plugin: HttpPlugin<TRegistry>): this
  addHttpClient(setupAction: SetupAction<HttpConfig, IConfigurationService>): this

  /**
   * @description Registers custom services directly into the DI container.
   */
  addServices(
    setupAction: SetupAction<IServiceContainer<TRegistry>, IConfigurationService>,
    priority?: number,
  ): this

  /**
   * @description Registers a custom module into the application container.
   */
  addModule<T>(
    name: string,
    factory: () => Promise<IModule<TRegistry, T>>,
    opts?: T,
    priority?: number,
  ): this

  /**
   * @description Resolves a service from the DI container using its token.
   */
  resolve<K extends keyof TRegistry>(token: K): TRegistry[K]

  /**
   * @description Finalizes configuration and bootstraps all application modules.
   */
  build(): Promise<TApp>
}
