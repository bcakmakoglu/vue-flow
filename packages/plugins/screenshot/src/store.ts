import type { UseScreenshotState } from './types'

declare module '@vue-flow/core' {
  interface StoreBase {
    screenshot: UseScreenshotState
  }
}
