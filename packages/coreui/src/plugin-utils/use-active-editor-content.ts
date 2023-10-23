import { EDITOR_SECTION_ID } from '../constants'
import { useFilesystem } from '../filesystem/context'
import { useWorkspace } from '../workspace/context'

export const useEditorActiveContent = (): { content: string | undefined; path: string } | undefined => {
  const { findById } = useWorkspace()
  const [fs] = useFilesystem()
  const active = findById(EDITOR_SECTION_ID)?.props?.['active']
  const path = document.getElementById(active)?.getAttribute('data-key')
  if (path) {
    return { content: fs()?.readFile(path), path }
  }
}
