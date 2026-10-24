import type { Optional } from '@/shared'

import type { NativeListenOptions } from './iroutes.contracts'

/**
 * @description Factory for the resolution of IServerOptions.
 */
export interface IServerOptionsFactory {
  /**
   * @description Returns an instance of IServerOptions.
   * @param options - The options to use for the server.
   * @returns An instance of IServerOptions.
   */
  create(options?: Optional<NativeListenOptions>): NativeListenOptions
}
