import { PluginOptions } from '@jotx/coreui'
import { FileSystems } from './filesystems'
import { InitFileSystem } from './init'

export const plugin = ({ addView, addComponent }: PluginOptions) => {
  addView('activity-bar-bottom', {
    name: 'ActivityButton',
    props: {
      activation: {
        type: 'action',
        action: 'open',
        component_id: 'filesystems-modal',
      },
      icon: 'ph:notebook',
    },
  })

  addComponent('FileSystemsModal', FileSystems)
  addView('app', { name: 'FileSystemsModal' })

  addComponent('InitFileSystem', InitFileSystem)
  addView('hidden', { name: 'InitFileSystem' })
}
