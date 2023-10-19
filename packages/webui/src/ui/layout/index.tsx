import { RenderTreeList, useWorkspace } from '@jotx/coreui'
import { ParentComponent } from 'solid-js'

interface LayoutProps {}

export const Layout: ParentComponent<LayoutProps> = () => {
  const { tree, components } = useWorkspace()

  return <RenderTreeList node={tree} componentRegistry={{ ...components }} />
}
