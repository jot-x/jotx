import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import devtools from 'solid-devtools/vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    // devtools(),
    externalizeDeps(),
    dts({
      rollupTypes: true,
      entryRoot: resolve(__dirname, 'src')
    }),
    solidPlugin()
  ],
  server: {
    port: 3000
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'JotxEditor',
      formats: ['es'],
      fileName: 'client'
    },
    target: 'esnext'
  },
  resolve: {
    conditions: ['browser', 'node', 'solid']
  }
});
