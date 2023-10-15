import { JSX, splitProps } from 'solid-js'
import { ParentComponentWithID } from '../../parent-component-id'
import { SectionDirection } from '../../types'
import { Section, SectionProps } from './section'

type Props = SectionProps & {
  direction?: SectionDirection
  minScreen?: 'sm' | 'md' | 'lg' | 'xl'
  class: string
  style: JSX.CSSProperties
}

/**
 * Lays out its children one after another with a vertical or horizontal direction
 */
const SplitSection: ParentComponentWithID<Props> = (props) => {
  const [_, other] = splitProps(props, [])

  // css`
  //   div {
  //     display: ${props.minScreen !== undefined ? 'none' : 'flex'};
  //     flex-direction: ${props.direction ?? 'row'};
  //     border: 1px gray dashed;
  //   }
  // `

  return (
    <Section data-type="split" {...other}>
      {props.children}
    </Section>
  )
}

export default SplitSection
