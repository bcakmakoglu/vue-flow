import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueTypes from 'vite-plugin-vue-type-imports'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve('src'),
    },
    extensions: ['.ts', '.vue'],
  },
  build: {
    minify: 'esbuild',
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs', 'iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-core',
      name: 'vueFlowCore',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        format: 'esm',
        dir: './dist',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    VueMacros({
      betterDefine: true,
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
      },
    }),
    vueTypes(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue/macros'],
      dirs: ['./src/utils/**', './src/composables/**', './src/context/**', './src/store/**', './src/components/Edges/utils/**'],
      dts: 'src/auto-imports.d.ts',
    }),
    replace({
      __ENV__: 'process.env.NODE_ENV',
      __VUE_FLOW_VERSION__: JSON.stringify(pkg.version),
      preventAssignment: true,
    }),
  ],
})
