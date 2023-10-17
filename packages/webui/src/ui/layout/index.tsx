import { ComponentRegistry, useWorkspace, RenderTreeList } from '@jotx/coreui'
import { ParentComponent } from 'solid-js'
import '@jotx/coreui/dist/style.css'

interface LayoutProps {
  componentRegistry: ComponentRegistry
}

export const Layout: ParentComponent<LayoutProps> = (props) => {
  const { tree } = useWorkspace()

  return <RenderTreeList node={tree} componentRegistry={{ ...props.componentRegistry }} />
}
