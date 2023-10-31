import { PluginOptions } from '@jotx/coreui'
import { PluginEditorOptions } from '@jotx/editor'
import { createBlackQuote } from './blockquote'
import { createMarkdownExtension } from './md'
import { createThemeExtension } from './theme'

export const plugin = ({ addEditorExtension }: PluginOptions & PluginEditorOptions) => {
  addEditorExtension(createMarkdownExtension)
  addEditorExtension(createThemeExtension)
  addEditorExtension(createBlackQuote)
}
