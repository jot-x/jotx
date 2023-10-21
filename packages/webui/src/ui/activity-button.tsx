import { Activation, useBusContext } from '@jotx/coreui'
import { Component } from 'solid-js'
import { Icon } from '@iconify-icon/solid'

const ActivityButton: Component<{ icon: string; activation: Activation }> = (props) => {
  const [bus] = useBusContext()

  const onClick = () => {
    bus().activation.emit(props.activation)
  }

  return (
    <button class="inline-block cursor-pointer bg-jotx-primary text-secondary" onClick={onClick}>
      <Icon icon={`${props.icon}`} width="1.5rem" height="1.5rem" />
    </button>
  )
}

export default ActivityButton
