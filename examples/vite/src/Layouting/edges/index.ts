import type { Edge } from '@vue-flow/core'

export interface ProcessEdgeData {
  isAnimating?: boolean
}

export type ProcessEdge = Edge<ProcessEdgeData, any, 'process'>
