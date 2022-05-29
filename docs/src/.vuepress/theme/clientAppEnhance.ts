import { defineClientConfig } from '@vuepress/client'
import VueAnimXyz from '@animxyz/vue3'

export default defineClientConfig({
  enhance({ app, router, siteData }){
    app.use(VueAnimXyz)
  },
  setup(){},
  rootComponents: [],
})
