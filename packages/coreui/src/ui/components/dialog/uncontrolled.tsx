import { Dialog } from '@kobalte/core'
import { createSignal } from 'solid-js'
import { Component } from '../../types'
import { useBusContext } from '../../../event-bus/context'

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
