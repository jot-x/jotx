import { Component, For, ParentComponent, createSignal } from 'solid-js'
import { CoreProviders, ProvidersProps } from './providers'
import { Route, Router, Routes } from '@solidjs/router'

type Props = ProvidersProps & {
  initialRoutes: { path: string; component: Component }[]
}

export const CoreUI: Component<Props> = (props) => {
  const [routes, setRoutes] = createSignal<{ path: string; component: Component }[]>(props.initialRoutes)

  return (
    <CoreProviders initialSettings={props.initialSettings} initialTree={props.initialTree}>
      <Router>
        <Routes>
          <For each={routes()}>{(r) => <Route path={r.path} component={r.component} />}</For>
        </Routes>
      </Router>
    </CoreProviders>
  )
}
