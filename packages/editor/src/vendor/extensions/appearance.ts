import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';

/**
 * Creates a theme extension
 * @param isDark true if in dark mode
 * @returns a theme extension
 */
export const appearance = (isDark: boolean): Extension => {
  return [EditorView.theme({}, { dark: isDark })];
};
