import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['*', '.ts', '.vue'],
  },
  build: {
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue-flow',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      plugins: [
        replace({
          __VUE_FLOW_VERSION__: JSON.stringify(pkg.version),
          preventAssignment: true,
        }),
      ],
      output: {
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
    vue(),
    svgLoader(), // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
})
