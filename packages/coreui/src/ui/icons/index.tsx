import { IconifyIconProps, Icon as SolidIcon } from '@iconify-icon/solid'
import { Component } from 'solid-js'

export const Icon: Component<IconifyIconProps> = (props) => {
  return <SolidIcon {...props} />
}
