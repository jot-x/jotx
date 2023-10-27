import { Component, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { useCommands } from './command/context'
import { CommandsComponentDefinition } from './command/types'
import { Settings } from './settings/types'
import { CommandDialog } from './ui/components/commands-palette/dialog'
import { Input } from './ui/components/commands-palette/input'
import { useSettings } from './settings/context'

function commandProps(cmd: CommandsComponentDefinition, settings: Settings[]) {
  if (!cmd.settings?.length) return {}
  const result: Record<string, any> = {}
  cmd.settings.forEach((item) => {
    const settingKey = item.setting
    const propKey = item.prop

    // Iterate through each object in the settings array
    for (const settingObj of settings) {
      if (settingObj.properties && settingObj.properties[settingKey]) {
        result[propKey] = settingObj.properties[settingKey]?.value || settingObj.properties[settingKey]?.default
        break
      }
    }
  })

  return result
}

export const PrimaryCommandsDialog: Component<{ class: string }> = (props) => {
  const { commands } = useCommands()
  const { settings } = useSettings()

  return (
    <CommandDialog loop keyboard={['Control', 'K']} class={props.class} shouldFilter>
      <Input />
      <For each={commands}>
        {(cmd) => (
          <Dynamic component={cmd.component} commands={cmd.commands} {...commandProps(cmd, settings)}></Dynamic>
        )}
      </For>
    </CommandDialog>
  )
}
