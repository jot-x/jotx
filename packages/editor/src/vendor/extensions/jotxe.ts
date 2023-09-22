import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const classExtensions = () => {
  return [
    EditorView.editorAttributes.of({
      class: 'jotxe-container'
    }),
    EditorView.contentAttributes.of({
      class: 'jotxe-editor-content'
    })
  ];
};

export const jotxe = (): Extension => {
  return [...classExtensions()];
};
