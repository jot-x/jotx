import { children } from 'solid-js'
import { ParentComponentWithID } from './parent-component-id'

export const InjectID: ParentComponentWithID = (props) => {
  const c = children(() => props.children).toArray()
  if (c) {
    if (!c[0]) {
      return c
    }

    if (c) {
      const el = c[0] as HTMLElement
      if (el.id && el.id !== props.id) {
        console.warn(`id ${el.id} was set but expected ${props.id}`)
      }
      el.id = props.id
    }

    return c
  }
}
