import { PluginOptions } from '@jotx/coreui'
import { CodeMirror } from './codemirror'

export const plugin = ({ addComponent }: PluginOptions) => {
  addComponent('Markdown', CodeMirror)
}
