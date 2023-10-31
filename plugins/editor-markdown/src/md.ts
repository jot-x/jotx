import { markdown as markdownExtension, markdownLanguage } from '@codemirror/lang-markdown'
import { languages as baseLanguages } from '@codemirror/language-data'
import { EditorExtensionCreatorProps, createCompartmentExtension } from '@jotx/editor'

export const makeExtension = () => {
  // const baseExtensions = [] as MarkdownExtension[]
  return markdownExtension({
    base: markdownLanguage,
    codeLanguages: baseLanguages,
    // extensions: [...baseExtensions],
  })
}

export function createMarkdownExtension({ view }: EditorExtensionCreatorProps) {
  void createCompartmentExtension(makeExtension(), view)
}
