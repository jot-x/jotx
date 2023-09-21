import { destroy } from './api/destroy';
import JotxInternal from '/types/internal';
import * as Jotx from '/types/jotx';
import { awaitable } from '/src/utils/awaitable';

/**
 * Creates a new instance of {@link Jotx.Instance}
 *
 * @param store Store
 * @returns a new instance
 */
export const makeInstance = (store: JotxInternal.Store): Jotx.AwaitableInstance => {
  const instance = {
    destroy: destroy.bind(undefined, store)
  };

  return awaitable(instance, (resolve, reject) => {
    try {
      const [state] = store;

      // Ensure all other queued tasks are finished before resolving.
      state().workQueue.enqueue(() => resolve(instance));
    } catch (error: any) {
      reject(error);
    }
  });
};
