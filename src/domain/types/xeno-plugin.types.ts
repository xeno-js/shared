/* eslint-disable @typescript-eslint/naming-convention */
import type {
  IAppBuilder,
  IConfigurationService,
  ILoggerSetup,
  IPipelineSetup,
  IXenoApplication,
} from '../contracts'
import type { XenoRegistry } from '../registries'

declare const __pluginType: unique symbol

/**
 * @description Contract interface for the XenoPlugin.
 */
export type XenoPlugin<
  TKind extends string,
  TRegistry extends XenoRegistry = XenoRegistry,
  TOptions = unknown,
> = ((
  builder: IAppBuilder<TRegistry, IXenoApplication<TRegistry>>,
  config: IConfigurationService,
  options?: TOptions,
) => unknown) & {
  readonly [__pluginType]?: TKind
  readonly __kind: TKind
}

export type AuthPlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'auth',
  TRegistry
>
export type HttpPlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'http',
  TRegistry
>
export type CachePlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'cache',
  TRegistry
>
export type DbPlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<'db', TRegistry>
export type LoggerPlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'logger',
  TRegistry,
  ILoggerSetup<TRegistry>
>
export type PipelinePlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'pipeline',
  TRegistry,
  IPipelineSetup<TRegistry>
>
export type MiddlewarePlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'middleware',
  TRegistry
>
export type HttpServerPlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'http-server',
  TRegistry
>
export type ContextPlugin<TRegistry extends XenoRegistry = XenoRegistry> = XenoPlugin<
  'context',
  TRegistry
>
