import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { tags } from '@lezer/highlight';
import JotxUI from '/types/ui';
import { isDark } from '/src/ui/utils';
import { JotxInternal } from '/types';

export const theme = (): Extension => {
  const extension = syntaxHighlighting(
    HighlightStyle.define([
      // ordered by lowest to highest precedence
      {
        tag: tags.atom,
        color: `var(--jotxe-internal-syntax-atom-color)`
      },
      {
        tag: tags.meta,
        color: 'var(--jotxe-internal-syntax-meta-color)'
      },
      // emphasis types
      {
        tag: tags.emphasis,
        color: 'var(--jotxe-internal-syntax-emphasis-color)',
        fontStyle: 'var(--jotxe-internal-syntax-emphasis-font-style)'
      },
      {
        tag: tags.strong,
        color: 'var(--jotxe-internal-syntax-strong-color)',
        fontWeight: 'var(--jotxe-internal-syntax-strong-font-weight)'
      },
      {
        tag: tags.strikethrough,
        color: 'var(--jotxe-internal-syntax-strikethrough-color)',
        textDecoration: 'var(--jotxe-internal-syntax-strikethrough-text-decoration)'
      },
      // comment group
      {
        tag: tags.comment,
        color: 'var(--jotxe-internal-syntax-comment-color)',
        fontStyle: 'var(--jotxe-internal-syntax-comment-font-style)'
      },
      // monospace
      {
        tag: tags.monospace,
        color: 'var(--jotxe-internal-syntax-code-color)',
        background: 'var(--jotxe-internal-syntax-code-background)',
        fontFamily: 'var(--jotxe-internal-syntax-code-font-family)'
      },
      // name group
      {
        tag: tags.name,
        color: 'var(--jotxe-internal-syntax-name-color)'
      },
      {
        tag: tags.labelName,
        color: 'var(--jotxe-internal-syntax-name-label-color)'
      },
      {
        tag: tags.propertyName,
        color: 'var(--jotxe-internal-syntax-name-property-color)'
      },
      {
        tag: tags.definition(tags.propertyName),
        color: 'var(--jotxe-internal-syntax-name-property-definition-color)'
      },
      {
        tag: tags.variableName,
        color: 'var(--jotxe-internal-syntax-name-variable-color)'
      },
      {
        tag: tags.definition(tags.variableName),
        color: 'var(--jotxe-internal-syntax-name-variable-definition-color)'
      },
      {
        tag: tags.local(tags.variableName),
        color: 'var(--jotxe-internal-syntax-name-variable-local-color)'
      },
      {
        tag: tags.special(tags.variableName),
        color: 'var(--jotxe-internal-syntax-name-variable-special-color)'
      },
      // headings
      {
        tag: tags.heading,
        color: 'var(--jotxe-internal-syntax-heading-color)',
        fontWeight: 'var(--jotxe-internal-syntax-heading-font-weight)'
      },
      {
        tag: tags.heading1,
        color: 'var(--jotxe-internal-syntax-heading1-color)',
        fontSize: 'var(--jotxe-internal-syntax-heading1-font-size)',
        fontWeight: 'var(--jotxe-internal-syntax-heading1-font-weight)'
      },
      {
        tag: tags.heading2,
        color: 'var(--jotxe-internal-syntax-heading2-color)',
        fontSize: 'var(--jotxe-internal-syntax-heading2-font-size)',
        fontWeight: 'var(--jotxe-internal-syntax-heading2-font-weight)'
      },
      {
        tag: tags.heading3,
        color: 'var(--jotxe-internal-syntax-heading3-color)',
        fontSize: 'var(--jotxe-internal-syntax-heading3-font-size)',
        fontWeight: 'var(--jotxe-internal-syntax-heading3-font-weight)'
      },
      {
        tag: tags.heading4,
        color: 'var(--jotxe-internal-syntax-heading4-color)',
        fontSize: 'var(--jotxe-internal-syntax-heading4-font-size)',
        fontWeight: 'var(--jotxe-internal-syntax-heading4-font-weight)'
      },
      {
        tag: tags.heading5,
        color: 'var(--jotxe-internal-syntax-heading5-color)',
        fontSize: 'var(--jotxe-internal-syntax-heading5-font-size)',
        fontWeight: 'var(--jotxe-internal-syntax-heading5-font-weight)'
      },
      {
        tag: tags.heading6,
        color: 'var(--jotxe-internal-syntax-heading6-color)',
        fontSize: 'var(--jotxe-internal-syntax-heading6-font-size)',
        fontWeight: 'var(--jotxe-internal-syntax-heading6-font-weight)'
      },
      // contextual tag types
      {
        tag: tags.keyword,
        color: 'var(--jotxe-internal-syntax-keyword-color)'
      },
      {
        tag: tags.number,
        color: 'var(--jotxe-internal-syntax-number-color)'
      },
      {
        tag: tags.operator,
        color: 'var(--jotxe-internal-syntax-operator-color)'
      },
      {
        tag: tags.punctuation,
        color: 'var(--jotxe-internal-syntax-punctuation-color)'
      },
      {
        tag: tags.link,
        color: 'var(--jotxe-internal-syntax-link-color)'
      },
      {
        tag: tags.url,
        color: 'var(--jotxe-internal-syntax-url-color)'
      },
      // string group
      {
        tag: tags.string,
        color: 'var(--jotxe-internal-syntax-string-color)'
      },
      {
        tag: tags.special(tags.string),
        color: 'var(--jotxe-internal-syntax-string-special-color)'
      },
      // processing instructions
      {
        tag: tags.processingInstruction,
        color: 'var(--jotxe-internal-syntax-processing-instruction-color)'
      }
    ])
  );

  return [extension];
};

export const themeStyles = (state: JotxInternal.State): string[] => {
  const styles: JotxUI.Style[] = [
    // block
    { suffix: 'block-background-color', default: '#121212', light: '#f5f5f5' },
    { suffix: 'block-background-color-on-hover', default: '#0f0f0f', light: '#e0e0e0' },
    { suffix: 'block-max-height', default: '20rem' },
    { suffix: 'block-padding', default: '0.5rem' },
    // code
    { suffix: 'code-background-color', default: 'var(--jotxe-internal-block-background-color)' },
    { suffix: 'code-color', default: 'inherit' },
    { suffix: 'code-font-family', default: "'Monaco', Courier, monospace" },
    // editor
    { suffix: 'editor-font-size', default: '1em' },
    { suffix: 'editor-line-height', default: '2em' },
    { suffix: 'editor-padding', default: '0.5rem' },
    { suffix: 'inline-padding', default: '0.125rem' },
    // modal
    { suffix: 'modal-position', default: 'fixed' },
    // syntax
    { suffix: 'syntax-atom-color', default: '#d19a66' },
    { suffix: 'syntax-comment-color', default: '#abb2bf' },
    { suffix: 'syntax-comment-font-style', default: 'italic' },
    { suffix: 'syntax-emphasis-color', default: 'inherit' },
    { suffix: 'syntax-emphasis-font-style', default: 'italic' },
    { suffix: 'syntax-hashtag-background-color', default: '#222', light: '#eee' },
    { suffix: 'syntax-hashtag-color', default: 'inherit' },
    { suffix: 'syntax-heading-color', default: 'inherit' },
    { suffix: 'syntax-heading-font-weight', default: '600' },
    {
      suffix: 'syntax-heading1-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)'
    },
    { suffix: 'syntax-heading1-font-size', default: '1.6em' },
    { suffix: 'syntax-heading1-font-weight', default: '600' },
    {
      suffix: 'syntax-heading2-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)'
    },
    { suffix: 'syntax-heading2-font-size', default: '1.5em' },
    { suffix: 'syntax-heading2-font-weight', default: '600' },
    {
      suffix: 'syntax-heading3-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)'
    },
    { suffix: 'syntax-heading3-font-size', default: '1.4em' },
    { suffix: 'syntax-heading3-font-weight', default: '600' },
    {
      suffix: 'syntax-heading4-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)'
    },
    { suffix: 'syntax-heading4-font-size', default: '1.3em' },
    { suffix: 'syntax-heading4-font-weight', default: '600' },
    {
      suffix: 'syntax-heading5-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)'
    },
    { suffix: 'syntax-heading5-font-size', default: '1.2em' },
    { suffix: 'syntax-heading5-font-weight', default: '600' },
    {
      suffix: 'syntax-heading6-color',
      default: 'var(--jotxe-internal-syntax-heading-color, inherit)'
    },
    { suffix: 'syntax-heading6-font-size', default: '1.1em' },
    { suffix: 'syntax-heading6-font-weight', default: '600' },
    { suffix: 'syntax-highlight-background-color', default: '#555555' },
    { suffix: 'syntax-keyword-color', default: '#c678dd' },
    { suffix: 'syntax-link-color', default: 'inherit' },
    { suffix: 'syntax-meta-color', default: '#abb2bf' },
    { suffix: 'syntax-monospace-color', default: 'var(--jotxe-internal-code-color)' },
    { suffix: 'syntax-monospace-font-family', default: 'var(--jotxe-internal-code-font-family)' },
    { suffix: 'syntax-name-color', default: '#d19a66' },
    { suffix: 'syntax-name-label-color', default: '#abb2bf' },
    { suffix: 'syntax-name-property-color', default: '#96c0d8' },
    { suffix: 'syntax-name-property-definition-color', default: '#e06c75' },
    { suffix: 'syntax-name-variable-color', default: '#e06c75' },
    { suffix: 'syntax-name-variable-definition-color', default: '#e5c07b' },
    { suffix: 'syntax-name-variable-local-color', default: '#d19a66' },
    { suffix: 'syntax-name-variable-special-color', default: 'inherit' },
    { suffix: 'syntax-number-color', default: '#d19a66' },
    { suffix: 'syntax-operator-color', default: '#96c0d8' },
    { suffix: 'syntax-processing-instruction-color', default: '#444444', light: '#bbbbbb' },
    { suffix: 'syntax-punctuation-color', default: '#abb2bf' },
    { suffix: 'syntax-strikethrough-color', default: 'inherit' },
    { suffix: 'syntax-strikethrough-text-decoration', default: 'line-through' },
    { suffix: 'syntax-string-color', default: '#98c379' },
    { suffix: 'syntax-string-special-color', default: 'inherit' },
    { suffix: 'syntax-strong-color', default: 'inherit' },
    { suffix: 'syntax-strong-font-weight', default: '600' },
    { suffix: 'syntax-url-color', default: '#aaaaaa', light: '#666666' },
    { suffix: 'syntax-code-color', default: '#aaaaaa', light: '#666666' },
    { suffix: 'syntax-code-background', default: '#f3f4f6', light: '#f3f4f6' },
    { suffix: 'toolbar-group-spacing', default: '2rem' },
    { suffix: 'toolbar-item-spacing', default: '0' }
  ];

  const isLight = !isDark(state.options.interface.appearance);

  return styles.map((style) => {
    const value = isLight && style.light ? style.light : style.default;

    return `--jotxe-internal-${style.suffix}: var(--jotxe-${style.suffix}, ${value});`;
  });
};
