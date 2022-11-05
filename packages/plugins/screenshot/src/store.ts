import type { UseScreenshot } from './types'

declare module '@vue-flow/core' {
  interface StoreBase {
    screenshot: UseScreenshot
  }
}
