import type { HttpMethod, Optional, ResponseDto, XenoRequest } from '@/shared'

import type { XenoRegistry } from '../../registries'

export interface RouteHandlerContext<TRegistry extends XenoRegistry = XenoRegistry> {
  readonly req: XenoRequest
  readonly handle: <TOutput, TInput, K extends keyof TRegistry>(
    token: K,
    input?: TInput,
  ) => Promise<ResponseDto<TOutput>>
}

export interface NativeRouteDefinition<TRegistry extends XenoRegistry = XenoRegistry> {
  readonly path: string
  readonly method: HttpMethod
  readonly handler: <TOutput = void>(
    ctx: RouteHandlerContext<TRegistry>,
  ) => Promise<ResponseDto<TOutput>>
  readonly security?: RoutePolicy
}

export interface NativeListenOptions {
  readonly port?: number
  readonly host?: string
  readonly onListening?: (address: { port: number; host: string }) => void
}

export interface RoutePolicy {
  readonly withCredentials?: boolean
  readonly allowOrigins?: string[]
  readonly withCsrf?: boolean
  readonly withCors?: boolean
}

export interface IRouteMatcher<TRegistry extends XenoRegistry = XenoRegistry> {
  match(url: string, method: string): Optional<NativeRouteDefinition<TRegistry>>
}

export interface IRoutePolicyCheck {
  checkRoutePolicy(path: string, method: string): RoutePolicy
}

export type IRoute<TRegistry extends XenoRegistry = XenoRegistry> = IRouteMatcher<TRegistry> &
  IRoutePolicyCheck
