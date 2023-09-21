import { EditorView } from '@codemirror/view';
import { makeState } from '/src/vendor/state';
import type JotxInternals from '/types/internal';

/**
 * Creates a new {@link JotxInternals.Editor} instance instance
 *
 * @param param0 app's state
 * @returns
 */
export const makeEditor = ([state, setState]: JotxInternals.Store): JotxInternals.Editor => {
  const editor = new EditorView({
    dispatch: (transaction: JotxInternals.Vendor.Transaction) => {
      const { options } = state();
      const newDoc = transaction.newDoc.toString();

      // options.hooks.beforeUpdate(newDoc);
      editor.update([transaction]);

      if (transaction.docChanged) {
        setState({ ...state(), doc: newDoc });

        // options.hooks.afterUpdate(newDoc);
      }
    },
    state: makeState([state, setState])
  });

  return editor;
};
