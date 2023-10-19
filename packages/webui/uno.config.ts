import presetUno from '@unocss/preset-uno'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      jotx: {
        primary: '#0f172a',
        secondary: '#f4f4f5',
      },
    },
  },
})
