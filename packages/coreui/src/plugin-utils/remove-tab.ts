import { EventHub } from '@solid-primitives/event-bus'
import { Accessor } from 'solid-js'
import { HubType } from '../event-bus/context'
import { WorkspaceContextType } from '../workspace/context'

export function removeTab({
  section_id,
  tab_id,
  ws,
  bus,
}: {
  section_id: string
  tab_id?: string | undefined
  ws: WorkspaceContextType
  bus: Accessor<EventHub<HubType>>
}) {
  // TODO THIS IS A BIT HACKY AS WE CAN'T DETERMINE ATM THE CURRENT ACTIVE TAB FROM THE WORKSPACE... SO WE GO TO THE DOM
  tab_id = tab_id || document.getElementById(section_id)?.getAttribute('data-active') || undefined

  if (!tab_id) {
    return
  }

  const tabs = ws.findById(section_id)
  if (!tabs || !tabs.children) {
    return
  }
  const matchIdx = tabs.children.findIndex((t) => t.id === tab_id)

  if (matchIdx > -1) {
    const elid = tabs.children?.[matchIdx]?.id
    if (elid) {
      ws.removeChildrenById(section_id, elid)
      // bus().activation.emit({
      //   type: 'tab',
      //   section_id: section_id,
      //   component_id: matchIdx > 0 ? elid : undefined,
      // })
    }
  }
}
