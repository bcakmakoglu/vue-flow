import type { GraphNode, XYPosition } from '@vue-flow/core'

export type Direction = 'TB' | 'BT' | 'LR' | 'RL'

export interface UpdateParams {
  node: GraphNode
  nextPos: XYPosition
}

export interface LayoutOptions {
  offset?: Partial<XYPosition>
  direction?: Direction
  onBeforeUpdate?: (params: UpdateParams[]) => UpdateParams[] | false
  onUpdated?: () => void
}
