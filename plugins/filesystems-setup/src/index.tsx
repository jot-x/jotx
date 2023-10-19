import { PluginOptions } from '@jotx/coreui'
import { FileSystems } from './filesystems'

export const plugin = ({ addView, addComponent }: PluginOptions) => {
  addView('activity-bar-bottom', {
    name: 'ActivityButton',
    props: {
      activation: {
        type: 'action',
        action: 'open',
        component_id: 'filesystems-modal',
      },
      icon: 'notebook',
    },
  })

  addComponent('FileSystemsModal', FileSystems)
  addView('app', { name: 'FileSystemsModal' })
}
