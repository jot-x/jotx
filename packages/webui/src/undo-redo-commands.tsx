import {
  Command,
  CommandItem,
  CommandsComponentDefinition,
  EDITOR_SECTION_ID,
  createShortcut,
  openFile,
  useBusContext,
  useFilesystem,
  useWorkspace,
} from '@jotx/coreui'
import { ContentEvent } from '@jotx/coreui/src/event-bus/types'
import { createUndoHistory } from '@solid-primitives/history'
import { createSignal } from 'solid-js'

export const UndoRedoCommands: CommandsComponentDefinition = {
  commands: [
    {
      id: 'undo',
      name: 'Undo',
      keys: ['Control', '['],
    },
    {
      id: 'redo',
      name: 'Redo',
      keys: ['Control', ']'],
    },
  ],
  component: (props: { commands: Command[] }) => {
    const [event, setEvent] = createSignal<ContentEvent>()
    const history = createUndoHistory(() => {
      // track the changes of the state
      const e = event()
      if (e)
        // return a callback to set the state back to the tracked value
        return () => setEvent(e)
    }, {})
    const [bus] = useBusContext()
    const ws = useWorkspace()
    const [filesystem] = useFilesystem()

    bus().content_open.listen((c) => {
      if (c.section_id === EDITOR_SECTION_ID) {
        setEvent(c)
      }
    })

    const undo = () => {
      if (history.canUndo()) {
        history.undo()
        const e = event()
        openFile({ path: e?.key!, section_id: e?.section_id, bus, ws, filesystem })
      }
    }

    const redo = () => {
      if (history.canRedo()) {
        history.redo()
        const e = event()
        openFile({ path: e?.key!, section_id: e?.section_id, bus, ws, filesystem })
      }
    }

    createShortcut(props.commands, undo, 'undo')
    createShortcut(props.commands, redo, 'redo')

    return (
      <>
        <CommandItem disabled={!event() || !history.canRedo()} onSelect={() => redo()}>
          Redo
        </CommandItem>
        <CommandItem disabled={!event() || !history.canUndo()} onSelect={() => undo()}>
          Undo
        </CommandItem>
      </>
    )
  },
}
