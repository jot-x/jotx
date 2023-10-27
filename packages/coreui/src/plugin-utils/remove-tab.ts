import { EventHub } from '@solid-primitives/event-bus'
import { Accessor } from 'solid-js'
import { HubType } from '../event-bus/context'
import { WorkspaceContextType } from '../workspace/context'
import { unwrap } from 'solid-js/store'

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
  // tab_id = tab_id || document.getElementById(section_id)?.getAttribute('data-active') || undefined
  tab_id = ws.findById(section_id)?.props?.['active']

  if (!tab_id) {
    return
  }

  const tabs = ws.findById(section_id)
  if (!tabs || !tabs.children) {
    return
  }

  const matchIdx = tabs.children.findIndex((t) => t.id === tab_id)
  let nextComp: string | undefined

  if (matchIdx > 0) {
    nextComp = tabs.children[matchIdx - 1]?.id!
  } else {
    const otherTabs = tabs.children.filter((t) => t.id !== tab_id)
    if (otherTabs.length > 0) {
      nextComp = otherTabs[0]?.id!
    }
  }

  ws.removeChildrenById(section_id, tab_id)
  bus().activation.emit({
    type: 'tab',
    section_id: section_id,
    component_id: nextComp,
  })
}
