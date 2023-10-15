import { AnyProps } from '../ui/types'

export interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
  props?: AnyProps
}

export type Workspace = {
  tree: TreeNode
  addTo({ parentId }: { parentId: string }, ...node: TreeNode[]): boolean
  findOne({ parentId }: { parentId: string }): TreeNode | undefined
}
