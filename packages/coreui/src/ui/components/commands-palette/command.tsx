import {
  Accessor,
  JSX,
  ParentComponent,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  splitProps,
} from 'solid-js'
import { VALUE_ATTR } from './constants'
import { CommandContext, Ctx } from './context'
import { commandScore } from './score'
import { State, Store, StoreContext } from './state-context'
import { GROUP_SELECTOR, ITEM_SELECTOR, VALID_ITEM_SELECTOR } from './styles'

const SELECT_EVENT = `cmd-item-select`
const GROUP_ITEMS_SELECTOR = `[cmd-group-items=""]`
const LIST_SELECTOR = `[cmd-list-sizer=""]`
const GROUP_HEADING_SELECTOR = `[cmd-group-heading=""]`

export type CommandProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /**
   * Accessible label for this command menu. Not shown visibly.
   */
  label?: string

  /**
   * Set to `true` to turn on looping around when using the arrow keys.
   */
  loop?: boolean

  /**
  Set to `false` to turn off automatic filtering and sorting.
  If `false`, you must conditionally render valid items based on the search query.
  **/
  shouldFilter?: boolean

  /**
   * Whether each command menu item should matches the given search query
   * returns a number between 0 to 1 where 1 being the best match and 0 being entirely hidden.
   * @param value
   * @param search
   * @returns
   */
  filter?: (value: string, search: string) => number

  /**
   * default item value
   */
  defaultValue?: string

  /**
   * controlled state of the selected command menu item.
   */
  value?: string

  /**
   * Event handler called when the selected item of the menu changes
   */
  onValueChange?: (value: string) => void
}

const defaultFilter: CommandProps['filter'] = (value, search) => commandScore(value, search)

export const Command: ParentComponent<CommandProps> = (props) => {
  const [ref, setRef] = createSignal<HTMLDivElement>()
  const [state, setState] = createSignal<State>({
    search: '',
    value: props.value ?? props.defaultValue?.toLowerCase() ?? '',
    filtered: { count: 0, items: new Map(), groups: new Set() },
  })
  const allItemsIds = new Set<string>()
  const allGroupsIds = new Map<string, Set<string>>()
  const ids = new Map<string, string>()
  const listeners = new Set<() => void>()

  const [_, etc] = splitProps(props, ['label', 'children', 'value', 'onValueChange', 'filter', 'shouldFilter'])
  const listId = createUniqueId()
  const labelId = createUniqueId()
  const inputId = createUniqueId()
  // we may encounter issues where scheduled functions should run in the next rendering phase
  // Imperatively run a function on the next layout effect cycle
  const schedule = (i: number, fn: Function) => fn()

  function score(value: string) {
    const filter = props.filter ?? defaultFilter
    return value && filter ? filter(value, state().search) : 0
  }

  function scrollSelectedIntoView() {
    const item = getSelectedItem()

    if (item) {
      if (item.parentElement?.firstChild === item) {
        // First item in Group, ensure heading is in view
        item.closest(GROUP_SELECTOR)?.querySelector(GROUP_HEADING_SELECTOR)?.scrollIntoView({ block: 'nearest' })
      }

      // Ensure the item is always in view
      item.scrollIntoView({ block: 'nearest' })
    }
  }

  /**
   * Controlled  mode `value` handling.
   */
  createEffect(() => {
    if (props.value !== undefined) {
      const v = props.value.trim().toLowerCase()
      setState((s) => {
        s.value = v
        return s
      })
      // schedule(6, scrollSelectedIntoView)
      scrollSelectedIntoView
      store().emit()
    }
  })

  const store: Accessor<Store> = createMemo(() => {
    return {
      subscribe: (cb) => {
        listeners.add(cb)
        return () => listeners.delete(cb)
      },
      snapshot: () => {
        return state()
      },
      setState: (key, value, opts) => {
        if (Object.is(state()[key], value)) return
        state()[key] = value

        if (key === 'search') {
          // Filter synchronously before emitting back to children
          filterItems()
          sort()
          schedule(1, selectFirstItem)
          // selectFirstItem()
        } else if (key === 'value') {
          // If controlled, just call the callback instead of updating state internally
          const newValue = (value ?? '') as string
          props.onValueChange?.(newValue)
          // opts is a boolean referring to whether it should NOT be scrolled into view
        } else if (!opts) {
          // Scroll the selected item into view
          // schedule(5, scrollSelectedIntoView)
          scrollSelectedIntoView
        }
        // Notify subscribers that state has changed
        store().emit()
      },
      emit: () => {
        listeners.forEach((l) => l())
      },
    }
  })

  function filterItems() {
    if (
      !state().search ||
      // Explicitly false, because true | undefined is the default
      props.shouldFilter === false
    ) {
      state().filtered.count = allItemsIds.size
      // Do nothing, each item will know to show itself because search is empty
      return
    }

    // Reset the groups
    state().filtered.groups = new Set()
    let itemCount = 0

    // Check which items should be included
    for (const id of allItemsIds) {
      const value = ids.get(id)
      const rank = score(value || '')
      state().filtered.items.set(id, rank)
      if (rank > 0) itemCount++
    }

    // Check which groups have at least 1 item shown
    for (const [groupId, group] of allGroupsIds) {
      for (const itemId of group) {
        const val = state().filtered.items.get(itemId)
        if (val && val > 0) {
          state().filtered.groups.add(groupId)
          break
        }
      }
    }

    state().filtered.count = itemCount
  }

  function getValidItems() {
    return Array.from(ref()?.querySelectorAll(VALID_ITEM_SELECTOR) || [])
  }

  /** Sorts items by score, and groups by highest item score. */
  function sort() {
    if (
      !ref ||
      !state().search ||
      // Explicitly false, because true | undefined is the default
      props.shouldFilter === false
    ) {
      return
    }

    const scores = state().filtered.items

    // Sort the groups
    const groups: [string, number][] = []
    state().filtered.groups.forEach((value) => {
      const items = allGroupsIds.get(value)

      // Get the maximum score of the group's items
      let max = 0
      items?.forEach((item: string) => {
        const score = scores.get(item)
        if (score) max = Math.max(score, max)
      })

      groups.push([value, max])
    })

    // Sort items within groups to bottom
    // Sort items outside of groups
    // Sort groups to bottom (pushes all non-grouped items to the top)
    const list = ref()?.querySelector(LIST_SELECTOR)

    // Sort the items
    getValidItems()
      .sort((a: Element, b: Element) => {
        const valueA = a.getAttribute(VALUE_ATTR) || ''
        const valueB = b.getAttribute(VALUE_ATTR) || ''
        return (scores.get(valueB) ?? 0) - (scores.get(valueA) ?? 0)
      })
      .forEach((item) => {
        const group = item.closest(GROUP_ITEMS_SELECTOR)

        if (group) {
          const g = item.parentElement === group ? item : item.closest(`${GROUP_ITEMS_SELECTOR} > *`)
          if (g) group.appendChild(g)
        } else {
          const i = item.parentElement === list ? item : item.closest(`${GROUP_ITEMS_SELECTOR} > *`)
          if (i) list?.appendChild(i)
        }
      })

    groups
      .sort((a, b) => b[1] - a[1])
      .forEach((group) => {
        const element = ref()?.querySelector(`${GROUP_SELECTOR}[${VALUE_ATTR}="${group[0]}"]`)
        element?.parentElement?.appendChild(element)
      })
  }

  function selectFirstItem() {
    const item = getValidItems().find((item) => !item.ariaDisabled)
    const value = item?.getAttribute(VALUE_ATTR)
    store().setState('value', value || undefined)
  }

  function getSelectedItem() {
    return ref()?.querySelector(`${ITEM_SELECTOR}[aria-selected="true"]`)
  }

  const context: Accessor<Ctx> = createMemo(
    () => ({
      // Keep id → value mapping up-to-date
      value: (id, value) => {
        if (value !== ids.get(id)) {
          ids.set(id, value)
          state().filtered.items.set(id, score(value))
          // schedule(2, () => {
          sort()
          store().emit()
          // })
        }
      },

      // Track item lifecycle (mount, unmount)
      item: (id, groupId) => {
        allItemsIds.add(id)

        // Track this item within the group
        if (groupId) {
          if (!allGroupsIds.has(groupId)) {
            allGroupsIds.set(groupId, new Set([id]))
          } else {
            allGroupsIds.get(groupId)?.add(id)
          }
        }

        // Batch this, multiple items can mount in one pass
        // and we should not be filtering/sorting/emitting each time
        // batch(() => {
        // schedule(3, () => {
        filterItems()
        sort()
        // Could be initial mount, select the first item if none already selected
        if (!state().value) {
          selectFirstItem()
        }

        store().emit()
        // })
        // })

        return () => {
          ids.delete(id)
          allItemsIds.delete(id)
          state().filtered.items.delete(id)
          const selectedItem = getSelectedItem()

          // Batch this, multiple items could be removed in one pass
          // schedule(4, () => {
          filterItems()

          // The item removed have been the selected one,
          // so selection should be moved to the first
          if (selectedItem?.getAttribute('id') === id) selectFirstItem()

          store().emit()
          // })
        }
      },

      // Track group lifecycle (mount, unmount)
      group: (id) => {
        if (!allGroupsIds.has(id)) {
          allGroupsIds.set(id, new Set())
        }

        return () => {
          ids.delete(id)
          allGroupsIds.delete(id)
        }
      },
      filter: () => {
        return props.shouldFilter || false
      },

      label: props.label || props['aria-label'] || '',
      commandRef: ref,
      listId,
      inputId,
      labelId,
    }),
    [],
  )

  function updateSelectedToIndex(index: number) {
    const items = getValidItems()
    const item = items[index]
    if (item) store().setState('value', item.getAttribute(VALUE_ATTR)!)
  }

  function findNextSibling(el: Element, selector: string) {
    let sibling = el.nextElementSibling

    while (sibling) {
      if (sibling.matches(selector)) return sibling
      sibling = sibling.nextElementSibling
    }
  }

  function findPreviousSibling(el: Element, selector: string) {
    let sibling = el.previousElementSibling

    while (sibling) {
      if (sibling.matches(selector)) return sibling
      sibling = sibling.previousElementSibling
    }
  }

  function updateSelectedByChange(change: 1 | -1) {
    const selected = getSelectedItem()
    const items = getValidItems()
    const index = items.findIndex((item) => item === selected)

    // Get item at this index
    let newSelected = items[index + change]

    if (props.loop) {
      newSelected =
        index + change < 0
          ? items[items.length - 1]
          : index + change === items.length
          ? items[0]
          : items[index + change]
    }

    if (newSelected) {
      store().setState('value', newSelected.getAttribute(VALUE_ATTR)!)
    }
  }

  function updateSelectedToGroup(change: 1 | -1) {
    const selected = getSelectedItem()
    let group = selected?.closest(GROUP_SELECTOR)
    let item: HTMLElement | undefined | null

    while (group && !item) {
      group = change > 0 ? findNextSibling(group, GROUP_SELECTOR) : findPreviousSibling(group, GROUP_SELECTOR)
      item = group?.querySelector(VALID_ITEM_SELECTOR)
    }

    if (item) store().setState('value', item.getAttribute(VALUE_ATTR)!)
    else updateSelectedByChange(change)
  }

  const last = () => updateSelectedToIndex(getValidItems().length - 1)

  const next = (e: KeyboardEvent) => {
    e.preventDefault()

    if (e.metaKey) {
      // Last item
      last()
    } else if (e.altKey) {
      // Next group
      updateSelectedToGroup(1)
    } else {
      // Next item
      updateSelectedByChange(1)
    }
  }

  const prev = (e: KeyboardEvent) => {
    e.preventDefault()

    if (e.metaKey) {
      // First item
      updateSelectedToIndex(0)
    } else if (e.altKey) {
      // Previous group
      updateSelectedToGroup(-1)
    } else {
      // Previous item
      updateSelectedByChange(-1)
    }
  }

  return (
    <div
      ref={setRef}
      cmd-root=""
      {...etc}
      tabIndex="0"
      onKeyDown={(e) => {
        if (etc.onKeyDown) (etc.onKeyDown as (e: KeyboardEvent) => void)(e)
        if (!e.defaultPrevented) {
          switch (e.key) {
            case 'ArrowDown': {
              next(e)
              break
            }
            case 'ArrowUp': {
              prev(e)
              break
            }
            case 'Home': {
              // First item
              e.preventDefault()
              updateSelectedToIndex(0)
              break
            }
            case 'End': {
              // Last item
              e.preventDefault()
              last()
              break
            }
            case 'Enter': {
              // TODO check if IME composition is finished before triggering onSelect
              // Trigger item onSelect
              e.preventDefault()
              const item = getSelectedItem()
              if (item) {
                const event = new Event(SELECT_EVENT)
                item.dispatchEvent(event)
              }
            }
          }
        }
      }}
    >
      <label
        cmd-label=""
        // html-for={context.inputId}
        // id={context.labelId}
        // Screen reader only
        // style={srOnlyStyles}
      >
        {props.label}
      </label>
      <StoreContext.Provider value={store()}>
        <CommandContext.Provider value={context()}>{props.children}</CommandContext.Provider>
      </StoreContext.Provider>
    </div>
  )
}
