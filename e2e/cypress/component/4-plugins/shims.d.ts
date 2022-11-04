import * as VF from '@vue-flow/core'

declare module '@vue-flow/core' {
  interface StoreBase {
    testProp: string
    testAction: () => boolean
  }
}
