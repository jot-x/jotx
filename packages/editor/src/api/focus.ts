import type JotxInternal from '/types/internal';

export const focus = ([state]: JotxInternal.Store) => {
  const { editor } = state();

  if (!editor.hasFocus) {
    editor.focus();
  }
};
