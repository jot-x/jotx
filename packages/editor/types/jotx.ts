import { type CompletionSource } from '@codemirror/autocomplete';
import { type LanguageDescription } from '@codemirror/language';
import { type MarkdownConfig } from '@lezer/markdown';
import { type Extension } from '@codemirror/state';
import type * as JotxeValues from './values';

export type Awaitable<T> = T & Promise<T>;
export type AwaitableInstance = Awaitable<Instance>;

/**
 * Application instance
 *
 * Contains the application API such editing actions and lifecycle.
 */
export interface Instance {
  destroy: () => void;
}

/**
 * Application options that can be provided by the consumer to configure and extends the editor.
 */
export interface Options {
  // the doc content that is edited by the editor
  doc: string;
  // possible app hooks
  hooks: Required<Options.Hooks>;
  // plugins are the extensions that can be provided by the user
  plugins: Options.RecursivePlugin[];
  // UI related
  interface: Required<Options.Interface>;
}

export namespace Options {
  export interface Hooks {
    afterUpdate: (doc: string) => void;
    beforeUpdate: (doc: string) => void;
  }

  export interface Extensions {
    [JotxeValues.Extensions.Appearance]: EnumString<JotxeValues.Appearance>;
  }

  /**
   * Options related to the UI interface such theme, toolbar, etc.
   */
  export interface Interface {
    // configure the appearance of the app
    [JotxeValues.Extensions.Appearance]: Options.Extensions[JotxeValues.Extensions.Appearance];
  }

  // ---
  // plugins related
  // ---

  // An editor plugin
  export type Plugin = Plugins.Completion | Plugins.Default | Plugins.Grammar | Plugins.Language;
  export type RecursivePlugin = Plugin | RecursivePlugin[];
}

export type EnumString<T extends string> = `${T}`;

export type VendorCompletion = CompletionSource;
export type VendorExtension = Extension;
export type VendorGrammar = MarkdownConfig;
export type VendorLanguage = LanguageDescription;

export namespace Plugins {
  export interface Completion {
    key?: string;
    type: EnumString<JotxeValues.PluginType.Completion>;
    value: VendorCompletion | Promise<VendorCompletion>;
  }

  export interface Default {
    key?: string;
    type: EnumString<JotxeValues.PluginType.Default>;
    value: VendorExtension | Promise<VendorExtension>;
  }

  /**
   * A grammar plugin
   *
   * @see https://github.com/codemirror/lang-markdown#user-content-markdown^config.extensions
   */
  export interface Grammar {
    key?: string;
    type: EnumString<JotxeValues.PluginType.Grammar>;
    value: VendorGrammar | Promise<VendorGrammar>;
  }

  /**
   * A language plugin
   *
   * @see https://github.com/codemirror/lang-markdown#user-content-markdown^config.codelanguages
   */
  export interface Language {
    key?: string;
    type: EnumString<JotxeValues.PluginType.Language>;
    value: VendorLanguage | Promise<VendorLanguage>;
  }
}

export namespace Values {
  export type Appearance = EnumString<JotxeValues.Appearance>;
  export type Extensions = EnumString<JotxeValues.Extensions>;
  export type PluginType = EnumString<JotxeValues.PluginType>;
}
