import type { EditorView } from '@codemirror/view'
import type { CssStyles, HubType, PluginRegistration } from '@jotx/coreui'
import { Accessor } from 'solid-js'

export interface OpenedEditor {
  component_id: string
  view: EditorView
}

export type EditorExtensionCreatorProps = {
  view: Accessor<EditorView | undefined>
  editor_id: string
  bus: Accessor<HubType>
  addStyles: (...style: CssStyles[]) => void
}

export type EditorExtensionCreator = (props: EditorExtensionCreatorProps) => void

export type PluginRegistrationWithEditorExtension = PluginRegistration & {
  editorExtensions: EditorExtensionCreator[]
}

export type PluginEditorOptions = {
  addEditorExtension: (...extensions: EditorExtensionCreator[]) => void
}
