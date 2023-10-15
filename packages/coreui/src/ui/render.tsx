import { Component, For, createMemo } from 'solid-js'
import { TreeNode } from '../workspace/types'
import { ComponentRegistry } from './types'
import { useSettings } from '../settings/context'
import { InjectID } from './inject-id'
import { Dynamic } from 'solid-js/web'
import { resolveProps } from './utils/props'
import SplitSection from './components/section/split-section'
import TabsSection from './components/section/tabs-section'

const baseRegistry: ComponentRegistry = {
  Split: SplitSection,
  Tabs: TabsSection,
}

export const RenderTreeList: Component<{
  node: TreeNode
  componentRegistry: ComponentRegistry
}> = (props) => {
  const { getSetting } = useSettings()

  const componentRegistry = { ...props.componentRegistry, ...baseRegistry }

  return (
    <InjectID id={props.node.id}>
      <Dynamic
        component={componentRegistry[props.node.name]}
        {...resolveProps(props.node, getSetting)}
        id={props.node.id}
      >
        {props.node.children && props.node.children.length > 0 && (
          <For each={props.node.children}>
            {(node) => {
              return <RenderTreeList node={node} componentRegistry={componentRegistry} />
            }}
          </For>
        )}
      </Dynamic>
    </InjectID>
  )
}
