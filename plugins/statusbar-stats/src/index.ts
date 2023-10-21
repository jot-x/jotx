import { PluginOptions } from '@jotx/coreui'
import { SidebarStats } from './stats'

export const plugin = ({ addView, addComponent }: PluginOptions) => {
  addComponent('SidebarStats', SidebarStats)
  addView('status-bar', {
    name: 'SidebarStats',
  })
}
