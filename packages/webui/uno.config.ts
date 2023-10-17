import presetUno from '@unocss/preset-uno'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      jotx: {
        primary: 'hsl(0 0% 98%)',
      },
    },
  },
})
