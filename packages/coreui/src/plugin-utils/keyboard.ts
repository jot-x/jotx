import { createShortcut as _createShortcut } from '@solid-primitives/keyboard'
import { Command } from '../ui/components/commands-palette/types'

export const createShortcut = (
  commands: Command[] | undefined,
  callback: (event: KeyboardEvent | null) => void,
  id?: string,
) => {
  let keys: string[] | undefined
  if (!commands) return
  if (id) {
    const cmd = commands.filter((c) => c.id === id)
    if (cmd.length && cmd?.[0]?.keys) keys = cmd[0].keys
  }

  if (!keys) {
    const cmds = commands.filter((c) => c.keys)
    if (cmds.length && cmds?.[0]?.keys) {
      keys = cmds[0].keys
    }
  }

  if (keys) {
    _createShortcut(keys, callback)
  }
}
