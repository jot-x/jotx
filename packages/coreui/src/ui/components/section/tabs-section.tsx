import { JSX, Show, children, createSignal, splitProps } from 'solid-js'
import { ResolvedJSXElement } from 'solid-js/types/reactive/signal'
import { effect } from 'solid-js/web'
import { useBusContext } from '../../../event-bus/context'
import { useWorkspace } from '../../../workspace/context'
import { ParentComponent } from '../../types'
import { TabOpts, Tabs } from '../tabs'
import { Section, SectionProps } from './section'

type Props = SectionProps & {
  active: string
  nav: boolean
  readonly: boolean
}

//Lays out its children one item at a time and hides the other with a vertical or horizontal direction
const TabsSection: ParentComponent<Props> = (props) => {
  const [tabs, setTabs] = createSignal<TabOpts[]>([])
  const [active, setActive] = createSignal<string | undefined>(props.active, {
    equals: false,
  })
  const [activeElement, setActiveElement] = createSignal<ResolvedJSXElement>()
  const { removeChildrenById, updateNodeById } = useWorkspace()

  // listen to activations
  const [bus] = useBusContext()

  const activate = ({ section_id, component_id }: { section_id: string; component_id: string | undefined }) => {
    setActive(component_id)
    // TODO this is a hack specifically for undo/redo which comes not from a user UI action, without this the active element is not set into the DOM before the update occurs
    setTimeout(() =>
      updateNodeById(section_id, {
        props: {
          active: component_id,
        },
      }),
    )
  }

  bus().activation.listen((a) => {
    if (a.type === 'tab') {
      if (a.section_id !== props.id) {
        return
      } else {
        activate({ section_id: a.section_id, component_id: a.component_id })
      }
    }
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
        key: (el as HTMLElement).getAttribute('data-key')!,
        title: (el as HTMLElement).getAttribute('data-title')!,
      }))
    setTabs(tabs)

    const actives = resolved.toArray().filter((el) => (el as HTMLElement).id === active())

    if (actives.length === 1) {
      setActiveElement(actives[0])
    } else {
      setActiveElement(undefined)
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
      <Show when={activeElement()}>
        <div class="w-full">{activeElement()}</div>
      </Show>
    </Section>
  )
}

export default TabsSection
