import type {
  EditorState as VendorState,
  StateEffect as VendorStateEffect,
  Transaction as VendorTransaction,
  Compartment as VendorCompartment,
  Extension as VendorExtension
} from '@codemirror/state';
import type { EditorView as VendorView } from '@codemirror/view';
import { Accessor, Setter } from 'solid-js';
import { Queue } from '../utils/queue';
import * as Jotx from '../types/jotx';

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
     * extensions extends the functionality of the editor
     */
    extensions: Array<JotxInternal.Extension | JotxInternal.LazyExtension>;
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

  // ---
  // extensions related
  // ---

  /**
   * An extension enhances the functionality of the editor
   */
  export interface Extension {
    compartment: JotxInternal.Vendor.Compartment;
    initialValue: (store: JotxInternal.Store) => JotxInternal.Vendor.Extension;
    reconfigure: (
      store: JotxInternal.Store
    ) =>
      | Promise<JotxInternal.Vendor.StateEffect<unknown>>
      | JotxInternal.Vendor.StateEffect<unknown>;
  }

  /**
   * An extension that affects the editor
   */
  export interface LazyExtension {
    compartment: JotxInternal.Vendor.Compartment;
    initialValue: (store: JotxInternal.Store) => JotxInternal.Vendor.Extension;
    reconfigure: (store: JotxInternal.Store) => Promise<JotxInternal.Vendor.StateEffect<unknown>>;
  }

  /**
   * Given a store and compartment, return a side effect to reconfigure the editor
   */
  export type LazyExtensionResolver = (
    store: JotxInternal.Store,
    compartment: JotxInternal.Vendor.Compartment
  ) => Promise<JotxInternal.Vendor.StateEffect<unknown>>;

  /**
   * Given app store, returns an extension
   */
  export type ExtensionResolver = (store: JotxInternal.Store) => JotxInternal.Vendor.Extension;
  export type ExtensionResolvers = ExtensionResolver[];
  export type LazyExtensionResolvers = LazyExtensionResolver[];

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

    // ---
    // extensions related
    // ---

    /**
     * State effects can be used to represent additional effects associated with a tx.
     */
    export type StateEffect<Type> = VendorStateEffect<Type>;

    /**
     * Can be used to make a configuratio dynamic.
     */
    export type Compartment = VendorCompartment;

    /**
     * Extension values can be provided when creating a state to attach various
     * kinds of configuration and behavio information.
     */
    export type Extension = VendorExtension;
  }
}

export default JotxInternal;
