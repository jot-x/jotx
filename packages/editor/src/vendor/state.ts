import { history } from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import JotxInternal from '/types/internal';

export const makeState = ([state, setState]: JotxInternal.Store): JotxInternal.Vendor.State => {
  return EditorState.create({
    doc: state().options.doc,
    extensions: [history()]
  });
};
