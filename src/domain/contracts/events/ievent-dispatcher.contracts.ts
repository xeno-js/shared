import type { Optional } from '@/shared'

import type { ResultType } from '../../results'
import type { IEventHandler } from './ievent-handler.contracts'

export interface IEventDispatcher {
  publish<TEvent extends { eventType: string }>(
    event: TEvent,
    signal?: Optional<AbortSignal>,
  ): Promise<ResultType<void>>
  subscribe<TEvent>(eventType: string, handler: IEventHandler<TEvent>): void
}
