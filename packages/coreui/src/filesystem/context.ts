import { batch, createContext, createSignal, useContext } from 'solid-js'
import { AsyncFileSystem, AsyncFileSystemAdapter, SyncFileSystem, SyncFileSystemAdapter, createFileSystem } from './'
import { makeStorageFileSystemDefinitionAPI } from './types-definition'

export const makeFilesystemContext = () => {
  const defAPI = makeStorageFileSystemDefinitionAPI([], localStorage)
  const [_, _setAdapter] = createSignal<AsyncFileSystemAdapter | SyncFileSystemAdapter>()
  const [filesystem, setFilesystem] = createSignal<SyncFileSystem | AsyncFileSystem>()

  const setAdapter = (adapter: AsyncFileSystemAdapter | SyncFileSystemAdapter) => {
    batch(() => {
      _setAdapter(adapter)
      setFilesystem(adapter.async ? createFileSystem(adapter) : createFileSystem(adapter))
    })
  }

  // `as const` forces tuple type inference
  return [filesystem, { setAdapter, defAPI }] as const
}

type FileSystemContextType = ReturnType<typeof makeFilesystemContext>
export const FileSystemContext = createContext<FileSystemContextType>()
export const useFilesystem = () => useContext(FileSystemContext)!
