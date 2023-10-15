import { beforeEach, describe, expect, test } from 'vitest'
import { Workspace } from './types'
import { makeWorkspace } from './workspace'

describe('workspace', () => {
  let ws: Workspace
  beforeEach(() => {
    ws = { ...makeWorkspace, tree: { id: 'r-1', name: 'Root' } }
  })

  describe('add', () => {
    test('add multi', () => {
      const children = [
        { id: 'c-1', name: 'div' },
        { id: 'c-2', name: 'div' },
      ]
      expect(ws.addTo({ parentId: 'r-1' }, ...children)).toBeTruthy()
      expect(ws.tree.children).toEqual(children)
    })
    test('add to non existing', () => {
      expect(ws.addTo({ parentId: 'none' }, { id: 'foo', name: 'bar' })).toBeFalsy()
    })
  })

  describe('findOne', () => {
    test('find', () => {
      const tree = {
        id: 'r-1',
        name: 'Root',
        children: [
          {
            id: 'r-r-1',
            children: [
              { id: 'c1', name: 'div' },
              { id: 'c2', name: 'div' },
            ],
          },
        ],
      }

      const ws = {
        ...makeWorkspace,
        tree,
      }

      expect(ws.findOne({ parentId: 'r-r-1' })?.children).toEqual(tree.children[0]?.children)
    })
  })
})
