import { Component, useBusContext } from '@jotx/coreui'
import { createCodeMirror, createEditorFocus } from 'solid-codemirror'

export const CodeMirror: Component<{
  id: string
  title: string
  key: string
  content: string
}> = (props) => {
  const [bus] = useBusContext()

  bus().activation.listen((activation) => {
    if (activation.type === 'tab' && activation.section_id === 'editor' && activation.component_id === props.id) {
      setFocused(true)
    }
  })

  const { editorView, ref: editorRef } = createCodeMirror({
    value: props.content,
    onValueChange: (value) =>
      bus().content_change.emit({
        path: props.key,
        value,
        component_id: props.id,
      }),
    // onModelViewUpdate: (modelView) =>
    //   console.log("modelView updated", modelView),
    // onTransactionDispatched: (tr: Transaction, view: EditorView) =>
    //   console.log("Transaction", tr),
  })

  const { setFocused } = createEditorFocus(editorView)
  return <div data-title={props.title} data-key={props.key} ref={editorRef}></div>
}
