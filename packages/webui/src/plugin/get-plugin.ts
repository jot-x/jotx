import { IPlugin } from '@jotx/coreui'

export const getPluginMetadata = (id: string) => {
  const fs_setup = {
    id: 'filesystems-setup',
    title: 'FileSystem Setup',
    description: 'Core plugin for managing filesystems',
    package: '@jotx/filesystem-setup-plugin',
  }

  const file_explorer = {
    id: 'file-explorer',
    title: 'File Explorer',
    description: 'Browse file system',
    package: '@jotx/file-explorer-plugin',
  }

  const markdown = {
    id: 'markdown',
    title: 'Markdown Editor',
    description: 'CodeMirror Markdown editor',
    package: '@jotx/markdown-plugin',
  }

  const statusbar_stats = {
    id: 'statusbar-stats',
    title: 'StatusBar Statistics',
    description: 'Show total words and chars of the active content',
    package: '@jotx/statusbar-stats-plugin',
  }

  const reg: Record<string, IPlugin> = {
    'filesystems-setup': fs_setup,
    'file-explorer': file_explorer,
    markdown,
    'statusbar-stats': statusbar_stats,
  }

  return reg[id]!
}
