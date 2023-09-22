import { history, defaultKeymap } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import JotxInternal from '../types/internal';
import { buildVendors } from '../extensions';
import { theme, lineWrapping, jotxe, blockquote, code } from './extensions';
import { keymap } from '@codemirror/view';

/**
 * Create the vendor state
 *
 * @param param0 app state
 * @returns vendor's state
 */
export const makeState = ([state, setState]: JotxInternal.Store): JotxInternal.Vendor.State => {
  return EditorState.create({
    doc: state().options.doc,
    extensions: [
      keymap.of([...defaultKeymap]),
      history(),
      theme(),
      jotxe(),
      lineWrapping(),
      blockquote(),
      code(),
      ...buildVendors([state, setState])
    ]
  });
};
