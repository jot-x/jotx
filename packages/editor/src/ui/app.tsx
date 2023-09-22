import { createContext, useContext } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import { blankState } from '../store';
import JotxInternal from '../types/internal';
import { Root } from './root';

/**
 * AppContext to pass application's state across app's component tree.
 *
 * @see https://docs.solidjs.com/references/concepts/state-management/context
 */
const AppContext = createContext<JotxInternal.Store>([
  () => blankState(),
  (value) => (typeof value === 'function' ? value(blankState()) : value)
]);

/**
 * The Provider component is used to provide a value for all components that are descendants of the Provider.
 */
const AppProvider: Component<{ children: JSX.Element; store: JotxInternal.Store }> = (props) => {
  return <AppContext.Provider value={props.store}>{props.children}</AppContext.Provider>;
};

/**
 * This method can be used by any component that is a descendant of the Provider to access the store.
 *
 * @returns an instance of {@link JotxInternal.Store}
 */
export const useStore = () => {
  return useContext(AppContext);
};

/**
 * App is the application {@link Component} that is mounted into the target DOM element.
 * It mainly wraps the {@link Root} component with the store provider.
 */
export const App: Component<{ store: JotxInternal.Store }> = (props) => {
  return (
    <AppProvider store={props.store}>
      <Root store={props.store} />
    </AppProvider>
  );
};
