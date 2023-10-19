import { createContext, useContext } from 'solid-js'
import { createStore, modifyMutable, reconcile, unwrap } from 'solid-js/store'
import { Component, ComponentRegistry } from '../ui/types'
import { TreeNode } from './types'
import { addToParent, getNodeById, removeChildById } from './utils'

export const makeWorkspaceContext = (initialTree: TreeNode, initialComponents: ComponentRegistry) => {
  const [tree] = createStore(initialTree)
  const [components, setComponents] = createStore(initialComponents)

  const addTo = (targetId: string, ...node: TreeNode[]): boolean => {
    const t = JSON.parse(JSON.stringify(unwrap(tree)))
    if (addToParent({ ...t }, targetId, ...node)) {
      modifyMutable(tree, reconcile(t))
      return true
    }
    return false
  }

  const addComponent = (name: string, component: Component) => {
    const comps = JSON.parse(JSON.stringify(unwrap(components)))
    comps[name] = component
    setComponents(comps)
  }

  const findById = (targetId: string): TreeNode | undefined => getNodeById(tree, targetId)

  const removeChildrenById = (parentId: string, childId: string) => {
    const t = JSON.parse(JSON.stringify(unwrap(tree)))
    const { removed, tree: updatedTree } = removeChildById(t, parentId, childId)
    if (removed && updatedTree) modifyMutable(tree, reconcile(t))
  }

  return {
    tree,
    components,
    addComponent,
    addTo,
    findById,
    removeChildrenById,
  } as const
  // `as const` forces tuple type inference
}

export type WorkspaceContextType = ReturnType<typeof makeWorkspaceContext>
export const WorkspaceContext = createContext<WorkspaceContextType>()
export const useWorkspace = () => useContext(WorkspaceContext)!
