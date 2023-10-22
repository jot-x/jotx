import { PluginOptions } from '@jotx/coreui'
import { AutoSave } from './autosave'

export const plugin = ({ addView, addComponent }: PluginOptions) => {
  addComponent('AutoSave', AutoSave)
  addView('status-bar-left', {
    name: 'AutoSave',
  })
}
