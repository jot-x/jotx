import { createShortcut } from '@solid-primitives/keyboard'
import { Component, ParentComponent, createEffect, createSignal } from 'solid-js'
import { cn } from '../../utils/css'
import { Command, CommandProps } from './command'

type DialogProps = CommandProps & {
  /** Provide a className to the Dialog overlay. */
  overlayClassName?: string
  /** Provide a className to the Dialog content. */
  contentClassName?: string
  /** Provide a custom element the Dialog should portal into. */
  container?: HTMLElement
  /** Array of keys to open the dialog */
  keyboard?: string[]
}

export const CommandDialog: Component<DialogProps> = (props) => {
  const [open, setOpen] = createSignal(false)

  if (props.keyboard) createShortcut(props.keyboard, () => setOpen((o) => setOpen(!o)))

  return (
    <Dialog width="md" open={open()} setOpen={setOpen}>
      <Command {...props} />
    </Dialog>
  )
}

const Dialog: ParentComponent<{
  open: boolean
  setOpen: (state: boolean) => void
  width: 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'full'
}> = (props) => {
  createShortcut(['Escape'], () => {
    props.setOpen(false)
  })

  return (
    <div
      class={cn(
        'fixed inset-0 overflow-y-auto transition-all ease-in',
        props.open ? 'visible' : 'invisible duration-100 ease-in',
      )}
      style={{ 'z-index': 1 }}
    >
      {/* overlay */}
      <div
        class={cn(
          'fixed inset-0 bg-gray-200 transition-opacity',
          props.open ? 'opacity-75 duration-75 ease-out' : 'opacity-0 duration-75 ease-in',
        )}
      />
      {/* dialog */}
      <div class="min-h-full flex items-center justify-center p-2 sm:p-6">
        <div
          class="relative inline-block w-full rounded-lg shadow-xl transition-all bg-white opacity-100 p-8"
          classList={{
            'sm:max-w-sm': props.width === 'sm',
            'sm:max-w-lg': props.width === 'base',
            'sm:max-w-xl': props.width === 'md',
            'sm:max-w-3xl': props.width === 'lg',
            'sm:max-w-5xl': props.width === 'xl',
            'sm:max-w-full': props.width === 'full',
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            class="absolute right-4 top-4 h-6 w-6 rounded-full bg-gray-100 p-1 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="close"
            onClick={() => props.setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {props.children}
        </div>
      </div>
    </div>
  )
}
