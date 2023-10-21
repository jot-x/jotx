import {
  AsyncFileSystem,
  Component,
  SyncFileSystem,
  useBusContext,
  useFilesystem,
  useWorkspace,
  openFile,
  getFileSystemItemName,
} from '@jotx/coreui'
import { For, Setter, Show, createEffect, createMemo, createSignal } from 'solid-js'

export const FileExplorer: Component = () => {
  const [filesystem] = useFilesystem()
  const ws = useWorkspace()
  const [bus] = useBusContext()
  const [file, setFile] = createSignal<{ path: string; content: string }>()

  if (!ws.findById('explorer')?.props?.['active']) {
    bus().activation.emit({ type: 'tab', section_id: 'explorer', component_id: 'file-explorer' })
  }

  createEffect(() => {
    const p = file()?.path
    if (p) {
      openFile({ path: p, bus: bus, filesystem, ws })
      setFile(undefined)
    }
  })

  return (
    <div id="file-explorer" class="flex flex-col p-4">
      <Show when={filesystem()}>
        <FsDir fs={filesystem()!} path="/" setFile={setFile} />
      </Show>
    </div>
  )
}

const FsDir = (props: {
  fs: SyncFileSystem | AsyncFileSystem
  path: string
  setFile: Setter<{ path: string; content: string } | undefined>
}) => {
  // const [open, setOpen] = createSignal(props.path === '/')
  const [open, setOpen] = createSignal(true)
  // const [name, setName] = createSignal('')
  const list = () => open() && props.fs.readdir(props.path)
  return (
    <>
      <Show when={props.path !== '/'}>
        <button onClick={() => setOpen(!open())}>{open() ? '-' : '+'}</button>{' '}
        {getFileSystemItemName(props.path) || '/'}{' '}
      </Show>
      <Show when={list() !== undefined}>
        <ul>
          <For each={list()!}>
            {(item) => (
              <li>
                <Show
                  when={props.fs.getType(item) === 'dir'}
                  fallback={
                    <FsFile
                      fs={props.fs}
                      path={`${props.path === '/' ? '' : props.path}/${item}`}
                      setFile={props.setFile}
                    />
                  }
                >
                  <FsDir fs={props.fs} path={item} setFile={props.setFile} />
                </Show>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  )
}

const FsFile = (props: {
  fs: SyncFileSystem | AsyncFileSystem
  path: string
  setFile: Setter<{ path: string; content: string } | undefined>
}) => {
  const [open] = createSignal(true)
  const content = createMemo((prev) => (prev || open() ? props.fs.readFile(props.path) : undefined))

  return (
    <div class="pl-3">
      <button onClick={() => props.setFile({ path: props.path, content: content()! })}>
        {getFileSystemItemName(props.path)}
      </button>
    </div>
  )
}
