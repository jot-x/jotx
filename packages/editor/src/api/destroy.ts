import type JotxInternal from '../../types/internal';

/**
 * Destroy let you tear down the app during shutdown
 *
 * @param param0 app's state
 */
export const destroy = ([state]: JotxInternal.Store) => {
  const { editor } = state();

  // cleans the editor view
  editor.destroy();
};
