import { createContext, useContext } from 'solid-js'
import { createStore, modifyMutable, reconcile, unwrap } from 'solid-js/store'
import { TreeNode } from './types'
import { addToParent, getNodeById, removeChildById } from './utils'

export const makeWorkspaceContext = (initialTree: TreeNode) => {
  const [tree] = createStore(initialTree)

  const addTo = (targetId: string, ...node: TreeNode[]): boolean => {
    const t = JSON.parse(JSON.stringify(unwrap(tree)))
    if (addToParent({ ...t }, targetId, ...node)) {
      modifyMutable(tree, reconcile(t))
      return true
    }
    return false
  }

  const findById = (targetId: string): TreeNode | undefined => getNodeById(tree, targetId)

  const removeChildrenById = (parentId: string, childId: string) => {
    const t = JSON.parse(JSON.stringify(unwrap(tree)))
    const { removed, tree: updatedTree } = removeChildById(t, parentId, childId)
    if (removed && updatedTree) modifyMutable(tree, reconcile(t))
  }

  return {
    tree,
    addTo,
    findById,
    removeChildrenById,
  } as const
  // `as const` forces tuple type inference
}

export type WorkspaceContextType = ReturnType<typeof makeWorkspaceContext>
export const WorkspaceContext = createContext<WorkspaceContextType>()
export const useWorkspace = () => useContext(WorkspaceContext)!
