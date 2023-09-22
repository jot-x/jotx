import { buildVendorUpdates } from '/src/extensions';
import { override } from '/src/utils/merge';
import type * as Jotx from '/types/jotx';
import type InkInternal from '/types/internal';
import { RecursivePartial } from '/types/ts';

export const reconfigure = async (
  [state, setState]: InkInternal.Store,
  options: RecursivePartial<Jotx.Options>
) => {
  const { workQueue } = state();

  return workQueue.enqueue(async () => {
    setState(override(state(), { options }));
    const effects = await buildVendorUpdates([state, setState]);

    state().editor.dispatch({ effects });
  });
};
