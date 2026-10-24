import { beforeEach, describe, expect, it } from 'vitest'

import { GuidHelper } from '@/shared'

import type { IDomainEvent } from '../../events'
import { UniqueId } from '../../unique_id'
import { AggregateRoot } from '../aggregate-root'

interface TestEventPayload {
  foo: string
}

class TestAggregate extends AggregateRoot<{ test: boolean }, TestEventPayload, 'Test'> {
  public lastAppliedEvent: IDomainEvent<TestEventPayload> | null = null
  public state = ''

  protected apply(event: IDomainEvent<TestEventPayload>, _isNew: boolean): void {
    this.lastAppliedEvent = event
    if (event.eventType === 'TestEvent') {
      this.state = event.payload.foo
    }
  }

  public triggerTestEvent(foo: string) {
    this.raise({
      eventType: 'TestEvent',
      payload: { foo },
      destination: 'test-create',
      aggregateType: 'test',
    })
  }
}

describe('AggregateRoot', () => {
  let id: UniqueId<'Test'>
  let aggregate: TestAggregate

  beforeEach(() => {
    id = UniqueId.create<'Test'>('Test', 'test-id')
    aggregate = new TestAggregate({ test: true }, id.toString())
  })

  it('should initialize with the correct ID and version 0', () => {
    expect(GuidHelper.isValid(aggregate.id.toString())).toBe(true)
    expect(aggregate.version).toBe(0)
  })

  it('should add events to uncommitted events when raised', () => {
    aggregate.triggerTestEvent('bar')

    const uncommitted = aggregate.getUncommittedEvents()
    expect(uncommitted).toHaveLength(1)
    expect(uncommitted[0].eventType).toBe('TestEvent')
    expect(uncommitted[0].payload.foo).toBe('bar')
    expect(GuidHelper.isValid(uncommitted[0].aggregateId.getValue())).toBe(true)
    expect(uncommitted[0].version).toBe(1)
    expect(aggregate.version).toBe(1)
  })

  it('should clear uncommitted events', () => {
    aggregate.triggerTestEvent('bar')
    expect(aggregate.getUncommittedEvents()).toHaveLength(1)

    aggregate.clearUncommittedEvents()
    expect(aggregate.getUncommittedEvents()).toHaveLength(0)
  })

  it('should load from history and update version', () => {
    const history: IDomainEvent<TestEventPayload, 'Test'>[] = [
      {
        eventType: 'TestEvent',
        aggregateType: 'Test',
        payload: { foo: 'event1' },
        aggregateId: id,
        version: 1,
        occurredAt: new Date(),
        destination: 'test',
      },
      {
        eventType: 'TestEvent',
        aggregateType: 'Test',
        payload: { foo: 'event2' },
        aggregateId: id,
        version: 2,
        occurredAt: new Date(),
        destination: 'test',
      },
    ]

    aggregate.loadFromHistory(history)

    expect(aggregate.version).toBe(2)
    expect(aggregate.state).toBe('event2')
    expect(aggregate.getUncommittedEvents()).toHaveLength(0)
  })

  it('should not add events to uncommitted list when loading from history', () => {
    const history: IDomainEvent<TestEventPayload, 'Test'>[] = [
      {
        eventType: 'TestEvent',
        aggregateType: 'Test',
        payload: { foo: 'event1' },
        aggregateId: id,
        version: 1,
        occurredAt: new Date(),
        destination: 'test',
      },
    ]

    aggregate.loadFromHistory(history)

    expect(aggregate.getUncommittedEvents()).toHaveLength(0)
    expect(aggregate.version).toBe(1)
  })
})
