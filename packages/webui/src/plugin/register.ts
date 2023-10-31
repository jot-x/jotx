import { PluginRegistrationWithEditorExtension } from '@jotx/editor'
import { getPluginMetadata } from './get-plugin'
import { makePlugin } from './make-plugin'

export const registerPlugin = async (id: string): Promise<PluginRegistrationWithEditorExtension> => {
  const meta = getPluginMetadata(id)
  if (!meta) {
    throw Error(`plugin ${id} does not exist`)
  }

  let p

  if (id === 'filesystems-setup') {
    p = await import('@jotx/filesystem-setup-plugin/src/index')
  } else if (id === 'file-explorer') {
    p = await import('@jotx/file-explorer-plugin/src/index')
  } else if (id === 'editor-setup') {
    p = await import('@jotx/editor-setup-plugin/src/index')
  } else if (id === 'statusbar-stats') {
    p = await import('@jotx/statusbar-stats-plugin/src/index')
  } else if (id === 'autosave') {
    p = await import('@jotx/autosave-plugin/src/index')
  } else if (id === 'vercel-theme') {
    p = await import('@jotx/vercel-theme-plugin/src/index')
  } else if (id === 'editor-markdown') {
    p = await import('@jotx/editor-markdown-plugin/src/index')
  }
  if (!p) {
    throw Error(`Plugin ${id} not found`)
  }

  const mp = makePlugin(id)
  p.plugin(mp)

  return {
    meta,
    components: mp.components,
    nodes: mp.treeNodes,
    routes: mp.routes,
    commands: mp.commands,
    editorExtensions: mp.editorExtensions,
  }
}
