import {
  Listen as _Listen,
  Listener as _Listener,
  Emit as _Emit,
  EventBus as _EventBus,
  EventStack as _EventStack,
  EventHub as _EventHub,
  EventHubChannel as _EventHubChannel,
} from '@solid-primitives/event-bus'

export type Listener<T = void> = _Listener<T>
export type Listen<T> = _Listen<T>
export type Emit<T = void> = _Emit<T>

export type EventBus<T> = _EventBus<T>
export type EventStack<E, V = E> = _EventStack<E, V>

export type EventHubChannel<T, V = T> = _EventHubChannel<T, V>
export type EventHub<
  M extends {
    readonly [key: string | number]: EventHubChannel<any>
  },
> = _EventHub<M>

export type EventStackConfig<E, V = E> = {
  readonly length?: number
  readonly toValue?: (event: E, stack: V[]) => V
}

export type TabActivation = {
  type: 'tab'
  section_id: string
  component_id: string | undefined
}

export type ActionActivation = {
  type: 'action'
  action: string
  component_id: string
}

export type Activation = TabActivation | ActionActivation
