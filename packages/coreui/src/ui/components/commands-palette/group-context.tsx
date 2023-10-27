import { createContext } from 'solid-js'

type Group = {
  id: string
  sticky?: boolean
}

export const GroupContext = createContext<Group>(undefined)
