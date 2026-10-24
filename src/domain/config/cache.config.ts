import type { Optional } from '@/shared'

import type { IAtomicCache, IServiceScope } from '../contracts'
import type { XenoRegistry } from '../registries'

/**
 * @description CacheConfig is used to configure the cache module.
 */
export interface CacheConfig<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * @description inMemory is used to determine if the cache module should use in-memory cache or not.
   */
  inMemory: boolean
  /**
   * @description provider is used to provide a custom cache implementation.
   */
  provider?: Optional<(scope: IServiceScope<TRegistry>) => IAtomicCache>
}
