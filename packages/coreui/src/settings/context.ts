import { makePersisted } from '@solid-primitives/storage'
import { createContext, useContext } from 'solid-js'
import { createStore, unwrap } from 'solid-js/store'
import { SettingProperty, Settings } from './types'

export const makeSettingsContext = (initilaSettings: Settings[]) => {
  const [settings, setSettings] = makePersisted(createStore<Settings[]>(initilaSettings), { name: 'jotx_settings' })

  const setSetting = (path: string, value: any) => {
    setSettings(
      (set) => !!set.properties[path],
      (s: Settings) => {
        const z = JSON.parse(JSON.stringify(s))
        z.properties[path].value = value
        return z
      },
    )
  }

  const getSetting = (path: string): SettingProperty | undefined => {
    const sts = unwrap(settings)
    const set = sts.filter((s) => s.properties[path])
    if (set.length) {
      return set[0]?.properties[path]
    }

    return undefined
  }

  // `as const` forces tuple type inference
  return { settings, setSetting, getSetting } as const
}

export type SettingsContextType = ReturnType<typeof makeSettingsContext>
export const SettingsContext = createContext<SettingsContextType>()
export const useSettings = () => useContext(SettingsContext)!
