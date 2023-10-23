import { Component, EDITOR_SECTION_ID, removeTab as _removeTab, useBusContext, useWorkspace } from '@jotx/coreui'
import { createEffect, createUniqueId } from 'solid-js'

export function BlankTabListener() {
  const [bus] = useBusContext()
  const { addTo } = useWorkspace()

  createEffect(() => {
    bus().new_tab.listen(({ section_id }) => {
      if (section_id === EDITOR_SECTION_ID) {
        const id = createUniqueId()
        addTo(section_id, {
          id,
          name: 'BlankTab',
          props: { name: 'New Tab' },
        })
        bus().activation.emit({ type: 'tab', section_id, component_id: id })
      }
    })
  })
  return null
}

export const BlankTab: Component<{ name: string }> = (props) => {
  const [bus] = useBusContext()
  const ws = useWorkspace()
  const createNewFile = () => {
    bus().activation.emit({
      type: 'action',
      action: 'open',
      component_id: 'editor-newfile',
    })
  }

  const removeTab = () => {
    _removeTab({ section_id: EDITOR_SECTION_ID, tab_id: props.id, bus, ws })
  }

  return (
    <ul id={props.id} data-title={props.name}>
      <li>
        <button onClick={createNewFile}>Create a new note</button>
      </li>
      <li>
        <button onClick={removeTab}>Close</button>
      </li>
      <li>Goto file</li>
      <li>Recent files</li>
    </ul>
  )
}
