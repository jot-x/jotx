import { PluginOptions } from '@jotx/coreui'
import { FileExplorer } from './explorer'

export const plugin = ({ addView, addComponent }: PluginOptions) => {
  addView('activity-bar', {
    name: 'ActivityButton',
    props: {
      activation: {
        type: 'tab',
        section_id: 'explorer',
        component_id: 'file-explorer',
      },
      icon: 'ph:files',
    },
  })

  addComponent('FileExplorer', FileExplorer)
  addView('explorer', { id: 'file-explorer', name: 'FileExplorer' })
}
