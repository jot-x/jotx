export type SettingPropertyType = string | string[]

export interface SettingProperty {
  type: SettingPropertyType
  default: any
  value: any
  description: string
  enum?: string[]
  enumDescriptions?: string[]
}

export interface Settings {
  title: string
  properties: Record<string, SettingProperty>
}
