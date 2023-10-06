const { defu } = require('defu')
const vue = require('@vitejs/plugin-vue')

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
      vue({
        reactivityTransform: true,
      }),
    ],
  })
}

module.exports = {
  withConfig,
}
