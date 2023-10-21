import { EDITOR_SECTION_ID, debounce, useBusContext, useFilesystem, useWorkspace } from '@jotx/coreui'
import { createEffect, createSignal, on } from 'solid-js'

// matches a sequence of two or more non-whitespace characters as a word
const wordPattern = /\S{2,}/g
const whitespacePattern = /\s/g

export function SidebarStats() {
  const [words, setWords] = createSignal(0)
  const [chars, setChars] = createSignal(0)
  const [bus] = useBusContext()
  const { findById } = useWorkspace()
  const [fs] = useFilesystem()

  const trigger = debounce((value: string | undefined) => {
    if (value === undefined) {
      setWords(0)
      setChars(0)
      return
    }
    setWords(value.match(wordPattern)?.length || 0)
    setChars(value.replace(whitespacePattern, '').length)
  }, 150)

  const editorActiveFileName = () => {
    const active = findById('editor')?.props?.['active']
    return document.getElementById(active)?.getAttribute('data-name')
  }

  createEffect(() => {
    const path = editorActiveFileName()
    if (path) {
      const value = fs()?.readFile(path)
      trigger(value)
    } else {
      trigger(undefined)
    }
  })

  // bus().activation.listen((activation) => {
  //   if (activation.type === 'tab' && activation.section_id === EDITOR_SECTION_ID) {
  //     if (!activation.component_id) {
  //       bus().content.emit({ type: 'close', component_id: activation.component_id! })
  //     } else {
  //       const path = document.getElementById(activation.component_id!)?.getAttribute('data-name')
  //       if (path) {
  //         const value = fs()?.readFile(path)
  //         if (value) bus().content.emit({ type: 'open', component_id: activation.component_id!, value, path })
  //       }
  //     }
  //   }
  // })

  return (
    <div>
      <span>{words()} words</span>{' '}
      <span>
        {chars()} char{chars() > 0 && 's'}
      </span>
    </div>
  )
}
