import type { Position } from '@vue-flow/core'

export interface NodeToolbarProps {
  nodeId?: string | string[]
  isVisible?: boolean
  position?: Position
  offset?: number
  align?: 'center' | 'start' | 'end'
}

export type Align = 'center' | 'start' | 'end'
