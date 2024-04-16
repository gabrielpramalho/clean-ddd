import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate  // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber registered (listening the event 'custom create')
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // "I am creating an answer, but without saving in db
    const aggregate = CustomAggregate.create()

    // I am ensuring that the event was created, but it was not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // I am saving the answer in the database and thus triggering the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // The subscriber listen to the event and do what needs to be done with the data
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
