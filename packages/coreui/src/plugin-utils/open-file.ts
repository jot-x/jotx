import { EventHub } from '@solid-primitives/event-bus'
import { Accessor } from 'solid-js'
import { HubType } from '../event-bus/context'
import { AsyncFileSystem, SyncFileSystem } from '../filesystem'
import { WorkspaceContextType } from '../workspace/context'
import { open } from './open'

type OpenFileProps = {
  path: string
  bus: Accessor<EventHub<HubType>>
  filesystem: Accessor<SyncFileSystem | AsyncFileSystem | undefined>
  ws: WorkspaceContextType
  section_id?: string
  component?: string
}

export function openFile({ path, ws, bus, filesystem, section_id, component }: OpenFileProps) {
  const content = filesystem()!.readFile(path)
  if (content === undefined) {
    console.warn('file does not exist')
    return
  }

  const ext = path.substring(path.lastIndexOf('.') + 1)

  open({
    key: path,
    ws,
    bus,
    section_id,
    component,
    rewrite: false,
    props: { title: path, content },
  })
}
