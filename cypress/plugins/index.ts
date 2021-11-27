import { resolve } from 'path'
import { startDevServer } from '@cypress/vite-dev-server'

export default ((on, config) => {
  on('dev-server:start', async (options) =>
    startDevServer({
      options,
      viteConfig: {
        configFile: resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    }),
  )

  return config
}) as Cypress.PluginConfig
