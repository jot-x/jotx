import { batch, createContext, createUniqueId, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useWorkspace } from '../workspace/context'
import { IPlugin, PluginRegistration } from './types'

export const makePluginsContext = (
  initialPlugins: string[],
  registerPlugin: (id: string) => Promise<PluginRegistration>,
) => {
  const [plugins] = createStore<IPlugin[]>([])
  const { addTo, addComponent } = useWorkspace()

  const addPlugin = (id: string) => {
    registerPlugin(id).then((p) => {
      batch(() => {
        p.components.forEach((c) => addComponent(c.name, c.component))
        Object.keys(p.nodes).forEach((targetId) => {
          const nodes = p.nodes[targetId]
          if (nodes) {
            const idnodes = nodes.map((n) => ({ ...n, id: createUniqueId() }))
            if (!addTo(targetId, ...idnodes)) console.warn(`could not add node to to section ${targetId}`)
          }
        })
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

  return { addPlugin, removePlugin }
}

export type PluginsContextType = ReturnType<typeof makePluginsContext>
export const PluginsContext = createContext<PluginsContextType>()
export const usePlugins = () => useContext(PluginsContext)!
