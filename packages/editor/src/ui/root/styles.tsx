import { createEffect, createSignal, onMount, type Component } from 'solid-js';
import styles from './styles.css?inline';
import { useStore } from '../app';
import { buildVendorUpdates } from '/src/extensions';
import { makeVars } from '../utils';

/**
 * A component that configures the app's styles
 */
export const Styles: Component = () => {
  const [state, setState] = useStore();
  const [vars, setVars] = createSignal(makeVars(state()));

  createEffect(() => {
    setVars(makeVars(state()));
  });

  onMount(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (_event: MediaQueryListEvent) => {
      const { editor, root, workQueue } = state();

      if (root.isConnected) {
        workQueue.enqueue(async () => {
          const effects = await buildVendorUpdates([state, setState]);

          editor.dispatch({ effects });
          setVars(makeVars(state()));
        });
      } else {
        mediaQueryList.removeEventListener('change', listener);
      }
    };

    mediaQueryList.addEventListener('change', listener);
  });

  return <style textContent={`.jotxe {\n  ${vars().join('\n  ')}\n}\n${styles}`} />;
};
