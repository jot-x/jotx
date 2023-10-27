import { ParentComponent } from 'solid-js'
import { CommandsContext, makeCommandsContext } from './command/context'
import { CommandsComponentDefinition } from './command/types'
import { BusContext, HubType, makeEventbusContext } from './event-bus/context'
import { createEventBus, createEventHub, createEventStack } from './event-bus/factories'
import { Activation, ContentEvent } from './event-bus/types'
import { FileSystemContext, makeFilesystemContext } from './filesystem/context'
import { PluginsContext, makePluginsContext } from './plugin/context'
import { PluginRegistration } from './plugin/types'
import { RoutingContext, makeRoutingContext } from './routing/context'
import { IRoute } from './routing/types'
import { SettingsContext, makeSettingsContext } from './settings/context'
import { Settings } from './settings/types'
import { Toaster } from './ui/components/toaster'
import { ComponentRegistry } from './ui/types'
import { WorkspaceContext, makeWorkspaceContext } from './workspace/context'
import { TreeNode } from './workspace/types'

export type ProvidersProps = {
  initialSettings: Settings[]
  initialTree: TreeNode
  initialComponents: ComponentRegistry
  initialPlugins?: string[]
  initialRoutes: IRoute[]
  initialCommands?: CommandsComponentDefinition[]
  registerPlugin: (id: string) => Promise<PluginRegistration>
}

export const CoreProviders: ParentComponent<ProvidersProps> = (props) => {
  const hub = createEventHub<HubType>({
    activation: createEventBus<Activation>(),
    new_tab: createEventBus<{ section_id: string }>(),
    content_change: createEventBus<ContentEvent>(),
    content_open: createEventBus<ContentEvent>(),
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
    <RoutingContext.Provider value={makeRoutingContext(props.initialRoutes)}>
      <SettingsContext.Provider value={makeSettingsContext(props.initialSettings)}>
        <WorkspaceContext.Provider value={makeWorkspaceContext(props.initialTree, props.initialComponents)}>
          <BusContext.Provider value={makeEventbusContext(hub)}>
            <FileSystemContext.Provider value={makeFilesystemContext()}>
              <CommandsContext.Provider value={makeCommandsContext(props.initialCommands || [])}>
                <PluginsContext.Provider value={makePluginsContext(props.initialPlugins || [], props.registerPlugin)}>
                  <Toaster />
                  {props.children}
                </PluginsContext.Provider>
              </CommandsContext.Provider>
            </FileSystemContext.Provider>
          </BusContext.Provider>
        </WorkspaceContext.Provider>
      </SettingsContext.Provider>
    </RoutingContext.Provider>
  )
}
