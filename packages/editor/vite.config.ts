import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // devtools(),
    solidPlugin()
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '/': resolve(__dirname, './'),
      '@jotx/editor': resolve(__dirname, './src/index')
    },
    conditions: ['browser', 'node', 'solid']
  }
});
