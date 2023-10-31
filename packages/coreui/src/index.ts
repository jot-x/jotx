export { CoreUI } from './coreui'
export { useBusContext } from './event-bus/context'
export type { HubType } from './event-bus/context'
export { useCurrentFileSystemName } from './filesystem/hooks'
export { makePlugin } from './plugin'
export { usePlugins } from './plugin/context'
export type { IPlugin, PluginRegistration } from './plugin/types'
export { useRouting } from './routing/context'
export { useNavigate } from './routing/navigate-hook'
export { useParams } from './routing/params-hook'
export type { IRoute } from './routing/types'
export { RenderTreeList } from './ui/render'
export type { ComponentRegistry } from './ui/types'
export { cn } from './ui/utils/css'
export { useWorkspace } from './workspace/context'

export { useStyles } from './style/context'

export { EDITOR_SECTION_ID } from './constants'

export { open as openContent } from './plugin-utils/open'
export { openFile } from './plugin-utils/open-file'
export { removeTab } from './plugin-utils/remove-tab'

export { debounce } from './plugin-utils/debounce'

export { makeVirtualFileSystem } from './filesystem/adapter-vfs'
export { makeWebAccessFileSystem } from './filesystem/adapter-web'
export { useFilesystem } from './filesystem/context'
export { getItemName as getFileSystemItemName } from './filesystem/tools'
export type { AsyncFileSystem, SyncFileSystem } from './filesystem/types'
export type { FileSystemDefinition, FileSystemType, VFSSettings, WafsSettings } from './filesystem/types-definition'

export type { CommandsComponentDefinition } from './command/types'
export { createShortcut } from './plugin-utils/keyboard'
export { Item as CommandItem } from './ui/components/commands-palette/item'
export type { Command } from './ui/components/commands-palette/types'

export { useEditorActiveContent } from './plugin-utils/use-active-editor-content'
export type { CSSPropery, CssStyles } from './style/types'

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
