import { IPlugin } from '@jotx/coreui'

export const getPluginMetadata = (id: string) => {
  const fs = {
    id: 'filesystems-setup',
    title: 'FileSystem Setup',
    description: 'Core plugi',
    package: '@jotx/filesystem-setup-plugin',
  }

  const reg: Record<string, IPlugin> = { 'filesystems-setup': fs }

  return reg[id]!
}
