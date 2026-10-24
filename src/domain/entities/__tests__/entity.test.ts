import { describe, expect, it, vi } from 'vitest'

import { UniqueId } from '@/domain/unique_id'

import { Entity } from '../entity'
vi.mock('@/domain/unique_id/unique-id', () => ({
  UniqueId: class MockUniqueId {
    private constructor(private readonly value: string) {}

    static create<TKind extends string>(_kind: TKind, id?: string): MockUniqueId {
      return new MockUniqueId(id ?? '00000000-0000-4000-8000-000000000001')
    }

    getValue(): string {
      return this.value
    }
  },
}))

vi.mock('@/shared', () => ({
  Guards: {
    isNullOrEmpty: (value: string | undefined) => value === undefined || value === '',
  },
  GuidHelper: {
    generate: () => '00000000-0000-4000-8000-000000000001',
    isValid: (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value),
  },
}))

interface SampleProps {
  name: string
  tags: string[]
}

class SampleEntity extends Entity<SampleProps> {
  constructor(props: SampleProps, id?: string) {
    super(props, id)
  }
}

describe('Entity', () => {
  it('creates a new UniqueId when no id is provided', () => {
    const props: SampleProps = { name: 'alice', tags: ['admin'] }

    const entity = new SampleEntity(props)

    expect(entity.id).toBeInstanceOf(UniqueId)
    expect(entity.getProps()).toEqual(props)
  })

  it('uses the provided UniqueId when it is valid', () => {
    const props: SampleProps = { name: 'bob', tags: ['user'] }
    const id = '00000000-0000-4000-8000-000000000002'

    const entity = new SampleEntity(props, id)

    expect(entity.id.getValue()).toBe(id)
    expect(entity.getProps()).toEqual(props)
  })

  it('throws when an invalid UniqueId is provided', () => {
    const props: SampleProps = { name: 'carol', tags: [] }
    const invalidId = 'not-a-guid'

    expect(() => new SampleEntity(props, invalidId)).toThrow(
      `Invalid UniqueId provided: ${invalidId}.`,
    )
  })

  it('getProps returns the properties of the entity', () => {
    const props: SampleProps = { name: 'dave', tags: ['editor'] }
    const entity = new SampleEntity(props)

    expect(entity.getProps()).toEqual(props)
  })

  it('properties are immutable', () => {
    const props: SampleProps = { name: 'eve', tags: ['viewer'] }
    const entity = new SampleEntity(props)

    const retrievedProps = entity.getProps()
    retrievedProps.name = 'mallory'
    retrievedProps.tags.push('hacker')

    expect(entity.getProps()).toEqual(props)
  })

  it('getId returns the UniqueId of the entity', () => {
    const props: SampleProps = { name: 'grace', tags: ['moderator'] }
    const entity = new SampleEntity(props)

    expect(entity.getId()).toBe(entity.id)
  })
})
