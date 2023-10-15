import {
  createEventBus as _createEventBus,
  createEventHub as _createEventHub,
  createEventStack as _createEventStack,
} from '@solid-primitives/event-bus'
import { EventBus, EventHub, EventHubChannel, EventStack, EventStackConfig } from './types'

export function createEventBus<T>(): EventBus<T> {
  return _createEventBus<T>()
}

export function createEventHub<
  M extends {
    readonly [key: string | number]: EventHubChannel<any>
  },
>(defineChannels: ((bus: typeof createEventBus) => M) | M): EventHub<M> {
  const bus = _createEventHub<M>(defineChannels)
  return bus
}

export function createEventStack<E, V extends object>(
  config: EventStackConfig<E, V> & {
    toValue: (event: E, stack: V[]) => V
  },
): EventStack<E, V> {
  const stack = _createEventStack(config) as EventStack<E, V>
  return stack
}
