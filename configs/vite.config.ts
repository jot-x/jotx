import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
// @ts-ignore
import unocssPlugin from 'unocss/vite'

export default defineConfig({
  plugins: [unocssPlugin(), , solidPlugin()],
  build: {
    target: 'esnext',
  },
})
