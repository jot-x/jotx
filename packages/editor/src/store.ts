import { createSignal } from 'solid-js';
import { createElement } from './ui/utils';
import { createExtensions } from './extensions';
import { makeQueue } from './utils/queue';
import JotxInternal from './types/internal';
import { Options } from './types/jotx';
import { override } from './utils/merge';
import { RecursivePartial } from './types/ts';
import * as JotxValues from './types/values';

export const blankState = (): JotxInternal.State => {
  const options = {
    doc: '',
    hooks: {
      afterUpdate: () => {},
      beforeUpdate: () => {}
    },
    plugins: [],
    interface: {
      appearance: JotxValues.Appearance.Auto
    }
  };

  return {
    doc: '',
    editor: {} as JotxInternal.Editor,
    root: createElement(),
    target: createElement(),
    workQueue: makeQueue(),
    extensions: createExtensions(),
    options
  };
};

export const makeState = (
  partialState: RecursivePartial<JotxInternal.State>
): JotxInternal.State => {
  return override(blankState(), partialState);
};

export const makeStore = (
  options: RecursivePartial<Options>,
  overrides: RecursivePartial<JotxInternal.State> = {}
): JotxInternal.Store => {
  const [state, setState] = createSignal(
    makeState({ ...overrides, doc: options.doc || '', options })
  );

  return [state, setState];
};
