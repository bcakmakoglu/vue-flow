import type { D3DragEvent, SubjectPosition } from 'd3-drag'
import type { CSSProperties } from 'vue'

export type ResizeDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>

export type ResizeParamsWithDirection = ResizeParams & {
  direction: number[]
}

export interface ResizeParams {
  x: number
  y: number
  width: number
  height: number
}

export type ShouldResize = (event: ResizeDragEvent, params: ResizeParamsWithDirection) => boolean

export interface OnResizeStart {
  event: ResizeDragEvent
  params: ResizeParams
}

export interface OnResize {
  event: ResizeDragEvent
  params: ResizeParamsWithDirection
}

export interface OnResizeEnd {
  event: ResizeDragEvent
  params: ResizeParams
}

export interface NodeResizerProps {
  nodeId?: string
  color?: string
  handleClassName?: string
  handleStyle?: CSSProperties
  lineClassName?: string
  lineStyle?: CSSProperties
  isVisible?: boolean
  minWidth?: number
  minHeight?: number
  shouldResize?: ShouldResize
  aspectRatio?: number
}

export interface NodeResizerEmits {
  (event: 'resizeStart', resizeEvent: OnResizeStart): void
  (event: 'resize', resizeEvent: OnResize): void
  (event: 'resizeEnd', resizeEvent: OnResizeStart): void
}

export type ControlLinePosition = 'top' | 'bottom' | 'left' | 'right'

export type ControlPosition = ControlLinePosition | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export enum ResizeControlVariant {
  Line = 'line',
  Handle = 'handle',
}

export interface ResizeControlProps {
  nodeId?: string
  color?: string
  minWidth?: number
  minHeight?: number
  position?: ControlPosition
  variant?: ResizeControlVariant
  shouldResize?: ShouldResize
  aspectRatio? : number
}

export interface ResizeControlLineProps {
  nodeId?: string
  color?: string
  minWidth?: number
  minHeight?: number
  variant?: ResizeControlVariant
  position?: ControlLinePosition
  aspectRatio?: number
}
