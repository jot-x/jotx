import { FileSystemType } from '@jotx/coreui'
import { Component as SolidComponent } from 'solid-js'

export type Type = {
  type: FileSystemType
  title: string
  icon: string
  component: SolidComponent
}
