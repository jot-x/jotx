///<reference path="../node_modules/@types/wicg-file-system-access/index.d.ts" />
import { WafsSettings, makeWebAccessFileSystem, useFilesystem, useParams } from '@jotx/coreui'
import Dexie from 'dexie'
import { Component, Show, batch, createEffect, createResource, createSignal } from 'solid-js'

type HandleRow = {
  handle: FileSystemDirectoryHandle
  path: string
}

export const WebAccessFileSystemRequestAccess: Component = () => {
  const { fs } = useParams()
  if (!fs) {
    throw new Error(`cannot find ${fs} path params`)
  }
  const [_, { defAPI, setAdapter }] = useFilesystem()
  const fsDef = defAPI.get<WafsSettings>(fs)
  const [regrantRequired, setRegrantRequired] = createSignal<boolean>(false)
  const [startfs, setStartfs] = createSignal<boolean>(false)
  const [handler, setHandler] = createSignal<FileSystemDirectoryHandle>()
  var db = new Dexie('jotx-internals')
  db.version(1).stores({
    directory_handlers: '++id, path, handle',
  })

  createResource(startfs, async () => {
    const wafs = await makeWebAccessFileSystem({
      mode: 'readwrite',
      webkitEntry: handler(),
    })

    if (wafs?.async) {
      setAdapter(wafs)
      // const fs = await createFileSystem(wafs);
      // setFilesystem(fs);
    }

    return fs
  })

  const regrant = () => {
    handler()!
      .requestPermission({ mode: 'readwrite' })
      .then((result) => {
        if (result === 'granted') {
          batch(() => {
            setStartfs(true)
            setRegrantRequired(false)
          })
        }
      })
  }

  createEffect(() => {
    const lh = db
      .table<HandleRow>('directory_handlers')
      .where('path')
      .equals(fsDef?.settings?.path || 'jotx_fs1')
      .reverse()
      .sortBy('id')
    lh.then((r) => {
      if (r.length > 0) {
        const h = r[0]?.handle
        setHandler(h)
        h?.queryPermission({ mode: 'readwrite' }).then((result) => {
          // not yet supported, see https://bugs.chromium.org/p/chromium/issues/detail?id=1011533
          // setRegrant("jotx_fs1");
          if (result === 'granted') {
            setStartfs(true)
          } else {
            setRegrantRequired(true)
          }
        })
      }
    })
  })

  const connect = async () => {
    const h = await window.showDirectoryPicker()
    db.table<HandleRow>('directory_handlers').add({ handle: h, path: h.name })
    setHandler(h)
    setStartfs(true)
  }

  if (fsDef?.type !== 'web-access-fs') {
    return null
  }

  return (
    <div>
      <Show when={regrantRequired()}>
        <button onClick={() => regrant()}>Regrant is required</button>
      </Show>
      <Show when={!handler()}>
        <button onClick={() => connect()}>Connect</button>
      </Show>
    </div>
  )
}
