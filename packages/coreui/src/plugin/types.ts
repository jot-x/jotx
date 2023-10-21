import { IRoute } from '../routing/types'
import { Optional } from '../types'
import { Component } from '../ui/types'
import { TreeNode } from '../workspace/types'

export type IPlugin = {
  id: string
  title: string
  description: string
  package: string
}

export type PluginRegistration = {
  components: PluginComponentDefinition[]
  routes: IRoute[]
  nodes: Record<string, Optional<TreeNode, 'id'>[]>
}

export type PluginComponentDefinition = {
  plugin: string
  name: string
  component: Component
}

export type PluginOptions = {
  addComponent: (key: string, component: Component<any>) => void
  addRoute: (path: string, component: Component) => void
  addView: (targetId: string, ...nodes: Omit<TreeNode, 'id'>[]) => void
}
