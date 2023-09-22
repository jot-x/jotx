import { history } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import JotxInternal from '/types/internal';
import { buildVendors } from '../extensions';
import { theme } from './extensions/theme';

/**
 * Create the vendor state
 *
 * @param param0 app state
 * @returns vendor's state
 */
export const makeState = ([state, setState]: JotxInternal.Store): JotxInternal.Vendor.State => {
  return EditorState.create({
    doc: state().options.doc,
    extensions: [history(), theme(), ...buildVendors([state, setState])]
  });
};