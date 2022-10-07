import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  retries: 2,
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
