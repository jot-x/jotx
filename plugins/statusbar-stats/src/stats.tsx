import { debounce, useBusContext, useEditorActiveContent, useFilesystem, useWorkspace } from '@jotx/coreui'
import { createEffect, createSignal } from 'solid-js'

// matches a sequence of two or more non-whitespace characters as a word
const wordPattern = /\S{2,}/g
const whitespacePattern = /\s/g

export function SidebarStats() {
  const [words, setWords] = createSignal(0)
  const [chars, setChars] = createSignal(0)
  const [bus] = useBusContext()

  bus().content_change.listen(({ value }) => {
    trigger(value)
  })

  const trigger = debounce((value: string | undefined) => {
    if (value === undefined) {
      setWords(0)
      setChars(0)
      return
    }
    setWords(value.match(wordPattern)?.length || 0)
    setChars(value.replace(whitespacePattern, '').length)
  }, 150)

  createEffect(() => {
    const result = useEditorActiveContent()
    trigger(result?.content)
  })

  return (
    <div>
      <span>{words()} words</span>{' '}
      <span>
        {chars()} char{chars() > 0 && 's'}
      </span>
    </div>
  )
}
