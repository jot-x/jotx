import { Route, Router, Routes } from '@solidjs/router'
import { Component, For } from 'solid-js'
import { CoreProviders, ProvidersProps } from './providers'
import { useRouting } from './routing/context'

type Props = ProvidersProps & {}

export const CoreUI: Component<Props> = (props) => {
  return (
    <CoreProviders
      initialSettings={props.initialSettings}
      initialTree={props.initialTree}
      initialComponents={props.initialComponents}
      initialPlugins={props.initialPlugins}
      initialRoutes={props.initialRoutes}
      registerPlugin={props.registerPlugin}
    >
      <Router>
        <Routes>
          <RegisterRoutes />
        </Routes>
      </Router>
    </CoreProviders>
  )
}

const RegisterRoutes: Component = (props) => {
  const [routes] = useRouting()
  return <For each={routes}>{(r) => <Route path={r.path} component={r.component} />}</For>
}
