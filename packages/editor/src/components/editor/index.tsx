import { useStore } from '../../ui/app';
import { override } from '../../utils/merge';
import { makeEditor } from '../../vendor/editor';
import type { Component } from 'solid-js';

/**
 * Editor component
 *
 * @returns A {@link Component} that renders an editor
 */
export const Editor: Component = () => {
  // for tree-shaking
  if (import.meta.env.VITE_SSR) {
    return (
      <div class="cm-editor">
        <div class="cm-scroller">
          <div class="cm-content" contenteditable={true}>
            <div class="cm-line">
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [state, setState] = useStore();
  const editor = makeEditor([state, setState]);

  // set editor in state
  setState(override(state(), { editor }));

  return editor.dom;
};
