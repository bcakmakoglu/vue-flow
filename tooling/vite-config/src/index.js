const { defu } = require('defu')
const vue = require('@vitejs/plugin-vue')
const AutoImport = require('unplugin-auto-import/vite')
const VueMacros = require('unplugin-vue-macros/vite')

function withConfig(viteConfig) {
  return defu(viteConfig, {
    // https://vitejs.dev/config/
    resolve: {
      extensions: ['.ts', '.vue'],
    },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue', '@vue-flow/core'],
        output: {
          dir: './dist',
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            'vue': 'Vue',
            '@vue-flow/core': 'VueFlowCore',
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
        imports: ['vue', 'vue/macros'],
        dts: 'src/auto-imports.d.ts',
      }),
    ],
  })
}

module.exports = {
  withConfig,
}
