import { createMemo } from 'solid-js'
import { useSyncExternalStore } from 'solid-react-hooks'
import { State, useStore } from './state-context'

/** Run a selector against the store state. */
export const cmd = <T = any>(selector: (state: State) => T) =>
  createMemo(() => {
    const store = useStore()
    const cb = () => selector(store.snapshot())
    return useSyncExternalStore(store.subscribe, cb, cb)
  })
