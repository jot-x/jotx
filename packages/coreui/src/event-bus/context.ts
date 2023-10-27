import { createContext, createSignal, useContext } from 'solid-js'
import { Activation, ContentEvent, EventBus, EventHub, EventHubChannel, EventStack } from './types'

export interface HubType {
  activation: EventBus<Activation>
  new_tab: EventBus<{ section_id: string }>
  content_change: EventBus<ContentEvent>
  content_open: EventBus<ContentEvent>
  notifications: EventStack<
    string,
    {
      text: string
    }
  >
  [key: string | number]: EventHubChannel<any>
}

/**
 * a factory function that produces the value for a context
 *
 * @param initialBus  the hub instance
 * @returns
 */
export const makeEventbusContext = (initialBus: EventHub<HubType>) => {
  const [bus, setBus] = createSignal(initialBus)
  return [bus, setBus] as const
}

// grab the return type of that function using TypeScript's ReturnType type helper
type EventBusContextType = ReturnType<typeof makeEventbusContext>
export const BusContext = createContext<EventBusContextType>()
export const useBusContext = () => useContext(BusContext)!
