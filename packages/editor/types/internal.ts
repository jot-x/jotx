import type {
  Transaction as VendorTransaction,
  EditorState as VendorState
} from '@codemirror/state';
import type { EditorView as VendorView } from '@codemirror/view';
import { Accessor, Setter } from 'solid-js';
import { Queue } from '/src/utils/queue';
import * as Jotx from '/types/jotx';

/**
 * Internal interfaces of jotx editor
 */
export namespace JotxInternal {
  /**
   * Editor represents the editor's UI.
   */
  export type Editor = JotxInternal.Vendor.View;

  /**
   * Store is the API to get and set the app state.
   */
  export type Store = [get: StoreStateGetter, set: StoreStateSetter];
  export type StoreStateGetter = Accessor<JotxInternal.State>;
  export type StoreStateSetter = Setter<JotxInternal.State>;

  /**
   * The application state
   */
  export interface State {
    /**
     * The document content edited by the editor
     */
    doc: string;
    /**
     * A reference to the editor view
     */
    editor: JotxInternal.Editor;
    /**
     * App configuration options
     */
    options: Jotx.Options;
    /**
     * the DOM element of the Root component.
     */
    root: HTMLElement;
    /**
     * the DOM element that the entire app mounts to.
     */
    target: HTMLElement;
    /**
     * a queue of promises, used to run some tasks related to the editor
     */
    workQueue: Queue;
  }

  /**
   * Encapsulates vendor specific interfaces.
   */
  export namespace Vendor {
    /**
     * Represents the editor's UI. It hold the editable DOM surface,
     * and possibly other elements such as th line number gutter.
     * It handles events and dispatches stat transactions for editing actions.
     */
    export type View = VendorView;
    /**
     * Transaction groups multiple document changes made by the user in the editor.
     */
    export type Transaction = VendorTransaction;

    /**
     * An immutable data structure containing the editor's state.
     * State updates creates a transaction, which produces a new state instance.
     */
    export type State = VendorState;
  }
}

export default JotxInternal;
