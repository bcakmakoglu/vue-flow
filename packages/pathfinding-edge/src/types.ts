import type { EdgeProps, Position } from '@vue-flow/core'
import type { CSSProperties } from 'vue'
import type { ArrowOptions } from 'perfect-arrows'

export interface PathFindingEdgeProps extends EdgeProps<never> {
  id: string
  source: string
  target: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  animated?: boolean
  sourcePosition: Position
  targetPosition: Position
  label?: EdgeProps['label']
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties
  markerEnd?: string
  markerStart?: string
  sourceHandleId?: string
  targetHandleId?: string
}

export interface PerfectArrowProps {
  id: string
  source: string
  target: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  selected?: boolean
  animated?: boolean
  sourcePosition: Position
  targetPosition: Position
  label?: EdgeProps['label']
  labelStyle?: any
  labelShowBg?: boolean
  labelBgStyle?: any
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  style?: CSSProperties
  markerEnd?: string
  markerStart?: string
  sourceHandleId?: string
  targetHandleId?: string
  options?: ArrowOptions
}
