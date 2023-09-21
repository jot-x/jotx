import JotxUI from '/types/ui';

/**
 * Creates new DOM elements
 *
 * @returns An instance of {@link JotxUI.Element}
 */
export const createElement = (): JotxUI.Element => {
  // for tree-shaking.
  if (import.meta.env.VITE_SSR) {
    return {} as JotxUI.Element;
  }

  return document.createElement('div');
};
