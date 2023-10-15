import { JSX, Show, children, createSignal, splitProps } from 'solid-js'
import { ResolvedJSXElement } from 'solid-js/types/reactive/signal'
import { effect } from 'solid-js/web'
import { useBusContext } from '../../../event-bus/context'
import { Listen } from '../../../event-bus/types'
import { useWorkspace } from '../../../workspace/context'
import { ParentComponentWithID } from '../../parent-component-id'
import { SectionDirection } from '../../types'
import { TabOpts, Tabs } from '../tabs'
import { Section, SectionProps } from './section'

type Props = SectionProps & {
  direction?: SectionDirection
  listenToActivation: Listen<number>
  children_ids: string[]
  active: string
  nav: boolean
  readonly: boolean
}

//Lays out its children one item at a time and hides the other with a vertical or horizontal direction
const TabsSection: ParentComponentWithID<Props> = (props) => {
  const [tabs, setTabs] = createSignal<TabOpts[]>([])
  const [active, setActive] = createSignal<string | undefined>(props.active, {
    equals: false,
  })
  const [activeElement, setActiveElement] = createSignal<ResolvedJSXElement>()
  const { removeChildrenById } = useWorkspace()

  // listen to activations
  const [bus] = useBusContext()
  bus().activation.listen((a) => {
    if (a.type === 'tab' && a.section_id !== props.id) {
      return
    }
    setActive(a.component_id)
  })

  const resolved = children(() => props.children)
  effect(() => {
    // const tabs = findById(props.id)!.children!.map((el: TreeNode) => ({
    //   id: el.id,
    //   name: el.props?.name,
    // }));
    const tabs = resolved
      .toArray()
      .filter((e) => e instanceof HTMLElement)
      .map((el: JSX.Element) => ({
        id: (el as HTMLElement).id,
        name: (el as HTMLElement).getAttribute('data-name')!,
      }))
    setTabs(tabs)

    const actives = resolved.toArray().filter((el) => (el as HTMLElement).id === active())

    if (actives.length === 1) {
      setActiveElement(actives[0])
    }
  })

  const [local, other] = splitProps(props, ['nav', 'readonly'])

  return (
    <Section {...other}>
      <Show when={local.nav}>
        <Tabs
          readonly={local.readonly}
          tabs={tabs()}
          active={active()}
          setActive={(value: string | undefined) => {
            // setActive(value);
            bus().activation.emit({
              type: 'tab',
              section_id: other.id,
              component_id: value,
            })
          }}
          addTab={() => bus().new_tab.emit({ section_id: other.id })}
          removeTab={(id: string) => {
            const ts = tabs().find((t) => t.id === id)
            if (ts) {
              removeChildrenById(other.id, ts.id)
            }
          }}
        />
      </Show>
      <Show when={activeElement}>
        <div class="w-full">{activeElement()}</div>
      </Show>
    </Section>
  )
}

export default TabsSection
