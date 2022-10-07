import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  retries: 2,
  defaultCommandTimeout: 1000,
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
