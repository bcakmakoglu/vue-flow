import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import AutoImport from 'unplugin-auto-import/vite'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

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
      formats: ['iife'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-core',
      name: 'VueFlowCore',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        format: 'iife',
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
      hoistStatic: false,
      setupBlock: false,
      shortEmits: false,
      defineModel: false,
      definePropsRefs: false,
      setupComponent: false,
      setupSFC: false,
      exportProps: false,
      plugins: {
        vue: vue({
          reactivityTransform: true,
        }),
      },
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue/macros'],
      dirs: ['./src/utils/**', './src/composables/**', './src/context/**', './src/store/**', './src/components/Edges/utils/**'],
      dts: 'src/auto-imports.d.ts',
    }),
    replace({
      __ENV__: 'production',
      __VUE_FLOW_VERSION__: JSON.stringify(pkg.version),
      preventAssignment: true,
    }),
  ],
})
