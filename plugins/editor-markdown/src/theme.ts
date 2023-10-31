import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorExtensionCreatorProps, createCompartmentExtension } from '@jotx/editor'
import { tags } from '@lezer/highlight'

const SPEC = [
  // ordered by lowest to highest precedence
  {
    tag: tags.atom,
    color: `var(--jotx-editor-internal-syntax-atom-color)`,
  },
  {
    tag: tags.meta,
    color: 'var(--jotx-editor-internal-syntax-meta-color)',
  },
  // emphasis types
  {
    tag: tags.emphasis,
    color: 'var(--jotx-editor-internal-syntax-emphasis-color)',
    fontStyle: 'var(--jotx-editor-internal-syntax-emphasis-font-style)',
  },
  {
    tag: tags.strong,
    color: 'var(--jotx-editor-internal-syntax-strong-color)',
    fontWeight: 'var(--jotx-editor-internal-syntax-strong-font-weight)',
  },
  {
    tag: tags.strikethrough,
    color: 'var(--jotx-editor-internal-syntax-strikethrough-color)',
    textDecoration: 'var(--jotx-editor-internal-syntax-strikethrough-text-decoration)',
  },
  // comment group
  {
    tag: tags.comment,
    color: 'var(--jotx-editor-internal-syntax-comment-color)',
    fontStyle: 'var(--jotx-editor-internal-syntax-comment-font-style)',
  },
  // monospace
  {
    tag: tags.monospace,
    color: 'var(--jotx-editor-internal-syntax-code-color)',
    background: 'var(--jotx-editor-internal-syntax-code-background)',
    fontFamily: 'var(--jotx-editor-internal-syntax-code-font-family)',
  },
  // name group
  {
    tag: tags.name,
    color: 'var(--jotx-editor-internal-syntax-name-color)',
  },
  {
    tag: tags.labelName,
    color: 'var(--jotx-editor-internal-syntax-name-label-color)',
  },
  {
    tag: tags.propertyName,
    color: 'var(--jotx-editor-internal-syntax-name-property-color)',
  },
  {
    tag: tags.definition(tags.propertyName),
    color: 'var(--jotx-editor-internal-syntax-name-property-definition-color)',
  },
  {
    tag: tags.variableName,
    color: 'var(--jotx-editor-internal-syntax-name-variable-color)',
  },
  {
    tag: tags.definition(tags.variableName),
    color: 'var(--jotx-editor-internal-syntax-name-variable-definition-color)',
  },
  {
    tag: tags.local(tags.variableName),
    color: 'var(--jotx-editor-internal-syntax-name-variable-local-color)',
  },
  {
    tag: tags.special(tags.variableName),
    color: 'var(--jotx-editor-internal-syntax-name-variable-special-color)',
  },
  // headings
  {
    tag: tags.heading,
    color: 'var(--jotx-editor-internal-syntax-heading-color)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading-font-weight)',
  },
  {
    tag: tags.heading1,
    color: 'var(--jotx-editor-internal-syntax-heading1-color)',
    fontSize: 'var(--jotx-editor-internal-syntax-heading1-font-size)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading1-font-weight)',
  },
  {
    tag: tags.heading2,
    color: 'var(--jotx-editor-internal-syntax-heading2-color)',
    fontSize: 'var(--jotx-editor-internal-syntax-heading2-font-size)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading2-font-weight)',
  },
  {
    tag: tags.heading3,
    color: 'var(--jotx-editor-internal-syntax-heading3-color)',
    fontSize: 'var(--jotx-editor-internal-syntax-heading3-font-size)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading3-font-weight)',
  },
  {
    tag: tags.heading4,
    color: 'var(--jotx-editor-internal-syntax-heading4-color)',
    fontSize: 'var(--jotx-editor-internal-syntax-heading4-font-size)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading4-font-weight)',
  },
  {
    tag: tags.heading5,
    color: 'var(--jotx-editor-internal-syntax-heading5-color)',
    fontSize: 'var(--jotx-editor-internal-syntax-heading5-font-size)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading5-font-weight)',
  },
  {
    tag: tags.heading6,
    color: 'var(--jotx-editor-internal-syntax-heading6-color)',
    fontSize: 'var(--jotx-editor-internal-syntax-heading6-font-size)',
    fontWeight: 'var(--jotx-editor-internal-syntax-heading6-font-weight)',
  },
  // contextual tag types
  {
    tag: tags.keyword,
    color: 'var(--jotx-editor-internal-syntax-keyword-color)',
  },
  {
    tag: tags.number,
    color: 'var(--jotx-editor-internal-syntax-number-color)',
  },
  {
    tag: tags.operator,
    color: 'var(--jotx-editor-internal-syntax-operator-color)',
  },
  {
    tag: tags.punctuation,
    color: 'var(--jotx-editor-internal-syntax-punctuation-color)',
  },
  {
    tag: tags.link,
    color: 'var(--jotx-editor-internal-syntax-link-color)',
  },
  {
    tag: tags.url,
    color: 'var(--jotx-editor-internal-syntax-url-color)',
  },
  // string group
  {
    tag: tags.string,
    color: 'var(--jotx-editor-internal-syntax-string-color)',
  },
  {
    tag: tags.special(tags.string),
    color: 'var(--jotx-editor-internal-syntax-string-special-color)',
  },
  // processing instructions
  {
    tag: tags.processingInstruction,
    color: 'var(--jotx-editor-internal-syntax-processing-instruction-color)',
  },
]

const jotxHighlightStyle = HighlightStyle.define(SPEC)

// TODO what about theme? see https://github.com/codemirror/theme-one-dark/blob/main/src/one-dark.ts#L46
function makeTheme() {
  return syntaxHighlighting(jotxHighlightStyle)
}

export function createThemeExtension({ view }: EditorExtensionCreatorProps) {
  void createCompartmentExtension(makeTheme(), view)
}
