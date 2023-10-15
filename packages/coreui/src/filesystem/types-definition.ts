export type FileSystemType = 'vfs' | 'web-node-fs' | 'web-access-fs'

export interface FileSystemDefinition<S> {
  name: string
  title?: string
  type?: FileSystemType
  settings?: S
}

export type VFSSettings = {
  key: string
  storage: 'localstorage'
}

export type WafsSettings = {
  path: string
}

export interface FileSystemDefinitionAPI {
  create<S>(def: FileSystemDefinition<S>): void
  get<S>(name: string): FileSystemDefinition<S> | undefined
  list(): FileSystemDefinition<unknown>[]
  // drop(name: string): void;
}

export const makeStorageFileSystemDefinitionAPI = (
  initial?: FileSystemDefinition<unknown>[],
  storage?: Storage,
  key = 'jotx-filesystem-definitions',
): FileSystemDefinitionAPI => {
  let storedValue
  const storageValue = storage?.getItem(key)
  try {
    storedValue = JSON.parse(typeof storageValue === 'string' ? storageValue : 'null')
  } catch (e) {
    console.error(e)
  }

  let st: FileSystemDefinition<unknown>[] = storedValue || initial || []
  if ((storageValue as unknown) instanceof Promise) {
    ;(storageValue as unknown as Promise<string>).then((storedValue) => {
      st = Object.assign(storedValue || {}, st)
    })
  }
  const save = () => storage?.setItem(key, JSON.stringify(st))
  save()

  const api = {
    get: <S>(name: string): FileSystemDefinition<S> | undefined => {
      const r = st.filter((f) => f.name === name)
      if (r.length === 1) {
        return r[0] as FileSystemDefinition<S>
      }
    },
    create: <S>(def: FileSystemDefinition<S>): void => {
      if (st.filter((f) => f.name === def.name).length > 0) {
        throw new Error(`"${def.name}" already exists`)
      }

      st.push(def)
      save()
    },
    list: (): FileSystemDefinition<unknown>[] => {
      return st
    },
  }

  return api
}
