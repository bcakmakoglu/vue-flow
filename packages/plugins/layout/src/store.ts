import type { useLayout } from './layout'

declare module '@vue-flow/core' {
  interface StoreBase {
    layout: typeof useLayout
  }
}
