import { EventHub } from '@solid-primitives/event-bus'
import { Accessor, createUniqueId } from 'solid-js'
import { HubType } from '../event-bus/context'
import { AnyProps } from '../ui/types'
import { WorkspaceContextType } from '../workspace/context'
import { EDITOR_MARKDOWN_COMPONENT_NAME, EDITOR_SECTION_ID } from '../constants'

type OpenProps = {
  bus: Accessor<EventHub<HubType>>
  ws: WorkspaceContextType
  props: AnyProps
  section_id?: string
  component?: string
  rewrite?: boolean
  key?: string
}

/** Opens a tab or focus on existing one **/
export function open({
  key,
  props,
  ws,
  bus,
  section_id = EDITOR_SECTION_ID,
  component = EDITOR_MARKDOWN_COMPONENT_NAME,
  rewrite = false,
}: OpenProps) {
  const { findById, addTo } = ws
  const section = findById(section_id)
  if (!section) {
    console.warn(`Could not find section ${section_id}`)
    return
  }

  const match = section.children?.filter((t) => t.props?.['key'] === key)
  let id: string

  if (match && match.length > 0) {
    id = match[0]!.id
    bus().activation.emit({
      type: 'tab',
      section_id: section_id,
      component_id: id,
    })
  } else {
    if (rewrite) {
      // TODO not yet supported, find active tab and change its content
      // we can only do that for the same file type
      return
    }

    id = createUniqueId()
    addTo(section_id, {
      id,
      name: component,
      props: { ...props, key },
    })

    bus().content_open.emit({ type: 'open', section_id, component_id: id, key: key!, value: props.content })

    // TODO this is a workaround that is required ONLY if we invoke this from a shortcut, god knows why
    setTimeout(() => {
      bus().activation.emit({
        type: 'tab',
        section_id: section_id,
        component_id: id,
      })
    })
  }

  // if (content && key)
  //   bus().content.emit({
  //     type: 'open',
  //     component_id: id,
  //     path: key,
  //     value: props['content'],
  //   })
}
