import { type Position } from '~/types'

export interface NodeToolbarProps {
  nodeId?: string | string[]
  isVisible?: boolean
  position?: Position
  offset?: number
  align?: 'center' | 'start' | 'end'
}

export type Align = 'center' | 'start' | 'end'
