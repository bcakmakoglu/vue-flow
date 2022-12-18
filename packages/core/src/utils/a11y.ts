import type { XYPosition } from '~/types'

export const ARIA_NODE_DESC_KEY = 'vue-flow__node-desc'
export const ARIA_EDGE_DESC_KEY = 'vue-flow__edge-desc'

export const elementSelectionKeys = ['Enter', ' ', 'Escape']

export const arrowKeyDiffs: Record<string, XYPosition> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}
