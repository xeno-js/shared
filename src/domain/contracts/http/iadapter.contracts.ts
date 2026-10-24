import type { XenoIncomingRequest, XenoRequest } from '@/shared'

/**
 * @description Interface for an HTTP adapter.
 * @author Xeno
 * @version 1.2.1
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface IHttpAdapter {
  /**
   * @description Adapts an HTTP request and response to an XenoRequest and Response.
   * @param req - The Xeno HTTP incoming request.
   * @returns An object containing the adapted XenoRequest.
   */
  adapt(req: XenoIncomingRequest): XenoRequest
}
