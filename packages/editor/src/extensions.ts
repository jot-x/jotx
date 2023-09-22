import { Compartment } from '@codemirror/state';
import { isAutoDark } from './ui/utils';
import { filterPlugins, partitionPlugins } from './utils/options';
import { markdown } from './extensions/markdown';
import { appearance } from './vendor/extensions/appearance';
import { JotxInternal } from '../types';
import { Appearance, PluginType } from '../types/values';

/**
 * Builds a list of extensions that can be used directly by the vendor
 * @param param0 app's state
 * @returns a list of extensions
 */
export const buildVendors = ([state, setState]: JotxInternal.Store) => {
  const extensions = state().extensions.map((e) => e.initialValue([state, setState]));

  return extensions;
};

/**
 * returns a list of update effects that can reconfigure the vendor
 *
 * @param param0 app's state
 */
export const buildVendorUpdates = async ([state, setState]: JotxInternal.Store) => {
  const effects = await Promise.all(
    state().extensions.map(async (extension) => {
      return await extension.reconfigure([state, setState]);
    })
  );

  return effects;
};

/**
 * creates a list of extensions by a resolver
 *
 * @param resolver the resolved
 */
export const extension = (resolver: JotxInternal.ExtensionResolver): JotxInternal.Extension => {
  const compartment = new Compartment();

  return {
    compartment,
    initialValue: (store: JotxInternal.Store) => {
      return compartment.of(resolver(store));
    },
    reconfigure: (store: JotxInternal.Store) => {
      return compartment.reconfigure(resolver(store));
    }
  };
};

/**
 * creates a list of {@link LazyExtension} by a lazy resolver
 *
 * @param resolver the resolved
 */
export const lazyExtension = (
  reconfigure: JotxInternal.LazyExtensionResolver
): JotxInternal.LazyExtension => {
  const compartment = new Compartment();

  return {
    compartment,
    initialValue: () => {
      return compartment.of([]);
    },
    reconfigure: (store: JotxInternal.Store) => {
      return reconfigure(store, compartment);
    }
  };
};

export const resolvers: JotxInternal.ExtensionResolvers = [
  ([state]: JotxInternal.Store) => {
    const [_lazyExtensions, extensions] = partitionPlugins(
      filterPlugins(PluginType.Default, state().options)
    );

    return extensions;
  },
  ([state]: JotxInternal.Store) => {
    const isDark = state().options.interface.appearance === Appearance.Dark;
    const isAuto = state().options.interface.appearance === Appearance.Auto;
    const extension = appearance(isDark || (isAuto && isAutoDark()));

    return extension;
  }
];

export const lazyResolvers: JotxInternal.LazyExtensionResolvers = [];

/**
 * The entry point to create a list of all extensions
 *
 * @returns a list of {@link JotxInternal.Extension}
 */
export const createExtensions = () => {
  return [
    markdown(),
    ...resolvers.map((r) => extension(r)),
    ...lazyResolvers.map((r) => lazyExtension(r))
  ];
};
