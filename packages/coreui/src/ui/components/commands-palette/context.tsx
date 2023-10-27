import { Ref, createContext, useContext } from 'solid-js'

export type Ctx = {
  value: (id: string, value: string) => void
  item: (id: string, groupId: string) => () => void
  group: (id: string) => () => void
  filter: () => boolean
  label: string
  commandRef: Ref<HTMLDivElement | null>
  listId: string
  labelId: string
  inputId: string
}

export const CommandContext = createContext<Ctx>(undefined)
export const useCommand = () => useContext(CommandContext)!
