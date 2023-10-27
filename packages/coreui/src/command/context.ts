import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { CommandsComponentDefinition } from './types'

export const makeCommandsContext = (initialCommands: CommandsComponentDefinition[]) => {
  const [commands, setCommands] = createStore<CommandsComponentDefinition[]>(initialCommands)

  const addCommand = (...cmds: CommandsComponentDefinition[]) => {
    setCommands([...commands, ...cmds])
  }

  return { commands, addCommand }
}

export type CommandsContextType = ReturnType<typeof makeCommandsContext>
export const CommandsContext = createContext<CommandsContextType>()
export const useCommands = () => useContext(CommandsContext)!
