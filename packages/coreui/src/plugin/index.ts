import { Component as ComponentNoIDRequired } from 'solid-js'
import { IRoute } from '../routing/types'
import { Optional } from '../types'
import { Component } from '../ui/types'
import { TreeNode as _TreeNode } from '../workspace/types'
import { PluginComponentDefinition } from './types'

type TreeNode = Optional<_TreeNode, 'id'>

export const makePlugin = (plugin: string) => {
  const components: PluginComponentDefinition[] = []
  const routes: IRoute[] = []
  const treeNodes: Record<string, TreeNode[]> = {}

  return {
    routes,
    components,
    treeNodes,
    addRoute: (path: string, component: ComponentNoIDRequired) => {
      routes.push({ plugin, path, component })
    },
    addComponent: (name: string, component: Component<any>) => {
      components.push({ plugin, name, component })
    },
    addView: (targetId: string, ...nodes: TreeNode[]) => {
      if (!treeNodes[targetId]) treeNodes[targetId] = []
      nodes.forEach((n) => treeNodes[targetId]?.push(n))
    },
  }
}
