import { makePlugin as _makePlugin } from '@jotx/coreui'
import { EditorExtensionCreator } from '@jotx/editor'

export const makePlugin = (id: string) => {
  const result = _makePlugin(id)
  const editorExtensions: EditorExtensionCreator[] = []

  const addEditorExtension = (...extensions: EditorExtensionCreator[]) => {
    editorExtensions.push(...extensions)
  }
  return { ...result, editorExtensions, addEditorExtension }
}
