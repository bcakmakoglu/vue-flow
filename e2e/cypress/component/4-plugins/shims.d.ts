import * as VF from '@vue-flow/core'

declare module '@vue-flow/core' {
  interface StoreBase {
    testId: string
    testAction: (num: number) => number
  }
}
