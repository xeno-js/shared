import type { XenoRegistry } from '@/domain/registries'

import type { IRoute, NativeRouteDefinition } from './iroutes.contracts'

/**
 * @description Factory for the resolution of IRoute.
 */
export interface IRouteFactory {
  /**
   * @description Returns an instance of IRoute.
   * @returns An instance of IRoute.
   */
  create<TRegistry extends XenoRegistry = XenoRegistry>(
    opts: NativeRouteDefinition<TRegistry>[],
  ): IRoute<TRegistry>
}
