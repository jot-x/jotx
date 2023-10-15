import { TreeNode } from './types'

export function findChildrenByParentId(tree: TreeNode, targetId: string): TreeNode[] {
  const results: TreeNode[] = []

  function traverse(node: TreeNode) {
    if (node.id === targetId) {
      results.push(node)
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  traverse(tree)

  return results
}

export function addToParent(tree: TreeNode, targetId: string, ...children: TreeNode[]): boolean {
  let found = false

  function traverseAndAdd(node: TreeNode): void {
    if (node.id === targetId) {
      if (!node.children) {
        node.children = []
      }
      node.children.push(...children)
      found = true
      return
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        traverseAndAdd(child)
      }
    }
  }

  traverseAndAdd(tree)
  return found
}

export function removeChildById(
  tree: TreeNode,
  parentId: string,
  childId: string,
): { removed: boolean; tree: TreeNode | null } {
  let removed = false

  function removeChild(node: TreeNode): boolean {
    if (node.id === parentId) {
      if (node.children) {
        const indexToRemove = node.children.findIndex((child) => child.id === childId)
        if (indexToRemove !== -1) {
          node.children.splice(indexToRemove, 1)
          removed = true
          return true
        }
      }
      return false // Parent found, but child with childId not found
    }

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        if (removeChild(node.children[i]!)) {
          return true // Child was found and removed
        }
      }
    }

    return false // Parent not found yet
  }

  removeChild(tree)

  return { removed, tree: removed ? tree : null }
}

export function getNodeById(tree: TreeNode, targetId: string): TreeNode | undefined {
  let result: TreeNode | undefined = undefined

  function traverse(node: TreeNode) {
    if (node.id === targetId) {
      result = node
      return
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        traverse(child)
        if (result) {
          return
        }
      }
    }
  }

  traverse(tree)

  return result
}
