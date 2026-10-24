import type { IDisposable } from '../disposables'
import type { NativeListenOptions } from './iroutes.contracts'

/**
 * @description Interface for an HTTP server.
 */
export interface IHttpServer extends IDisposable {
  /**
   * @description Starts the server listening on the specified port and host.
   * @param options - The options to use for the server.
   * @returns A promise that resolves when the server is listening.
   */
  listen<T = unknown>(options: NativeListenOptions): Promise<T>
}
