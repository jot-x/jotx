import {
  Card,
  Component,
  Dialog,
  FileSystemDefinition,
  FileSystemType,
  Icon,
  cn,
  useBusContext,
  useFilesystem,
  useNavigate,
} from '@jotx/coreui'
import { For, ParentComponent, Show, createMemo, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { VFSSetup } from './setup/vfs'
import { WAFSSetup } from './setup/waf'
import { Type } from './types'

const types: Type[] = [
  {
    type: 'web-access-fs',
    title: 'Local Folder',
    icon: 'fa6-solid:laptop-code',
    component: WAFSSetup,
  },
  {
    type: 'vfs',
    title: 'VFS',
    icon: 'fa6-solid:laptop-code',
    component: VFSSetup,
  },
]

export const FileSystems: Component = () => {
  return (
    <FileSystemsDialog>
      <FileSystemsSetup />
    </FileSystemsDialog>
  )
}

const FS: Component<{ fs: FileSystemDefinition<unknown> }> = (props) => {
  const nav = useNavigate()
  const [bus] = useBusContext()

  return (
    <div>
      <button
        onClick={() => {
          nav(`/${props.fs.name}`)
          bus().activation.emit({ type: 'action', component_id: 'FileSystemsModal', action: 'close' })
        }}
      >
        {props.fs.name} - {props.fs.type}
      </button>
    </div>
  )
}

const FileSystemsSetup: Component<{ hideNotebooks?: boolean }> = (props) => {
  const [selected, setSelected] = createSignal<FileSystemType | undefined>()
  const [_, { defAPI }] = useFilesystem()

  const fs = createMemo(() => {
    const f = types.filter((f) => f.type === selected())
    return f.length === 1 ? f[0] : undefined
  })

  return (
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-0 p-0 border">
      <div class="p-4 col-span-2 border-r border-r-border">
        <Card.Card class="border-none">
          <Card.Header>
            <Card.Title>Notifications</Card.Title>
          </Card.Header>
          <Card.Content class="grid gap-4">
            <div class="grid gap-y-3">
              <For each={defAPI.list()}>{(fs) => <FS fs={fs} />}</For>
            </div>
          </Card.Content>
        </Card.Card>
      </div>
      <div class={cn(props.hideNotebooks ? 'col-span-6' : 'col-span-4')}>
        <div class="p-6">
          <Show when={!selected()}>
            <ul class="my-4 space-y-3">
              <For each={types}>
                {(t) => (
                  <div>
                    <li>
                      <div class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg group hover:shadow">
                        <Icon icon={t.icon} width="1.5rem" height="1.5rem" />
                        <div class="flex-1">
                          <span class="ml-3 whitespace-nowrap">{t.title}</span>
                        </div>
                        <button onClick={() => setSelected(t.type)}>Setup</button>
                      </div>
                    </li>
                  </div>
                )}
              </For>
            </ul>
          </Show>
          <Show when={selected()}>
            <div>
              <button
                onClick={() => setSelected(undefined)}
                class="text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                <Icon icon="heroicons:arrow-small-left-20-solid" width="1.25rem" height="1.25rem" />
                Back
              </button>
              <Dynamic component={fs()?.component} />
            </div>
          </Show>
        </div>
      </div>
    </div>
  )
}

const FileSystemsDialog: ParentComponent = (props) => {
  return (
    <Dialog.Root>
      <Dialog.Content class="sm:min-w-4xl">
        <Dialog.Header></Dialog.Header>
        {props.children}
        <Dialog.Footer></Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
