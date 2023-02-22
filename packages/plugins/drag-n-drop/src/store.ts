import type { UseDragAndDrop } from './types'

declare module '@vue-flow/core' {
  interface StoreBase {
    dragNDrop: UseDragAndDrop
  }
}
