import { Component, createMemo } from 'solid-js'
import { useStyles } from './context'
import { convertCssStylesToString } from './utils'

/**
 * A component that configures the app's styles
 */
export const Styles: Component = () => {
  const { styles } = useStyles()

  const vstr = createMemo(() => {
    return convertCssStylesToString(styles())
  })

  return <style textContent={`${vstr()}`} />
}
