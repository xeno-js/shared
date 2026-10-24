import type { Guid } from '@/shared'

export type OutboxStatus = 'PENDING' | 'PROCESSING' | 'PUBLISHED' | 'FAILED'

export interface OutboxMessage<TPayload = unknown> {
  id: Guid
  aggregateId: string
  aggregateType: string
  type: string
  payload: TPayload
  createdAt: Date
  version: number
  status: OutboxStatus
  correlationId: Guid
  requestId?: Guid
  tenantId?: Guid
  userId?: Guid
  destination?: string
  retryCount: number
  lastError?: string
  publishedAt?: Date
}
