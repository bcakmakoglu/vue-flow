import { VueFlowApp } from '~/utils/vueFlowApp'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vueFlow: VueFlowApp
  }
}
