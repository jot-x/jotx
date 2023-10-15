import { TreeNode, Workspace } from './types'
import { addToParent, getNodeById } from './utils'

export const makeWorkspace: Workspace = {
  tree: { id: '', name: '' },
  addTo: function ({ parentId }: { parentId: string }, ...node: TreeNode[]): boolean {
    return addToParent(this.tree, parentId, ...node)
  },
  findOne: function ({ parentId }: { parentId: string }): TreeNode | undefined {
    return getNodeById(this.tree, parentId)
  },
}
