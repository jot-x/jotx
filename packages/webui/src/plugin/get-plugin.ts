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

  const editor_setup = {
    id: 'editor-setup',
    title: 'Editor Setup',
    description: 'The editor setup',
    package: '@jotx/editor-setup-plugin',
  }

  const editor_markdown = {
    id: 'editor-markdown',
    title: 'Editor Markdown',
    description: 'The editor markdown',
    package: '@jotx/editor-markdown-plugin',
  }

  const statusbar_stats = {
    id: 'statusbar-stats',
    title: 'StatusBar Statistics',
    description: 'Show total words and chars of the active content',
    package: '@jotx/statusbar-stats-plugin',
  }

  const autosave = {
    id: 'autosave',
    title: 'Autosave',
    description: 'Autosave modified files',
    package: '@jotx/autosave-plugin',
  }

  const vercel_theme = {
    id: 'vercel-theme',
    title: 'Vercel Theme',
    description: 'A Vercel styled theme',
    package: '@jotx/vercel-theme-plugin',
  }

  const reg: Record<string, IPlugin> = {
    'filesystems-setup': fs_setup,
    'file-explorer': file_explorer,
    'editor-setup': editor_setup,
    'statusbar-stats': statusbar_stats,
    autosave,
    'vercel-theme': vercel_theme,
    'editor-markdown': editor_markdown,
  }

  return reg[id]!
}
