import type { Dimensions, ElementData, Position } from '@vue-flow/core'
import type { MoveableProps } from 'vue3-moveable'
import type { CSSProperties } from 'vue'

export interface ResizeRotateNodeEmits {
  (event: 'updateNodeInternals'): void
  (event: 'resize', dimensions: Dimensions): void
  (event: 'rotate', rotation: number): void
}

export interface ResizeRotateNodeData extends ElementData {
  rotate: number
  translate: number[]
  dimensions: Dimensions
  style: CSSProperties
}

export interface ResizeRotateNodeProps {
  id: string
  label: string
  targetPosition: Position
  sourcePosition: Position
  resizable?: boolean
  rotatable?: boolean
  data: ResizeRotateNodeData
  moveableProps?: MoveableProps
}
