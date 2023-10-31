// MIT License
// Copyright (c) 2022 Riccardo Perra

import { EditorState, Extension, Transaction } from '@codemirror/state'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { Accessor, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js'
import { createCompartmentExtension as coreCreateCompartmentExtension } from './createCompartmentExtension'

export interface CreateCodeMirrorProps {
  /**
   * The initial value of the editor
   */
  value?: string
  /**
   * Fired whenever the editor code value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * Fired whenever a change occurs to the document, every time the view updates.
   */
  onModelViewUpdate?: (vu: ViewUpdate) => void
  /**
   * Fired whenever a transaction has been dispatched to the view.
   * Used to add external behavior to the transaction [dispatch function](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) for this editor view, which is the way updates get routed to the view
   */
  onTransactionDispatched?: (tr: Transaction, view: EditorView) => void
}

/**
 * Creates a CodeMirror editor instance.
 */
export function createCodeMirror(props?: CreateCodeMirrorProps) {
  const [ref, setRef] = createSignal<HTMLElement>()
  const [editorView, setEditorView] = createSignal<EditorView>()

  function localCreateCompartmentExtension(extension: Extension | Accessor<Extension | undefined>) {
    return coreCreateCompartmentExtension(extension, editorView)
  }

  const updateListener = EditorView.updateListener.of((vu) => props?.onModelViewUpdate?.(vu))

  // eslint-disable-next-line solid/reactivity
  localCreateCompartmentExtension(updateListener)

  createEffect(
    on(ref, (ref) => {
      const state = EditorState.create({ doc: props?.value ?? '' })
      const currentView = new EditorView({
        state,
        parent: ref,
        // Replace the old `updateListenerExtension`
        dispatch: (transaction, editorView) => {
          if (props?.onTransactionDispatched) {
            props.onTransactionDispatched(transaction, editorView)
          }

          currentView.update([transaction])

          if (transaction.docChanged) {
            const document = transaction.state.doc
            const value = document.toString()
            props?.onValueChange?.(value)
          }
        },
      })

      onMount(() => setEditorView(currentView))

      onCleanup(() => {
        editorView()?.destroy()
        setEditorView(undefined)
      })
    }),
  )

  createEffect(
    on(
      editorView,
      (editorView) => {
        const localValue = editorView?.state.doc.toString()
        if (localValue !== props?.value && !!editorView) {
          editorView.dispatch({
            changes: {
              from: 0,
              to: localValue?.length,
              insert: props?.value ?? '',
            },
          })
        }
      },
      { defer: true },
    ),
  )

  return {
    editorView,
    ref: setRef,
    createExtension: localCreateCompartmentExtension,
  } as const
}
