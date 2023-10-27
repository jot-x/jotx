import { Accessor, JSX, ParentComponent, Show, createEffect, createSignal, createUniqueId, useContext } from 'solid-js'
import { VALUE_ATTR } from './constants'
import { useCommand } from './context'
import { GroupContext } from './group-context'
import { useStore } from './state-context'
import { SELECT_EVENT } from './styles'
import { cmd } from './utils'

type ItemProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'disabled' | 'onSelect' | 'value'> & {
  /** Set to `true` to disable selection */
  disabled?: boolean
  /** Event handler trigged when this item is selected, either via click or keyboard selection. */
  onSelect?: (value: string) => void
  /** Value of this item, if not defined will be inferred from text children */
  value?: string
  /** true if item should be rendered regardless of filtering */
  sticky?: boolean
}

function useValue(
  id: string,
  ref: Accessor<HTMLElement | undefined>,
  deps: (undefined | string | JSX.Element | Accessor<HTMLDivElement | undefined>)[],
) {
  const [value, setValue] = createSignal<string>('')
  const context = useCommand()

  createEffect(() => {
    let value
    for (const part of deps) {
      if (typeof part === 'string') {
        value = part.trim().toLowerCase()
        break
      }
    }

    if (value) {
      setValue(value)
      context?.value(id, value)
      ref()?.setAttribute(VALUE_ATTR, value)
    }
  })

  return value
}

/**
 * Command menu item. Becomes active on pointer enter or through keyboard navigation.
 * Preferably pass a `value`, otherwise the value will be inferred from `children` or
 * the rendered item's `textContent`.
 */
export const Item: ParentComponent<ItemProps> = (props) => {
  const id = createUniqueId()
  const [ref, setRef] = createSignal<HTMLDivElement>()
  const groupContext = useContext(GroupContext)
  const context = useCommand()
  const sticky = props.sticky ?? groupContext?.sticky
  const store = useStore()
  const value = useValue(id, ref, [props.value, props.children, ref])
  const selected = cmd((state) => state.value && state.value === value())

  function select() {
    store?.setState('value', value(), true)
  }

  const render = cmd((state) => {
    return sticky ? true : context?.filter() === false ? true : !state.search ? true : state.filtered.items.get(id)! > 0
  })

  createEffect(() => {
    context.item(id, groupContext?.id!)
  })

  createEffect(() => {
    const element = ref()
    if (!element || props.disabled) return
    element.addEventListener(SELECT_EVENT, onSelect)
    return () => element.removeEventListener(SELECT_EVENT, onSelect)
  })

  function onSelect() {
    props.onSelect?.(value())
  }

  const { disabled: _, value: __, onSelect: ___, ...etc } = props

  return (
    <Show when={render()}>
      <div
        ref={setRef}
        id={id}
        cmd-item=""
        role="option"
        aria-disabled={props.disabled || undefined}
        aria-selected={selected() || undefined}
        data-disabled={props.disabled || undefined}
        data-selected={selected() || undefined}
        onPointerMove={() => (props.disabled ? undefined : select())}
        onClick={() => (props.disabled ? undefined : onSelect())}
      >
        {props.children}
      </div>
    </Show>
  )
}
