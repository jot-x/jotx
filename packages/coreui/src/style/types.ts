import { JSX } from 'solid-js'

export type CSSPropery = JSX.CSSProperties

export interface CssStyles {
  selector: string
  styles: CSSPropery[]
}
