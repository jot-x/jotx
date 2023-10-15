import { Component } from 'solid-js'

export type SectionDirection = 'row' | 'column'

export interface ComponentRegistry {
  [k: string]: Component<any>
}

export type AnyProps = Record<string, any>
