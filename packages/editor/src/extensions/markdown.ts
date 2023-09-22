import { markdown as markdownExtension, markdownLanguage } from '@codemirror/lang-markdown';
import { languages as baseLanguages } from '@codemirror/language-data';
import { Compartment } from '@codemirror/state';
import { type MarkdownExtension } from '@lezer/markdown';
import { buildVendorUpdates } from '/src/extensions';
import { filterPlugins, partitionPlugins } from '/src/utils/options';
import { type JotxInternal, type Options, PluginType } from '/types';

const makeExtension = ([state, setState]: JotxInternal.Store) => {
  const baseExtensions = [] as MarkdownExtension[];
  const [lazyExtensions, extensions] = filterExtensions(state().options);
  const [lazyLanguages, languages] = filterLanguages(state().options);

  if (Math.max(lazyExtensions.length, lazyLanguages.length) > 0) {
    state().workQueue.enqueue(async () => {
      const effects = await buildVendorUpdates([state, setState]);

      state().editor.dispatch({ effects });
    });
  }

  return markdownExtension({
    base: markdownLanguage,
    codeLanguages: [...baseLanguages, ...languages],
    extensions: [...baseExtensions, ...extensions]
  });
};

const filterExtensions = (options: Options) => {
  return partitionPlugins(filterPlugins(PluginType.Grammar, options));
};

const filterLanguages = (options: Options) => {
  return partitionPlugins(filterPlugins(PluginType.Language, options));
};

const updateExtension = async ([state]: JotxInternal.Store) => {
  const baseExtensions = [] as MarkdownExtension[];
  const extensions = await Promise.all(filterPlugins(PluginType.Grammar, state().options));
  const languages = await Promise.all(filterPlugins(PluginType.Language, state().options));

  return markdownExtension({
    base: markdownLanguage,
    codeLanguages: [...baseLanguages, ...languages],
    extensions: [...baseExtensions, ...extensions]
  });
};

/**
 * Markdown extension extends the editor with Markdown parser
 *
 * @returns
 */
export const markdown = (): JotxInternal.Extension => {
  const compartment = new Compartment();

  return {
    compartment,
    initialValue: (store: JotxInternal.Store) => {
      return compartment.of(makeExtension(store));
    },
    reconfigure: async (store: JotxInternal.Store) => {
      return compartment.reconfigure(await updateExtension(store));
    }
  };
};
