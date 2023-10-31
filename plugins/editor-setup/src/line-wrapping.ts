import { EditorView } from '@codemirror/view'
import { CssStyles } from '@jotx/coreui'
import { EditorExtensionCreatorProps, createCompartmentExtension } from '@jotx/editor'
import { createEffect, on, untrack } from 'solid-js'

function getLineWrappingExtensions(lineWrapping: boolean) {
  return lineWrapping ? EditorView.lineWrapping : []
}

function applyStyles(addStyles: (...style: CssStyles[]) => void) {
  addStyles({
    selector: '.jotx-editor .cm-lineWrapping',
    styles: [
      { 'flex-shrink': 1 },
      { 'overflow-wrap': 'anywhere' },
      { 'white-space': 'break-spaces' },
      { 'word-break': 'break-word' },
    ],
  })
}

/**
 * Allows to change the editor lineWrapping state by the given `lineWrapping` property value
 * @param view The editor view
 * @param lineWrapping The editor lineWrapping state
 */
export function createLineWrappingExtension(
  { view, addStyles }: EditorExtensionCreatorProps,
  // lineWrapping: Accessor<boolean>,
) {
  const lineWrapping = () => true
  const localLineWrapping = lineWrapping ? untrack(lineWrapping) : true
  applyStyles(addStyles)

  const reconfigure = createCompartmentExtension(getLineWrappingExtensions(localLineWrapping), view)

  createEffect(on(lineWrapping, (lineWrapping) => reconfigure(getLineWrappingExtensions(lineWrapping))))
}
