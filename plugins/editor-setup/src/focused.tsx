import { EditorView } from '@codemirror/view'
import { EditorExtensionCreatorProps, createCompartmentExtension } from '@jotx/editor'
import { createSignal } from 'solid-js'

export function createEditorFocus({ view, bus, editor_id }: EditorExtensionCreatorProps) {
  const [_, setInternalFocused] = createSignal(view()?.hasFocus ?? false)

  bus().activation.listen((activation) => {
    if (activation.type === 'tab' && activation.section_id === 'editor' && activation.component_id === editor_id) {
      // TODO this is a hack specifically for undo/redo which comes not from a user UI action
      setTimeout(() => {
        setFocused(true)
      })
    }
  })

  const focusListener = EditorView.focusChangeEffect.of((state, focusing) => {
    setInternalFocused(focusing)
    return null
  })

  void createCompartmentExtension(focusListener, view)

  const setFocused = (focused: boolean) => {
    setInternalFocused(focused)
    const viewValue = view()
    if (!viewValue) return
    viewValue.focus()
  }
}
