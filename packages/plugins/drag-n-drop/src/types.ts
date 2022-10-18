import type { DefaultNodeTypes, XYPosition } from '@vue-flow/core'
import type { ComponentPublicInstance, Ref } from 'vue'

export type DragNodeType<CustomType extends string = any> = keyof DefaultNodeTypes | CustomType

export interface OnDragStartEventData<CustomType extends string = any> {
  event: DragEvent
  type: DragNodeType<CustomType>
}

export interface OnDropData<CustomType extends string = any> {
  event: DragEvent
  type: DragNodeType<CustomType>
  position: XYPosition
}

export interface DragNDropState<CustomType extends string = any> {
  container: Ref<HTMLElement | ComponentPublicInstance | null>
  nodeType: Ref<DragNodeType<CustomType> | undefined>
  handleDragStart: (event: DragEvent, type: DragNodeType<CustomType>) => void
  handleDragOver: (event: DragEvent) => void
  handleDrop: (event: DragEvent) => void
  onDragStart: (callback: (data: OnDragStartEventData<CustomType>) => void) => void
  onDragOver: (callback: (event: DragEvent) => void) => void
  onDrop: (callback: (data: OnDropData<CustomType>) => void) => void
}
