import { Component as SolidComponent } from 'solid-js'
import { CommandsComponentDefinition } from '../command/types'
import { IRoute } from '../routing/types'
import { Optional } from '../types'
import { Component } from '../ui/types'
import { TreeNode } from '../workspace/types'

export type IPlugin = {
  id: string
  title: string
  description: string
  package: string
  registration: PluginRegistration
}

export type PluginRegistration = {
  meta: IPlugin
  components: PluginComponentDefinition[]
  routes: IRoute[]
  nodes: Record<string, Optional<TreeNode, 'id'>[]>
  commands: CommandsComponentDefinition[]
}

export type PluginComponentDefinition = {
  plugin: string
  name: string
  component: Component
}

export type PluginOptions = {
  addComponent: (key: string, component: Component<any>) => void
  addRoute: (path: string, component: SolidComponent) => void
  addView: (targetId: string, ...nodes: Omit<TreeNode, 'id'>[]) => void
  addCommand: (...defs: CommandsComponentDefinition[]) => void
}
