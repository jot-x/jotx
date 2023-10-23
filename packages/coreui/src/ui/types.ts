import { JSX, Component as SolidComponent } from 'solid-js'

export type IdProps<P = {}> = P & {
  id: string
}

export type Component<P = {}> = SolidComponent<IdProps<P>>

export type ParentProps<P = {}> = P & {
  children?: JSX.Element
}

export type ParentIdProps<P> = ParentProps<P> & {
  id: string
}

export interface ComponentRegistry {
  [k: string]: Component<any>
}

export type ParentComponent<P = {}> = Component<ParentIdProps<P>>

export type SectionDirection = 'row' | 'column'

export type AnyProps = any
