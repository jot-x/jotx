import { createContext, createEffect, createSignal, onMount, useContext } from 'solid-js'
import { CssStyles } from './types'

export const makeStyleContext = (initialVars: CssStyles[]) => {
  const [styles, setStyles] = createSignal<CssStyles[]>(initialVars)
  const [systemMode, setSystemMode] = createSignal<'light' | 'dark'>()

  const addStyles = (...style: CssStyles[]) => {
    setStyles((prevArr) => [...prevArr, ...style])
  }

  onMount(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = (event: MediaQueryListEvent) => {
      setSystemMode(event.matches ? 'dark' : 'light')
    }
    mediaQueryList.addEventListener('change', listener)
  })

  return { systemMode, styles, setStyles, addStyles }
}

export type StyleContextType = ReturnType<typeof makeStyleContext>
export const StyleContext = createContext<StyleContextType>()
export const useStyles = () => useContext(StyleContext)!
