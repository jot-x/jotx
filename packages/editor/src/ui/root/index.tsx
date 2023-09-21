import { Component } from 'solid-js';
import JotxInternal from '/types/internal';
import { useStore } from '../app';
import { override } from '/src/utils/merge';
import { Editor } from '/src/components/editor';
import { getHydrationMarkerProps } from '/src/constants';

/**
 * The main component wrapping the editor, toolbar, etc.
 *
 * @returns The root {@link Component}
 */
export const Root: Component<{ store: JotxInternal.Store }> = () => {
  const [state, setState] = useStore();
  const setRoot = (root: HTMLElement) => {
    setState(override(state(), { root }));
  };

  return (
    <div class="jotx jotxe" ref={setRoot} {...getHydrationMarkerProps()}>
      <div class="jotx-editor">
        <Editor />
      </div>
    </div>
  );
};
