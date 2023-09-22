import { themeStyles } from '../vendor/extensions/theme';
import { JotxInternal } from '/types';
import JotxUI from '/types/ui';
import * as JotxValues from '/types/values';

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

/**
 *
 * @returns true if the user's device is in dark mode
 */
export const isAutoDark = () => {
  // for tree-shaking
  if (import.meta.env.VITE_SSR) {
    // Todo: Allow user to specify a default theme for SSR.
    return true;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * return true if app is in dark mode
 * @param appearance the preferred apperance configured byt he user
 * @returns
 */
export const isDark = (appearance: string) => {
  if (appearance === JotxValues.Appearance.Dark) return true;
  if (appearance === JotxValues.Appearance.Light) return false;

  return isAutoDark();
};

/**
 * Returns all style vars of the entire app
 *
 * @param state
 * @returns
 */
export const makeVars = (state: JotxInternal.State) => {
  return [...themeStyles(state)];
};
