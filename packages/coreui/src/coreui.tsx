import { MultiProvider } from '@solid-primitives/context'
import { Route, Router, Routes } from '@solidjs/router'
import { Component, Context, ContextProviderComponent, FlowComponent, For } from 'solid-js'
import { PrimaryCommandsDialog } from './comands-dialog'
import { CoreProviders, ProvidersProps } from './providers'
import { useRouting } from './routing/context'
import { Styles } from './style/styles'

type ExtraProvidersType<T extends readonly [unknown?, ...unknown[]]> = {
  [K in keyof T]:
    | readonly [Context<T[K]> | ContextProviderComponent<T[K]>, [T[K]][T extends unknown ? 0 : never]]
    | FlowComponent
}

type Props = ProvidersProps & {
  extraProviders: ExtraProvidersType<[any]>
}

export const CoreUI: Component<Props> = (props) => {
  return (
    <CoreProviders
      initialSettings={props.initialSettings}
      initialTree={props.initialTree}
      initialComponents={props.initialComponents}
      initialPlugins={props.initialPlugins}
      initialCommands={props.initialCommands}
      initialRoutes={props.initialRoutes}
      registerPlugin={props.registerPlugin}
    >
      <MultiProvider values={props.extraProviders}>
        <Styles />
        <PrimaryCommandsDialog class="jotx" />
        <Router>
          <Routes>
            <RegisterRoutes />
          </Routes>
        </Router>
      </MultiProvider>
    </CoreProviders>
  )
}

const RegisterRoutes: Component = (props) => {
  const [routes] = useRouting()
  return <For each={routes}>{(r) => <Route path={r.path} component={r.component} />}</For>
}
