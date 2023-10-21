import { Component, VFSSettings, useCurrentFileSystemName, useFilesystem } from '@jotx/coreui'
import { Match, Switch } from 'solid-js'
import { VFSInit } from './vfs'
import { WebAccessFileSystemRequestAccess } from './wafs'

export const InitFileSystem: Component = () => {
  const { fs } = useCurrentFileSystemName()
  const [_, { defAPI }] = useFilesystem()
  const def = defAPI.get<VFSSettings>(fs)

  return (
    <Switch>
      <Match when={def?.type === 'vfs'}>
        <VFSInit />
      </Match>
      <Match when={def?.type === 'web-access-fs'}>
        <WebAccessFileSystemRequestAccess />
      </Match>
    </Switch>
  )
}
