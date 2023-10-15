import { unwrap } from 'solid-js/store'
import { SettingProperty } from '../../settings/types'
import { TreeNode } from '../../workspace/types'
import { AnyProps } from '../types'

const exprRegex = /^\{(.+?)(?:\|\|(.+?))?\}$/

export function resolveProps(node: TreeNode, getSetting: (path: string) => SettingProperty | undefined) {
  const nodeProps = unwrap(node.props)
  if (!nodeProps) {
    return {}
  }

  const props: AnyProps = {}

  for (const key in nodeProps) {
    let val = nodeProps[key]
    if (typeof val === 'string') {
      const match = val.match(exprRegex)
      if (match && match[1]?.startsWith('settings.')) {
        const exp = match[1].trim()
        const def = match[2]
        const prop = getSetting(exp.substring('settings.'.length, exp.length))
        val = prop ? prop.value || prop.default : def
      }
    }

    props[key] = val
  }

  return props
}
