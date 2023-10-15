import { ParentComponent } from 'solid-js'
import { Activation, BusContext, HubType, makeEventbusContext } from '../event-bus/context'
import { createEventBus, createEventHub, createEventStack } from '../event-bus/factories'
import { SettingsContext, makeSettingsContext } from '../settings/context'
import { Settings } from '../settings/types'
import { WorkspaceContext, makeWorkspaceContext } from '../workspace/context'
import { TreeNode } from '../workspace/types'
import { FileSystemContext, makeFilesystemContext } from '../filesystem/context'

type Props = {
  initialSettings: Settings[]
  initialTree: TreeNode
}

export const CoreProviders: ParentComponent<Props> = (props) => {
  const hub = createEventHub<HubType>({
    activation: createEventBus<Activation>(),
    new_tab: createEventBus<{ section_id: string }>(),
    content_change: createEventBus<{
      component_id: string
      path: string
      value: string
    }>(),
    content_open: createEventBus<{
      component_id: string
      path: string
      value: string
    }>(),
    notifications: createEventStack<
      string,
      {
        text: string
      }
    >({
      toValue: (e) => {
        const text = e.length > 50 ? e.substring(0, 50) + '...' : e
        return { text }
      },
      length: 10,
    }),
  })

  return (
    <SettingsContext.Provider value={makeSettingsContext(props.initialSettings)}>
      <WorkspaceContext.Provider value={makeWorkspaceContext(props.initialTree)}>
        <BusContext.Provider value={makeEventbusContext(hub)}>
          <FileSystemContext.Provider value={makeFilesystemContext()}>{props.children}</FileSystemContext.Provider>
        </BusContext.Provider>
      </WorkspaceContext.Provider>
    </SettingsContext.Provider>
  )
}
