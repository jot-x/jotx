import { Component, For } from 'solid-js'
import { useBusContext } from '../../event-bus/context'

export const Toaster: Component = () => {
  const [bus] = useBusContext()

  bus().notifications.listen(({ event, remove }) => {
    setTimeout(() => {
      remove()
    }, 2500)
  })

  return (
    <div class="fixed top-4 right-4 flex flex-col items-end space-y-4">
      <For each={bus().notifications.value()}>
        {(item) => (
          <div class="p-2 px-3 bg-gray-600 animate-fade-in-down animate-count-1 animate-duration-150">
            <span class="mr-2">{item.text}</span>
            <button onClick={() => bus().notifications.remove(item)}>X</button>
          </div>
        )}
      </For>
    </div>
  )
}
