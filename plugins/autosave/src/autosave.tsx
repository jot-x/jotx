import { Icon, debounce, useBusContext, useFilesystem } from '@jotx/coreui'
import { Show, createEffect, createSignal } from 'solid-js'

export function AutoSave(props: { id: string }) {
  const [bus] = useBusContext()
  const [fs] = useFilesystem()
  const [writing, setWriting] = createSignal(false)

  const triggerWriteFile = debounce((path: string, value: string) => {
    fs()?.writeFile(path, value)
    setWriting(false)
  }, 500)

  bus().content_change.listen(({ path, value }) => {
    setWriting(true)
    triggerWriteFile(path, value)
  })

  return (
    <span>
      <Show when={writing()}>
        <Icon icon={'ion:save-outline'} />
      </Show>
    </span>
  )
}
