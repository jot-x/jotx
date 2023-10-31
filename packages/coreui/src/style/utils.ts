import { CssStyles } from './types'

export function convertCssStylesToString(cssStyles: CssStyles[]): string {
  const styleMap: Record<string, Record<string, string>> = {}

  cssStyles.forEach((cssStyle) => {
    if (!styleMap[cssStyle.selector]) {
      styleMap[cssStyle.selector] = {}
    }

    cssStyle.styles.forEach((style) => {
      Object.entries(style).forEach(([key, value]) => {
        const selector = styleMap[cssStyle.selector]
        if (selector) {
          selector[key] = value
        }
      })
    })
  })

  let cssString = ''

  for (const selector in styleMap) {
    cssString += `${selector} {\n`
    for (const property in styleMap[selector]) {
      cssString += `  ${property}: ${styleMap[selector]?.[property]};\n`
    }
    cssString += '}\n'
  }

  return cssString
}
