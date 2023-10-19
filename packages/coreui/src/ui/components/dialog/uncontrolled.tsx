import { Dialog } from '@kobalte/core'
import { useBusContext } from 'packages/coreui/src/event-bus/context'
import { createSignal } from 'solid-js'
import { Component } from '../../types'

export const UncontrolledDialog: Component<Omit<Dialog.DialogRootProps, 'onOpenChange' | 'defaultOpen'>> = (props) => {
  const [open, setOpen] = createSignal(props.open || false)

  const [bus] = useBusContext()
  bus().activation.listen((a) => {
    if (a.type === 'action') {
      if (a.action === 'open' || a.action === 'close') {
        setOpen(a.action === 'open' ? true : false)
      }
    }
  })

  return <Dialog.Root {...props} open={open()} onOpenChange={(isOpen) => setOpen(isOpen)} />
}
