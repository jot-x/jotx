import { Component } from 'solid-js'
import { Command } from '../ui/components/commands-palette/types'

export type CommandsComponentDefinition = {
  commands: Command[]
  settings?: CommandSettings[]
  component: Component<{ commands: Command[] }>
}

type CommandSettings = {
  setting: string
  prop: string
}
