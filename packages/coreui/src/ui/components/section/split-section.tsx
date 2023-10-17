import { JSX, splitProps } from 'solid-js'
import { ParentComponentWithID } from '../../parent-component-id'
import { SectionDirection } from '../../types'
import { Section, SectionProps } from './section'

/**
 * Lays out its children one after another with a vertical or horizontal direction
 */
const SplitSection: ParentComponentWithID<SectionProps> = (props) => {
  return (
    <Section data-type="split" {...props}>
      {props.children}
    </Section>
  )
}

export default SplitSection
