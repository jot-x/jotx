import { ParentComponent } from 'solid-js'
import { CoreProviders, ProvidersProps } from './providers'

type Props = ProvidersProps & {}

export const CoreUI: ParentComponent<Props> = (props) => (
  <CoreProviders initialSettings={props.initialSettings} initialTree={props.initialTree}>
    {props.children}
  </CoreProviders>
)
