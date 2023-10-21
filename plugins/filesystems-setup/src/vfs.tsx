import { VFSSettings, makeVirtualFileSystem, useCurrentFileSystemName, useFilesystem } from '@jotx/coreui'
import { Component, createEffect } from 'solid-js'

export const VFSInit: Component = () => {
  const { fs } = useCurrentFileSystemName()
  const [_, { defAPI, setAdapter }] = useFilesystem()
  const def = defAPI.get<VFSSettings>(fs)

  createEffect(() => {
    const vfs = makeVirtualFileSystem(
      {
        personal: {
          'today.md': '# Today \n this is a today note',
          // recipes: {
          //   "pizza.md": "# Pizza \n this is a pizza recipe!",
          // },
        },
        work: {
          'dev.md': '# Dev \n this is a dev note',
          'marketing-foo-bar-baz-qux.md': '# Marketing \n this is a marketing note',
        },
      },
      def?.settings?.storage === 'localstorage' ? localStorage : undefined,
      `jotx-fs-${def?.settings?.key}`,
    )

    setAdapter(vfs)
  })

  return null
}
