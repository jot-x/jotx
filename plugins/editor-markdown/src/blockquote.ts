import { syntaxTree } from '@codemirror/language'
import { RangeSetBuilder, type Extension } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { Decoration, ViewPlugin } from '@codemirror/view'
import { EditorExtensionCreatorProps } from '@jotx/editor'
import { createCompartmentExtension } from '../../../tmp/plugin/src-chaos/code/createCompartmentExtension'

const blockquoteSyntaxNodes = ['Blockquote']

const blockquoteDecoration = Decoration.line({ attributes: { class: 'cm-blockquote' } })
const blockquoteOpenDecoration = Decoration.line({ attributes: { class: 'cm-blockquote-open' } })
const blockquoteCloseDecoration = Decoration.line({ attributes: { class: 'cm-blockquote-close' } })

export function createBlackQuote({ view, addStyles }: EditorExtensionCreatorProps) {
  addStyles(
    {
      selector: '.jotx-editor .cm-line.cm-blockquote',
      styles: [
        { 'background-color': 'var(--jotx-editor-internal-block-background-color)' },
        { 'border-left': '0.25rem solid currentColor' },
        { padding: '0 var(--jotx-internal-block-padding)' },
      ],
    },
    {
      selector: '.jotx-editor .cm-line.cm-blockquote.cm-blockquote-open',
      styles: [
        { 'border-top-left-radius': 'var(--jotx-editor-internal-border-radius)' },
        {
          'border-top-right-radius': 'var(--jotx-editor-internal-border-radius)',
        },
        {
          'padding-top': 'var(--jotx-editor-internal-block-padding)',
        },
      ],
    },
    {
      selector: '.jotx-editor .cm-line.cm-blockquote.cm-blockquote-close',
      styles: [
        { 'border-bottom-left-radius': 'var(--jotx-internal-border-radius)' },
        {
          'border-bottom-right-radius': 'var(--jotx-internal-border-radius)',
        },
        {
          'padding-bottom': 'var(--jotx-internal-block-padding)',
        },
      ],
    },
  )
  return createCompartmentExtension(blockquote(), view)
}

export const blockquote = (): Extension => {
  return [blockquotePlugin]
}

const blockquotePlugin = ViewPlugin.define(
  (view: EditorView) => {
    return {
      update: () => {
        return decorate(view)
      },
    }
  },
  { decorations: (plugin) => plugin.update() },
)

const decorate = (view: EditorView) => {
  const builder = new RangeSetBuilder<Decoration>()
  const tree = syntaxTree(view.state)

  for (const visibleRange of view.visibleRanges) {
    for (let position = visibleRange.from; position < visibleRange.to; ) {
      const line = view.state.doc.lineAt(position)

      tree.iterate({
        enter({ type, from, to }) {
          if (type.name !== 'Document') {
            if (blockquoteSyntaxNodes.includes(type.name)) {
              builder.add(line.from, line.from, blockquoteDecoration)

              const openLine = view.state.doc.lineAt(from)
              const closeLine = view.state.doc.lineAt(to)

              if (openLine.number === line.number) builder.add(line.from, line.from, blockquoteOpenDecoration)

              if (closeLine.number === line.number) builder.add(line.from, line.from, blockquoteCloseDecoration)

              return false
            }
          }
        },
        from: line.from,
        to: line.to,
      })

      position = line.to + 1
    }
  }

  return builder.finish()
}
