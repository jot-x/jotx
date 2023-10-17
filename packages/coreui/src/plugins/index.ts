import { Component } from 'solid-js'
import { ComponentRegistry } from '../ui/types'

export const makePlugins = () => {
  const registry: ComponentRegistry = {}

  return {
    registerComponent: (key: string, component: Component) => {
      registry[key] = component
    },
  }
}
