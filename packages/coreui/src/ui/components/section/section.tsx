import { debounce } from '@solid-primitives/scheduled'
import { clsx } from 'clsx'
import { JSX, Show, createMemo, createSignal } from 'solid-js'
import { effect } from 'solid-js/web'
import { useSettings } from '../../../settings/context'
import { ParentComponentWithID } from '../../parent-component-id'
import { SectionDirection } from '../../types'
import { Resizer } from './resizer'

export type SectionProps = {
  handleLocation: 'start' | 'end'
  resizable: boolean
  resizeSettingsPath?: string
  direction?: SectionDirection
  minScreen?: 'sm' | 'md' | 'lg' | 'xl'
  class?: string
  style?: JSX.StyleHTMLAttributes<HTMLDivElement>
}

export const Section: ParentComponentWithID<SectionProps> = (props) => {
  const { getSetting, setSetting } = useSettings()
  // resize related
  //
  const initialSize = props.resizeSettingsPath
    ? getSetting(props.resizeSettingsPath)?.value || getSetting(props.resizeSettingsPath)?.default || 20
    : 20

  const [flexBasis, setFlexBasis] = createSignal(initialSize)
  const [isHorizontal] = createSignal(false)
  const [container, setContainer] = createSignal<HTMLDivElement>()

  const [initialContainerDOMRect, setInitialContainerDOMRect] = createSignal<DOMRect>()
  let resizer!: HTMLDivElement

  const saveResizedIntoSettings = debounce((size: number) => {
    if (props.resizeSettingsPath) setSetting(props.resizeSettingsPath, size.toFixed(2))
  }, 150)

  effect(() => {
    setInitialContainerDOMRect(container()?.getBoundingClientRect())
  })

  const onResizeStart = (clientX: number, _: number) => {
    let position: number
    // let size: number

    const rect = initialContainerDOMRect()
    const cont = container()
    if (!rect || !cont) return

    if (isHorizontal()) {
      throw Error('currently not supported')
    } else {
      // TODO -2 is a hack that fixes resizing glitch
      position = rect.right - clientX - resizer.offsetWidth + 3
      // size = cont.offsetWidth - resizer.offsetWidth
    }

    const percentage = (position / rect.width) * 100 * (initialSize / 100)
    const percentageAdjusted = Math.min(Math.max(percentage, 10), 70)
    setFlexBasis(percentageAdjusted)
    saveResizedIntoSettings(percentageAdjusted)
  }

  const onResizeEnd = (clientX: number, _: number) => {
    let position: number
    // let size: number

    const rect = initialContainerDOMRect()
    const cont = container()
    if (!rect || !cont) return

    if (isHorizontal()) {
      throw Error('currently not supported')
    } else {
      // TODO -2 is a hack that fixes resizing glitch
      position = clientX - rect.left - resizer.offsetWidth - 2
      // size = cont.offsetWidth - resizer.offsetWidth
    }

    const percentage = (position / rect.width) * 100 * (initialSize / 100)
    const percentageAdjusted = Math.min(Math.max(percentage, 10), 70)
    setFlexBasis(percentageAdjusted)
    saveResizedIntoSettings(percentageAdjusted)
  }

  const extra = createMemo(() => {
    if (props.resizable) {
      return { flex: `0 0 ${flexBasis()}%` }
    }
    return {}
  })

  return (
    <div
      ref={setContainer}
      style={{ ...props.style, ...extra() }}
      class={clsx(
        'text-primary',
        !!props.minScreen ? 'hidden' : 'flex',
        props.minScreen === 'sm' && 'sm:flex',
        props.minScreen === 'md' && 'md:flex',
        props.minScreen === 'lg' && 'lg:flex',
        props.minScreen === 'xl' && 'xl:flex',
        props.direction === 'column' ? 'flex-col' : 'flex-row',
        props.class,
      )}
    >
      <Show when={props.resizable && props.handleLocation === 'start'}>
        <Resizer ref={resizer} isHorizontal={isHorizontal()} onResize={onResizeStart} />
      </Show>
      {props.children}
      <Show when={props.resizable && props.handleLocation === 'end'}>
        <Resizer ref={resizer} isHorizontal={isHorizontal()} onResize={onResizeEnd} />
      </Show>
    </div>
  )
}
