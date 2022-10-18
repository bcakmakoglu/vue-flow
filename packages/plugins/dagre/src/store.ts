import type { UseDagreState } from './types'

declare module '@vue-flow/core' {
  interface StoreBase {
    dagre: UseDagreState
  }
}
