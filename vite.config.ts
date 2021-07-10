import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RevueFlow'
    },
    sourcemap: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vue-demi'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        },
        dir: 'dist',
        sourcemap: true,
        exports: 'named'
      },
      inlineDynamicImports: true
    },
    commonjsOptions: {
      include: 'node_modules/**'
    },
    polyfillDynamicImport: true
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ]
});
