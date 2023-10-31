import { PluginOptions } from '@jotx/coreui'
import { ThemeCommand } from './theme'

export const plugin = ({ addCommand }: PluginOptions) => {
  addCommand(ThemeCommand)
}
