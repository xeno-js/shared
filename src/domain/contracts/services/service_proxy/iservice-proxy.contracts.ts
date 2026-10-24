import type { XenoRegistry } from '@/domain/registries'
import type { ServicesProxy } from '@/domain/types'

import type { IServiceScope } from '../../container'

/**
 * @description Interface for the service proxy
 */
export interface IServiceProxy {
  /**
   * @description Get the service proxy
   * @param scope The service scope
   * @returns The service proxy
   */
  getServiceProxy<TRegistry extends XenoRegistry = XenoRegistry>(
    scope: IServiceScope<TRegistry>,
  ): ServicesProxy<TRegistry>
}
