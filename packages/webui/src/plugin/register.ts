import { makePlugin, PluginRegistration } from '@jotx/coreui'
import { getPluginMetadata } from './get-plugin'

export const registerPlugin = async (id: string): Promise<PluginRegistration> => {
  const meta = getPluginMetadata(id)
  if (!meta) {
    throw Error(`plugin ${id} does not exist`)
  }

  const p = await import(`@jotx/filesystem-setup-plugin/src/index`)
  const mp = makePlugin(id)
  p.plugin(mp)

  return {
    components: mp.components,
    nodes: mp.treeNodes,
    routes: mp.routes,
  }
}
