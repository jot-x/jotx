export type Awaitable<T> = T & Promise<T>;
export type AwaitableInstance = Awaitable<Instance>;

/**
 * Application instance
 *
 * Contains the application API such editing actions and lifecycle.
 */
export interface Instance {
  destroy: () => void;
}

/**
 * Application options that can be provided by the consumer to configure and extends the editor.
 */
export interface Options {
  // the doc content that is edited by the editor
  doc: string;
  hooks: Required<Options.Hooks>;
}

export namespace Options {
  export interface Hooks {
    afterUpdate: (doc: string) => void;
    beforeUpdate: (doc: string) => void;
  }
}
