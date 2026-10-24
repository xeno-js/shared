import type { XenoRegistry } from '@/domain/registries'
import type { ServicesProxy } from '@/domain/types'
import type { Optional, ResponseDto, XenoIncomingRequest } from '@/shared'

import type { RequestContext } from '../context'
import type { NativeListenOptions } from '../http'

/**
 * @description Contract interface for the XenoApplication runtime instance.
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface IXenoApplication<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * @description Resolve the global services proxy directly from root singletons.
   * @returns The services proxy.
   */
  getServices(): ServicesProxy<TRegistry>

  /**
   * @description Resolve the services proxy for the current request scope.
   * @returns The services proxy.
   */
  getScopedServices(): ServicesProxy<TRegistry>

  /**
   * @description Run the given operation in a new request scope.
   * @param operation The operation to run.
   * @param ctx Optional request context.
   * @returns The result of the operation.
   */
  runInScope<T>(
    operation: (services: ServicesProxy<TRegistry>) => Promise<T>,
    ctx?: Optional<Partial<RequestContext>>,
  ): Promise<T>

  /**
   * @description Runs a controller operation in the context of a request.
   * @param req The XenoIncomingRequest object.
   * @param token The token of the controller operation.
   * @param input Optional input for the controller operation.
   * @returns A promise resolving to the response DTO.
   */
  handle<TInput, TOutput, K extends keyof TRegistry>(
    req: XenoIncomingRequest,
    token: K,
    input?: Optional<TInput>,
  ): Promise<ResponseDto<TOutput>>

  /**
   * @description Resolves the HTTP server and starts listening on the specified port.
   * @param options Optional native listen options.
   * @returns A promise resolving when the server starts.
   */
  listen(options?: NativeListenOptions): Promise<unknown>
}
