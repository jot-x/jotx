import { JSX, Component as SolidComponent } from 'solid-js'

export type Component<P = { id: string }> = (props: P) => JSX.Element

export type ParentProps<P = {}> = P & {
  children?: JSX.Element
}

export interface ComponentRegistry {
  [k: string]: Component<any>
}

export type Props<P> = ParentProps<P> & {
  id: string
}

export type ParentComponent<P = {}> = Component<Props<P>>

export type SectionDirection = 'row' | 'column'

export type AnyProps = Record<string, any>
