import type { Optional, ResponseDto, XenoRequest } from '@/shared'

import type { XenoRegistry } from '../../registries'

export interface IHttpDispatcher<TRegistry extends XenoRegistry = XenoRegistry> {
  handle<TInput, TOutput, K extends keyof TRegistry>(
    req: XenoRequest,
    token: K,
    input?: Optional<TInput>,
  ): Promise<ResponseDto<TOutput>>
}
