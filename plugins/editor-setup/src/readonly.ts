import { EditorView } from '@codemirror/view'
import { EditorExtensionCreatorProps } from '@jotx/coreui'
import { createCompartmentExtension } from '@jotx/editor'
import { createEffect, createSignal, on, untrack } from 'solid-js'

function getReadOnlyExtensions(readOnly: boolean) {
  return readOnly ? EditorView.editable.of(false) : []
}

/**
 * Allows to change the editor readOnly state by the given `readOnly` property value
 * @param view The editor view
 * @param readOnly The editor readOnly state
 */
export function createEditorReadonly({ view }: EditorExtensionCreatorProps) {
  const [readOnly] = createSignal(true)

  const localReadOnly = readOnly ? untrack(readOnly) : false

  const reconfigure = createCompartmentExtension(getReadOnlyExtensions(localReadOnly), view)

  createEffect(on(readOnly, (readOnly) => reconfigure(getReadOnlyExtensions(readOnly))))
}
