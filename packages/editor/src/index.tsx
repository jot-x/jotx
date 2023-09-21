import { render as solidRender } from 'solid-js/web';
import { makeInstance } from './instance';
import { makeStore } from './store';
import type * as Jotx from '/types/jotx';
import { App } from './ui/app';
import { HYDRATION_MARKER_SELECTOR } from './constants';

/**
 *
 * @param target the DOM element where the app mounts to
 * @param options app's options
 *
 * @returns an instance of {@link Jotx.AwaitableInstance}
 */
export const hydrate = (
  target: HTMLElement,
  options: Partial<Jotx.Options> = {}
): Jotx.AwaitableInstance => {
  const store = makeStore(options);

  if (!import.meta.env.VITE_SSR) {
    // todo implement hydration rendering
  }

  return makeInstance(store);
};

/**
 * The entrypoint function to render the app
 *
 * to instantiate a new editor, run:
 * ```
 * import { jotxe } from '@jotx/editor';
 * jotxe(document.querySelector('#root')!);
 *
 * ```
 * @param target
 * @param options
 * @returns
 */
export const jotxe = (
  target: HTMLElement,
  options: Partial<Jotx.Options> = {}
): Jotx.AwaitableInstance => {
  const hasHydrationMarker = !!target.querySelector(HYDRATION_MARKER_SELECTOR);

  if (hasHydrationMarker) {
    return hydrate(target, options);
  }

  return render(target, options);
};

/**
 * Renders the app in the client
 *
 * @param target
 * @param options
 * @returns
 */
export const render = (
  target: HTMLElement,
  options: Partial<Jotx.Options> = {}
): Jotx.AwaitableInstance => {
  const store = makeStore(options);

  if (!import.meta.env.VITE_SSR) {
    solidRender(() => <App store={store} />, target);
  }

  return makeInstance(store);
};

export default jotxe;
