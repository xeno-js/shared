import type { Optional } from '@/shared'

import type { IHttpClient, IServiceResilience, IServiceScope } from '../contracts'
import type { XenoRegistry } from '../registries'

/**
 * @description HttpCoreConfig is an interface that defines the configuration options for the core HTTP functionality of the application. It includes two properties: 'http' of type HttpConfig, which specifies the configuration for the HTTP client, and 'resilience' of type ResilienceConfig, which provides the settings for implementing resilience strategies such as retries, circuit breakers, and timeouts. This interface allows for a centralized configuration of both HTTP and resilience features in the application.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface HttpCoreConfig<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * @description The configuration options for the HTTP clients.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  clients: HttpRegistrationEntry<TRegistry>[]
}

/**
 * @description The configuration options for the HTTP client, including name, the client instance and an optional resilience service.
 */
export interface HttpRegistrationEntry<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * @description The name of the HTTP client.
   * @type string
   */
  readonly name?: string
  /**
   * @description The HTTP client instance.
   * @type IHttpClient
   */
  readonly client: (scope: IServiceScope<TRegistry>) => IHttpClient
  /**
   * @description Optional resilience service instance for the HTTP client.
   * @type Optional<IServiceResilience>
   */
  readonly resilience?: Optional<(scope: IServiceScope<TRegistry>) => IServiceResilience>
}

export interface HttpConfig<TRegistry extends XenoRegistry = XenoRegistry> {
  /** The HTTP configuration clients to register
   * @default []
   */
  clients: HttpRegistrationEntry<TRegistry> | HttpRegistrationEntry<TRegistry>[]
}
