import { makePlugin, PluginRegistration } from '@jotx/coreui'
import { getPluginMetadata } from './get-plugin'

export const registerPlugin = async (id: string): Promise<PluginRegistration> => {
  const meta = getPluginMetadata(id)
  if (!meta) {
    throw Error(`plugin ${id} does not exist`)
  }

  let p

  if (id === 'filesystems-setup') {
    p = await import('@jotx/filesystem-setup-plugin/src/index')
  } else if (id === 'file-explorer') {
    p = await import('@jotx/file-explorer-plugin/src/index')
  } else if (id === 'markdown') {
    p = await import('@jotx/markdown-plugin/src/index')
  } else if (id === 'statusbar-stats') {
    p = await import('@jotx/statusbar-stats-plugin/src/index')
  }

  const mp = makePlugin(id)
  p.plugin(mp)

  return {
    components: mp.components,
    nodes: mp.treeNodes,
    routes: mp.routes,
  }
}
