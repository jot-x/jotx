import {
  Command,
  CommandItem,
  CommandsComponentDefinition,
  EDITOR_SECTION_ID,
  createShortcut,
  removeTab,
  useBusContext,
  useWorkspace,
} from '@jotx/coreui'

export const EditorCloseTabCommand: CommandsComponentDefinition = {
  commands: [
    {
      id: 'editor-close-tab',
      name: 'Close current tab',
      keys: ['Control', 'W'],
    },
  ],
  component: (props: { commands: Command[] }) => {
    const [bus] = useBusContext()
    const ws = useWorkspace()

    const closeTab = () => {
      removeTab({ section_id: EDITOR_SECTION_ID, ws, bus })
    }

    createShortcut(props.commands, closeTab, 'editor-close-tab')
    return <CommandItem onSelect={() => closeTab()}>Close Tab</CommandItem>
  },
}
