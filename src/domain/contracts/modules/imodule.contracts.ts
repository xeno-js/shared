import type { IServiceContainer } from '@/domain'
import type { Optional } from '@/shared'

import type { XenoRegistry } from '../../registries'

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @description Represents a module that can be registered with the service container.
 *
 * @template TOptions - The type of configuration options for the module.

   * 
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js 
   */
export interface IModule<TRegistry extends XenoRegistry = XenoRegistry, TOptions = unknown> {
  /**
   * @description Configures the module with the provided options.
   *
   * @param container - The service container to register services with.
   * @param opts - The configuration options for the module.
  
   * 
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js 
   */
  configure(container: IServiceContainer<TRegistry>, opts?: Optional<TOptions>): Promise<void>
}
