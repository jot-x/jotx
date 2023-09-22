import { Component } from 'solid-js';
import JotxInternal from '../../types/internal';
import { useStore } from '../app';
import { override } from '../../utils/merge';
import { Editor } from '../../components/editor';
import { getHydrationMarkerProps } from '../../constants';
import { Styles } from './styles';

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
    <div class="jotxe" ref={setRoot} {...getHydrationMarkerProps()}>
      <Styles />
      <div class="jotx-editor">
        <Editor />
      </div>
    </div>
  );
};
