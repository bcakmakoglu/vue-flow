import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import svgLoader from 'vite-svg-loader'
import pkg from './package.json'

export default defineConfig({
  resolve: {
    extensions: ['.ts', '.vue'],
  },
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'vue-flow-core',
      name: 'VueFlowCore',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      // we bundle @vueuse/core on purpose; its prebuilt dist ships `#__PURE__` annotations in
      // positions Rolldown can't read, so drop that third-party-only noise (keep our own warnings)
      onwarn(warning, warn) {
        if (
          warning.code === 'INVALID_ANNOTATION' &&
          (warning.id?.includes('node_modules') || warning.message?.includes('node_modules'))
        ) {
          return
        }
        warn(warning)
      },
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
    vue(),
    svgLoader(),
    replace({
      __ENV__: 'process.env.NODE_ENV',
      __VUE_FLOW_VERSION__: JSON.stringify(pkg.version),
      preventAssignment: true,
    }) as any,
  ],
})
