import type { Optional } from '@/shared'

import { Entity } from '../entities'
import type { IDomainEvent } from '../events'

/**
 * @description AggregateRoot is an abstract class that represents the base class for all aggregate roots in the application. An aggregate root is the root entity of an aggregate, which is a group of related entities and value objects that are treated as a single unit. The AggregateRoot class provides common functionality for managing the state and behavior of aggregate roots, including methods for adding and retrieving uncommitted events, and methods for applying events to the aggregate.
 *
 * @author Xeno
 * @version 1.0.0
 */
export abstract class AggregateRoot<
  TProps,
  TEvent = unknown,
  TId extends string = string,
> extends Entity<TProps, TId> {
  private _version = 0
  private readonly _uncommittedEvents: IDomainEvent<TEvent, TId>[] = []

  /**
   * @description Constructs a new instance of the AggregateRoot class with the specified ID.
   * @param {UniqueId} id - The ID of the aggregate.
   */
  constructor(props: TProps, id?: Optional<string>) {
    super(props, id)
  }

  /**
   * @description Gets the current version of the aggregate.
   * @returns {number} The current version of the aggregate.
   */
  public get version(): number {
    return this._version
  }

  /**
   * @description Gets the uncommitted events of the aggregate.
   * @returns {readonly IDomainEvent[]} The uncommitted events of the aggregate.
   */
  public getUncommittedEvents(): readonly IDomainEvent<TEvent, TId>[] {
    return [...this._uncommittedEvents]
  }

  /**
   * @description Clears the uncommitted events of the aggregate.
   */
  public clearUncommittedEvents(): void {
    this._uncommittedEvents.length = 0
  }

  /**
   * @description Loads the aggregate from a history of domain events.
   * @param {IDomainEvent<TEvent, TId>[]} history - The history of domain events to load.
   */
  public loadFromHistory(history: IDomainEvent<TEvent, TId>[]): void {
    for (const event of history) {
      this.apply(event, false)
      this._version = event.version
    }
  }

  /**
   * @description Raises a domain event and adds it to the uncommitted events list.
   * @param {Omit<IDomainEvent<TEvent, TId>, 'aggregateId' | 'version' | 'occurredAt'>} eventData - The data of the domain event to raise.
   */
  protected raise(
    eventData: Omit<IDomainEvent<TEvent, TId>, 'aggregateId' | 'version' | 'occurredAt'>,
  ): void {
    this._version++

    const fullEvent: IDomainEvent<TEvent, TId> = {
      ...eventData,
      aggregateId: this.id,
      version: this._version,
      occurredAt: new Date(),
    }

    this.apply(fullEvent, true)

    this._uncommittedEvents.push(fullEvent)
  }

  /**
   * @description Applies a domain event to the aggregate root.
   * @param {IDomainEvent<TEvent, TId>} event - The domain event to apply.
   * @param {boolean} isNew - Indicates whether the event is new or already committed.
   */
  protected abstract apply(event: IDomainEvent<TEvent, TId>, isNew: boolean): void
}
