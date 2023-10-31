import type { Extension } from '@codemirror/state'
import { EDITOR_SECTION_ID, useWorkspace } from '@jotx/coreui'
import { createContext, createMemo, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { OpenedEditor } from './types'

export const makCodeMirrorContext = (initialExtensions: Extension[], initialLazyExtensions: Promise<Extension>[]) => {
  const [editors, setEditors] = createStore<OpenedEditor[]>([])
  const ws = useWorkspace()
  const editor = createMemo(() => {
    if (!ws) return
    const { findById } = ws
    const active = findById(EDITOR_SECTION_ID)?.props?.['active']
    return editors.find((e) => e.component_id === active)?.view
  })

  return { editor, editors, setEditors }
}

export type CodeMirrorContextType = ReturnType<typeof makCodeMirrorContext>
export const CodeMirrorContext = createContext<CodeMirrorContextType>()
export const useCodeMirror = () => useContext(CodeMirrorContext)!
