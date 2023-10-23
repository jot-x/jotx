import { RenderTreeList, useWorkspace } from '@jotx/coreui'
import { ParentComponent } from 'solid-js'
import { BlankTab, BlankTabListener } from '../../blanktab'

interface LayoutProps {}

export const Layout: ParentComponent<LayoutProps> = () => {
  const { tree, components, addComponent } = useWorkspace()

  // core components
  addComponent('BlankTabListener', BlankTabListener)
  addComponent('BlankTab', BlankTab)

  return <RenderTreeList node={tree} componentRegistry={{ ...components }} />
}
