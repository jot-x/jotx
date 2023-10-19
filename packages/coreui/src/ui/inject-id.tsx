import { children } from 'solid-js'
import { ParentComponent } from './types'

export const InjectID: ParentComponent = (props) => {
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
