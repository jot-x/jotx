import { Component, EDITOR_SECTION_ID, cn, useBusContext, usePlugins, useStyles } from '@jotx/coreui'
import { createEffect, onCleanup, splitProps } from 'solid-js'
import { createCodeMirror } from './codemirror/createCodeMirror'
import { useCodeMirror } from './context'
import { PluginRegistrationWithEditorExtension } from './types'

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export const CodeMirror: Component<{ title: string; key: string; content: string; class: string }> = (props) => {
  const { plugins } = usePlugins()
  const [bus] = useBusContext()
  const { editors, setEditors } = useCodeMirror()
  const { addStyles } = useStyles()

  const { editorView, ref: editorRef } = createCodeMirror({
    value: props.content,
    onValueChange: (value) => {
      bus().content_change.emit({
        type: 'change',
        value,
        section_id: EDITOR_SECTION_ID,
        component_id: props.id,
        key: props.key,
      })
    },
  })

  createEffect(() => {
    if (editorView() && editors.findIndex((t) => t.component_id === props.id) === -1) {
      setEditors(editors.length, { component_id: props.id, view: editorView() })
    }
  })

  createEffect(() => {
    plugins.forEach((p) => {
      const reg = p.registration as PluginRegistrationWithEditorExtension
      if (reg.editorExtensions && reg.editorExtensions.length > 0) {
        reg.editorExtensions.forEach((extCreator) => {
          extCreator({ view: editorView, bus, editor_id: props.id, addStyles })
        })
      }
    })
  })

  onCleanup(() => {
    setEditors((t) =>
      removeIndex(
        t,
        t.findIndex((t) => t.component_id === props.id),
      ),
    )
  })

  const [_, other] = splitProps(props, ['title', 'key', 'content', 'class'])

  return (
    <div
      {...other}
      class={cn(props.class, 'jotx-editor')}
      data-key={props.key}
      data-title={props.title}
      ref={editorRef}
    />
  )
}
