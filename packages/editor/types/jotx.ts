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
  doc: string;
}
