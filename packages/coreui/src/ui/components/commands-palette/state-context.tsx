import { createContext, useContext } from 'solid-js'

export type State = {
  /**
   * Search query
   */
  search: string

  /**
   * Current selected item value
   */
  value?: string | undefined

  /**
   * Filtered entries
   */
  filtered: {
    /** count of all visible items */
    count: number
    /**
     * Map from visible item id to its search score
     */
    items: Map<string, number>
    /**
     * Set of groups with at least one visible item
     */
    groups: Set<string>
  }
}

export type Store = {
  subscribe: (callback: () => void) => () => void
  snapshot: () => State
  setState: <K extends keyof State>(key: K, value: State[K], opts?: any) => void
  emit: () => void
}

export const StoreContext = createContext<Store>(undefined)
export const useStore = () => useContext(StoreContext)!
