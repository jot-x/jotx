import { render as solidRender } from 'solid-js/web';
// see https://github.com/qmhc/vite-plugin-dts/issues/269#issuecomment-1724683011
import type * as Jotx from './types/jotx';
export * from './types/jotx';
import { RecursivePartial } from './types/ts';
import { HYDRATION_MARKER_SELECTOR } from './constants';
import { makeInstance } from './instance';
import { makeStore } from './store';
import { App } from './ui/app';

/**
 *
 * @param target the DOM element where the app mounts to
 * @param options app's options
 *
 * @returns an instance of {@link Jotx.AwaitableInstance}
 */
export const hydrate = (
  target: HTMLElement,
  options: RecursivePartial<Jotx.Options> = {}
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
  options: RecursivePartial<Jotx.Options> = {}
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
  options: RecursivePartial<Jotx.Options> = {}
): Jotx.AwaitableInstance => {
  const store = makeStore(options);

  if (!import.meta.env.VITE_SSR) {
    solidRender(() => <App store={store} />, target);
  }

  return makeInstance(store);
};

export default jotxe;
export const defineOptions = <T extends RecursivePartial<Jotx.Options>>(options: T) => options;
export const defineConfig = <T extends Jotx.Options>(config: T) => config;
export const definePlugin = <T extends Jotx.Options.RecursivePlugin>(plugin: T) => plugin;
