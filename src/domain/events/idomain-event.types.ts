import type { UniqueId } from '../unique_id'

/**
 * @description DomainEvent is an interface that represents a domain event in the application. It defines the structure and properties of a domain event, which is a message that is published when a significant change
 * occurs within the domain. Domain events are used to notify other parts of the application about these changes and trigger appropriate actions.
 *
 * @author Xeno
 * @version 1.0.0
 */
export interface IDomainEvent<TPayload = unknown, TId extends string = string> {
  /**
   * @description The unique identifier of the aggregate that triggered the domain event.
   */
  readonly aggregateId: UniqueId<TId>
  /**
   * @description The type of the aggregate that triggered the domain event.
   */
  readonly aggregateType: string
  /**
   * @description The type of the domain event.
   */
  readonly eventType: string
  /**
   * @description The version of the domain event.
   */
  readonly version: number
  /**
   * @description The destination of the domain event.
   */
  readonly destination?: string
  /**
   * @description The timestamp when the domain event occurred.
   */
  readonly occurredAt: Date
  /**
   * @description The payload of the domain event, containing the specific data related to the event.
   */
  readonly payload: TPayload
}
