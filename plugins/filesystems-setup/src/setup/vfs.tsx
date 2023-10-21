import {
  FileSystemDefinition,
  Input,
  Label,
  VFSSettings,
  ValidationMessage,
  createForm,
  reporter,
  useBusContext,
  useFilesystem,
  useNavigate,
} from '@jotx/coreui'
import { Index } from 'solid-js'

type Data = {
  name: string
}

export const VFSSetup = () => {
  const { form } = createForm<Data>({
    onSubmit: async (values) => {
      const d: FileSystemDefinition<VFSSettings> = {
        type: 'vfs',
        name: values.name,
        settings: {
          key: values.name,
          storage: 'localstorage',
        },
      }
      defAPI.create(d)
      nav(`/${d.name}`)
      bus().activation.emit({ type: 'action', action: 'close', component_id: 'FileSystemsModal' })
      bus().notifications.emit('Filesystem created, lets jot some down!')
    },
    onError(err, context) {
      context.setErrors({ name: (err as Error).message })
    },
    validate(values) {
      const errors: { name: string[] } = {
        name: [],
      }
      if (!/[a-z0-9_]{2,12}/.test(values.name)) errors.name.push('only alpha numeric allowed')
      return errors
    },
    extend: [reporter],
  })

  const nav = useNavigate()
  const [bus] = useBusContext()
  const [_, { defAPI }] = useFilesystem()

  return (
    <div class="my-8">
      <div class="flex flex-col w-full max-w-sm gap-1.5 p-8">
        <form use:form>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Name
            </Label>
            <Input id="name" name="name" placeholder="personal" class="col-span-3" autofocus />
            <ValidationMessage for="name" as="ul" aria-live="polite" class="col-span-3 col-start-2 text-xs text-error">
              {(messages) => <Index each={messages ?? []}>{(message) => <li>{message()}</li>}</Index>}
            </ValidationMessage>
            <p class="text-sm text-muted-foreground col-span-3 col-start-2">Your notebook name</p>
          </div>
        </form>
      </div>

      <div class="flex float-right">
        <button class="content-end" type="submit">
          Create
        </button>
      </div>
    </div>
  )
}
