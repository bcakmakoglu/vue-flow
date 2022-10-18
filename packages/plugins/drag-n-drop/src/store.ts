import { DragNDropState } from './types'

declare module '@vue-flow/core' {
  interface StoreBase {
    dragNDrop: DragNDropState
  }
}
