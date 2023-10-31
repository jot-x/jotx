import { PluginOptions } from '@jotx/coreui'
import { PluginEditorOptions } from '@jotx/editor'
import { createEditorFocus } from './focused'
import { createLineWrappingExtension } from './line-wrapping'

export const plugin = ({ addEditorExtension }: PluginOptions & PluginEditorOptions) => {
  addEditorExtension(createEditorFocus)
  addEditorExtension(createLineWrappingExtension)
}
