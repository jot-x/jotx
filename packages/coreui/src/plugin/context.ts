import { batch, createContext, createUniqueId, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useCommands } from '../command/context'
import { useWorkspace } from '../workspace/context'
import { TreeNode } from '../workspace/types'
import { IPlugin, PluginRegistration } from './types'

export const makePluginsContext = (
  initialPlugins: string[],
  registerPlugin: (id: string) => Promise<PluginRegistration>,
) => {
  const [plugins, setPlugins] = createStore<IPlugin[]>([])

  const { addTo, addComponent } = useWorkspace()
  const { addCommand } = useCommands()

  const addPlugin = (id: string) => {
    registerPlugin(id).then((p) => {
      setPlugins((prev) => [...prev, { ...p.meta, registration: p }])
      batch(() => {
        p.components.forEach((c) => addComponent(c.name, c.component))
        Object.keys(p.nodes).forEach((targetId) => {
          const nodesNoId = p.nodes[targetId]
          const nodes: TreeNode[] = []
          if (nodesNoId) {
            nodesNoId.forEach((n) => (n.id ? nodes.push(n as TreeNode) : nodes.push({ ...n, id: createUniqueId() })))
            if (!addTo(targetId, ...nodes)) console.warn(`could not add node to to section ${targetId}`)
          }
        })
        if (p.commands) addCommand(...p.commands)
      })
    })
    // TODO update store
  }

  const removePlugin = (plugin: string) => {
    // TODO remove...
  }

  initialPlugins.forEach(async (pid) => {
    addPlugin(pid)
  })

  return { plugins, addPlugin, removePlugin }
}

export type PluginsContextType = ReturnType<typeof makePluginsContext>
export const PluginsContext = createContext<PluginsContextType>()
export const usePlugins = () => useContext(PluginsContext)!
