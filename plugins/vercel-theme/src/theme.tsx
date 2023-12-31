import { CSSPropery, CommandItem, CommandsComponentDefinition, CssStyles, useStyles } from '@jotx/coreui'
import { createEffect } from 'solid-js'

export const ThemeCommand: CommandsComponentDefinition = {
  commands: [
    {
      id: 'vercel-theme',
      name: 'Vercel Theme',
    },
  ],
  component: () => {
    createEffect(() => {
      apply()
    })
    const { systemMode, addStyles } = useStyles()
    const apply = () => {
      if (systemMode() === 'light') {
        addStyles({
          selector: ':root',
          styles: [
            { '--background': '240, 10%, 3.9%' },
            { '--primary': '0, 0%, 98%' },
            { '--secondary': '240, 4.8%, 95.9%' },
          ],
        })
      } else {
        addStyles({
          selector: ':root',
          styles: [
            { '--background': '240, 10%, 3.9%' },
            { '--primary': '240, 5.9%, 10%' },
            { '--secondary': '240, 4.8%, 95.9%' },
          ],
        })
      }

      addStyles({ selector: '.jotx-editor', styles: editorStyles(systemMode()) })
    }
    return <CommandItem onSelect={() => apply()}>Vercel Theme</CommandItem>
  },
}

/*
@layer base {
  :root {
    
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }
  .dark {
    
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
*/

interface StyleModes {
  light?: string
  dark?: string
}

interface Style extends StyleModes {
  // the variable suffix
  suffix: string
  // default value of the css rule
  default: string
}

const editorStyles = (mode: 'light' | 'dark' | undefined): CSSPropery[] => {
  const styles: Style[] = [
    // general
    { suffix: 'border-radius', default: '0.25rem' },
    { suffix: 'color', default: 'currentColor' },
    { suffix: 'flex-direction', default: 'column' },
    { suffix: 'font-family', default: 'inherit' },
    // block
    { suffix: 'block-background-color', default: '#121212', light: '#f5f5f5' },
    { suffix: 'block-background-color-on-hover', default: '#0f0f0f', light: '#e0e0e0' },
    { suffix: 'block-max-height', default: '20rem' },
    { suffix: 'block-padding', default: '0.5rem' },
    // code
    { suffix: 'code-background-color', default: 'var(--jotxe-internal-block-background-color)' },
    { suffix: 'code-color', default: 'inherit' },
    { suffix: 'code-font-family', default: "'Monaco', Courier, monospace" },
    // editor
    { suffix: 'editor-font-size', default: '1em' },
    { suffix: 'editor-line-height', default: '2em' },
    { suffix: 'editor-padding', default: '0.5rem' },
    { suffix: 'inline-padding', default: '0.125rem' },
    // modal
    { suffix: 'modal-position', default: 'fixed' },
    // syntax
    { suffix: 'syntax-atom-color', default: '#d19a66' },
    { suffix: 'syntax-comment-color', default: '#abb2bf' },
    { suffix: 'syntax-comment-font-style', default: 'italic' },
    { suffix: 'syntax-emphasis-color', default: 'inherit' },
    { suffix: 'syntax-emphasis-font-style', default: 'italic' },
    { suffix: 'syntax-hashtag-background-color', default: '#222', light: '#eee' },
    { suffix: 'syntax-hashtag-color', default: 'inherit' },
    { suffix: 'syntax-heading-color', default: 'inherit' },
    { suffix: 'syntax-heading-font-weight', default: '600' },
    {
      suffix: 'syntax-heading1-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)',
    },
    { suffix: 'syntax-heading1-font-size', default: '1.6em' },
    { suffix: 'syntax-heading1-font-weight', default: '600' },
    {
      suffix: 'syntax-heading2-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)',
    },
    { suffix: 'syntax-heading2-font-size', default: '1.5em' },
    { suffix: 'syntax-heading2-font-weight', default: '600' },
    {
      suffix: 'syntax-heading3-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)',
    },
    { suffix: 'syntax-heading3-font-size', default: '1.4em' },
    { suffix: 'syntax-heading3-font-weight', default: '600' },
    {
      suffix: 'syntax-heading4-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)',
    },
    { suffix: 'syntax-heading4-font-size', default: '1.3em' },
    { suffix: 'syntax-heading4-font-weight', default: '600' },
    {
      suffix: 'syntax-heading5-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)',
    },
    { suffix: 'syntax-heading5-font-size', default: '1.2em' },
    { suffix: 'syntax-heading5-font-weight', default: '600' },
    {
      suffix: 'syntax-heading6-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)',
    },
    { suffix: 'syntax-heading6-font-size', default: '1.1em' },
    { suffix: 'syntax-heading6-font-weight', default: '600' },
    { suffix: 'syntax-highlight-background-color', default: '#555555' },
    { suffix: 'syntax-keyword-color', default: '#c678dd' },
    { suffix: 'syntax-link-color', default: 'inherit' },
    { suffix: 'syntax-meta-color', default: '#abb2bf' },
    { suffix: 'syntax-monospace-color', default: 'var(--jotxe-internal-code-color)' },
    { suffix: 'syntax-monospace-font-family', default: 'var(--jotxe-internal-code-font-family)' },
    { suffix: 'syntax-name-color', default: '#d19a66' },
    { suffix: 'syntax-name-label-color', default: '#abb2bf' },
    { suffix: 'syntax-name-property-color', default: '#96c0d8' },
    { suffix: 'syntax-name-property-definition-color', default: '#e06c75' },
    { suffix: 'syntax-name-variable-color', default: '#e06c75' },
    { suffix: 'syntax-name-variable-definition-color', default: '#e5c07b' },
    { suffix: 'syntax-name-variable-local-color', default: '#d19a66' },
    { suffix: 'syntax-name-variable-special-color', default: 'inherit' },
    { suffix: 'syntax-number-color', default: '#d19a66' },
    { suffix: 'syntax-operator-color', default: '#96c0d8' },
    { suffix: 'syntax-processing-instruction-color', default: '#444444', light: '#bbbbbb' },
    { suffix: 'syntax-punctuation-color', default: '#abb2bf' },
    { suffix: 'syntax-strikethrough-color', default: 'inherit' },
    { suffix: 'syntax-strikethrough-text-decoration', default: 'line-through' },
    { suffix: 'syntax-string-color', default: '#98c379' },
    { suffix: 'syntax-string-special-color', default: 'inherit' },
    { suffix: 'syntax-strong-color', default: 'inherit' },
    { suffix: 'syntax-strong-font-weight', default: '600' },
    { suffix: 'syntax-url-color', default: '#aaaaaa', light: '#666666' },
    { suffix: 'syntax-code-color', default: '#aaaaaa', light: '#666666' },
    { suffix: 'syntax-code-background', default: '#f3f4f6', light: '#f3f4f6' },
    { suffix: 'toolbar-group-spacing', default: '2rem' },
    { suffix: 'toolbar-item-spacing', default: '0' },
  ]

  return styles.map((style): CSSPropery => {
    const value = mode === 'light' ? style.light : style.default

    // return `--jotx-editor-internal-${style.suffix}: var(--jotx-${style.suffix}, ${value});`

    const k = `--jotx-editor-internal-${style.suffix}`
    const s = {}
    s[k] = `var(--jotx-${style.suffix}, ${value})`
    return s
  })
}
