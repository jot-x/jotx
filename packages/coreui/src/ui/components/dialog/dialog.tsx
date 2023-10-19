import type { Component, ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

import { Dialog as DialogPrimitive } from '@kobalte/core'
import { cn } from '../../utils/css'

const Dialog = DialogPrimitive.Root

const DialogTrigger: Component<DialogPrimitive.DialogTriggerProps> = (props) => {
  const [, rest] = splitProps(props, ['children'])
  return <DialogPrimitive.Trigger {...rest}>{props.children}</DialogPrimitive.Trigger>
}

const DialogPortal: Component<DialogPrimitive.DialogPortalProps> = (props) => {
  const [, rest] = splitProps(props, ['children'])
  return (
    <DialogPrimitive.Portal {...rest}>
      <div class="fixed inset-0 z-50 flex items-start justify-center sm:items-center">{props.children}</div>
    </DialogPrimitive.Portal>
  )
}

const DialogOverlay: Component<DialogPrimitive.DialogOverlayProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <DialogPrimitive.Overlay
      class={cn(
        'bg-background/80 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 backdrop-blur-sm transition-all duration-100',
        props.class,
      )}
      {...rest}
    />
  )
}

const DialogContent: Component<DialogPrimitive.DialogContentProps> = (props) => {
  const [, rest] = splitProps(props, ['class', 'children'])
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        class={cn(
          'bg-background animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-50 grid w-full gap-4 rounded-b-lg border p-6 shadow-lg sm:max-w-lg sm:rounded-lg',
          props.class,
        )}
        {...rest}
      >
        {props.children}
        <DialogPrimitive.CloseButton class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <svg
            fill="none"
            stroke-width="2"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x h-4 w-4"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="overflow: visible;"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
          <span class="sr-only">Close</span>
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const DialogHeader: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <div class={cn('flex flex-col space-y-1.5 text-center sm:text-left', props.class)} {...rest} />
}

const DialogFooter: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <div class={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', props.class)} {...rest} />
}

const DialogTitle: Component<DialogPrimitive.DialogTitleProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <DialogPrimitive.Title class={cn('text-lg font-semibold leading-none tracking-tight', props.class)} {...rest} />
  )
}

const DialogDescription: Component<DialogPrimitive.DialogDescriptionProps> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <DialogPrimitive.Description class={cn('text-muted-foreground text-sm', props.class)} {...rest} />
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription }
