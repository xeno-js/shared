import type { Optional } from '@/shared'

import type { ResultType } from '../../results'

export interface IEventHandler<TEvent = unknown> {
  readonly eventType: string
  handle(event: TEvent, signal?: Optional<AbortSignal>): Promise<ResultType<void>>
}
