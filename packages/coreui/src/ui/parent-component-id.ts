import { Component, ParentProps } from 'solid-js'

export type Props<P> = ParentProps<P> & {
  id: string
}

export type ParentComponentWithID<P = {}> = Component<Props<P>>
