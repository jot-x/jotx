import { Component, JSX, splitProps } from 'solid-js'
import { useCommand } from './context'
import { useStore } from './state-context'
import { cmd } from './utils'

type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> & {
  /** Controlled state of the input value */
  value?: string

  /** Event handler called when the search value changes */
  onValueChange?: (search: string) => void
}

/** Input component to filter items by */
export const Input: Component<InputProps> = (props) => {
  const context = useCommand()
  const [_, etc] = splitProps(props, ['onValueChange'])
  const store = useStore()
  const isControlled = props.value != null
  const search = cmd((state) => state.search)

  return (
    <input
      id={context.inputId}
      {...etc}
      cmd-input
      autocomplete="off"
      autocorrect="off"
      spellcheck={false}
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={true}
      aria-controls={context.listId}
      aria-labelledby={context.labelId}
      // aria-activedescendant={selectedItemId}
      type="text"
      value={isControlled ? props.value : search()}
      oninput={(e) => {
        if (!isControlled) {
          store.setState('search', e.target.value)
        }

        props.onValueChange?.(e.target.value)
      }}
    ></input>
  )
}
