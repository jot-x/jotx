import { For, Show, batch, createSignal, type ParentComponent } from 'solid-js'

export const TabNavItem: ParentComponent<{
  active?: boolean
  class?: string
}> = (props) => {
  return (
    <li
      class={`border-brand-default text-darkgray relative inline-flex items-center overflow-hidden border-b-2 bg-slate-500 bg-opacity-0 font-sans text-sm leading-snug transition hover:bg-opacity-5 dark:border-gray-200 ${
        props.class || ''
      }`}
      classList={{
        'border-opacity-90 dark:border-opacity-90 hover:border-opacity-100': props.active || false,
        'border-opacity-0 dark:border-opacity-0 hover:border-opacity-10 dark:hover:border-opacity-10': !props.active,
      }}
    >
      {props.active}
      {props.children}
    </li>
  )
}

/**
 *
 * @returns
 */
export const TabNavList: ParentComponent<{ class?: string }> = (props) => {
  return <ul class={`flex flex-wrap items-center ${props.class || ''}`}>{props.children}</ul>
}

export interface TabOpts {
  id: string
  name: string
}
interface TabsProps {
  active?: string
  tabs: TabOpts[]
  setActive: (tab: string | undefined) => void
  readonly: boolean
  addTab: () => void
  removeTab: (name: string) => void
}

/**
 * Controlled tabs component
 */
export const Tabs: ParentComponent<TabsProps> = (props) => {
  const tabRefs = new Map<number, HTMLSpanElement>()

  function setActiveTab(active: string) {
    const idx = props.tabs.findIndex((tab) => tab.id === active)
    if (idx < 0) return
    props.setActive(active)
  }

  function setActiveName(newName: string) {
    props.tabs.find((tab) => tab.id === props.active)!.id = newName
    batch(() => {
      // props.setTabs([...tabs]);
      props.setActive(newName)
    })
  }

  // function addTab() {
  //   const newTab = {
  //     name: `tab${props.tabs.length}`,
  //   };
  //   batch(() => {
  //     props.setTabs(props.tabs.concat(newTab));
  //     props.setActive(newTab.name);
  //   });
  // }

  function removeTab(name: string) {
    const tabs = props.tabs
    const idx = tabs.findIndex((tab) => tab.id === name)
    const tab = tabs[idx]

    if (!tab) return

    // const confirmDeletion = confirm(
    //   `Are you sure you want to delete ${tab.name}?`
    // );
    // if (!confirmDeletion) return;

    props.removeTab(name)

    // props.setTabs([...tabs.slice(0, idx), ...tabs.slice(idx + 1)]);
    // We want to redirect to another tab if we are deleting the current one
    if (tabs.length > 1 && props.active === tab.id) {
      props.setActive(tabs[idx - 1]?.id)
    } else {
      props.setActive(undefined)
    }
  }

  const [edit, setEdit] = createSignal(-1)

  return (
    <TabNavList>
      <For each={props.tabs}>
        {(tab, index) => (
          <TabNavItem active={props.active === tab.name} class="mr-2">
            <div
              ref={(el) => tabRefs.set(index(), el)}
              contentEditable={edit() == index()}
              onBlur={(e) => {
                if (edit() !== index()) return
                setEdit(-1)
                setActiveName(e.currentTarget.textContent!)
              }}
              onblur={(e) => {
                if (edit() !== index()) return
                setEdit(-1)
                setActiveName(e.currentTarget.textContent!)
              }}
              onKeyDown={(e) => {
                if (e.code === 'Space') e.preventDefault()
                if (e.code !== 'Enter') return
                if (edit() === index()) {
                  setEdit(-1)
                  setActiveName(e.currentTarget.textContent!)
                  e.currentTarget.blur()
                } else {
                  setActiveTab(tab.id)
                }
              }}
              onClick={() => setActiveTab(tab.id)}
              onDblClick={(e) => {
                e.preventDefault()
                setEdit(index())
                tabRefs.get(index())?.focus()
              }}
              title={tab.name}
              role="button"
              tabindex="0"
            >
              {tab.name}
            </div>
            <Show when={!props.readonly && index() > -1}>
              <button
                type="button"
                class="cursor-pointer"
                onClick={() => {
                  removeTab(tab.id)
                }}
              >
                <span class="sr-only">Delete this tab</span>
                <svg style="stroke: currentColor; fill: none;" class="h-4 opacity-60" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Show>
          </TabNavItem>
        )}
      </For>
      <Show when={!props.readonly}>
        <li class="m-0 inline-flex items-center border-b-2 border-transparent">
          <button type="button" onClick={props.addTab} title="Add a new tab">
            <span class="sr-only">Add a new tab</span>
            <svg
              viewBox="0 0 24 24"
              style="stroke: currentColor; fill: none;"
              class="text-brand-default h-5 dark:text-slate-50"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </li>
      </Show>
    </TabNavList>
  )
}
