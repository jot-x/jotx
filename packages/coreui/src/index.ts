export { CoreUI } from './coreui'
export { useBusContext } from './event-bus/context'
export { makePlugin } from './plugin'
export { usePlugins } from './plugin/context'
export type { IPlugin, PluginRegistration } from './plugin/types'
export { useRouting } from './routing/context'
export { useNavigate } from './routing/navigate-hook'
export type { IRoute } from './routing/types'
export { RenderTreeList } from './ui/render'
export type { ComponentRegistry } from './ui/types'
export { cn } from './ui/utils/css'
export { useWorkspace } from './workspace/context'

export { useFilesystem } from './filesystem/context'
export type { FileSystemDefinition, FileSystemType, VFSSettings, WafsSettings } from './filesystem/types-definition'

export type { ActionActivation, Activation, TabActivation } from './event-bus/types'
export type { PluginOptions } from './plugin/types'
export type { AnyProps, Component, ParentComponent } from './ui/types'
export type { TreeNode } from './workspace/types'

export { Input } from './ui/components/input/index'
export { Label } from './ui/components/label/index'
export { ValidationMessage, createForm, reporter } from './ui/forms'
export { Icon } from './ui/icons/index'

import * as _Dialog from './ui/components/dialog/dialog'
import { UncontrolledDialog } from './ui/components/dialog/uncontrolled'

export const Dialog = {
  Root: UncontrolledDialog,
  Content: _Dialog.DialogContent,
  Description: _Dialog.DialogDescription,
  Header: _Dialog.DialogHeader,
  Footer: _Dialog.Dialog,
  Title: _Dialog.DialogTitle,
}

import * as _Card from './ui/components/card/index'
export const Card = {
  Card: _Card.Card,
  Header: _Card.CardHeader,
  Content: _Card.CardContent,
  Title: _Card.CardTitle,
}
