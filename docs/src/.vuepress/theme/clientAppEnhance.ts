import { defineClientAppEnhance } from '@vuepress/client'
import VueAnimXyz from '@animxyz/vue3'

export default defineClientAppEnhance(({ app }) => {
  app.use(VueAnimXyz)
})
