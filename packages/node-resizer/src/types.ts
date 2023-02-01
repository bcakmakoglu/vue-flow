import type { D3DragEvent, SubjectPosition } from 'd3-drag'
import type { CSSProperties } from 'vue'

export interface ResizeEventParams {
  x: number
  y: number
  width: number
  height: number
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
  aspectRatio?: number
}

export interface NodeResizerEmits {
  (event: 'resizeStart', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
  (event: 'resize', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
  (event: 'resizeEnd', data: { event: ResizeDragEvent; params: ResizeEventParams }): void
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

export type ResizeDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>
