import type { Edge } from '@vue-flow/core'

export type ProcessEdgeData = {
  isAnimating?: boolean
}

export type ProcessEdge = Edge<ProcessEdgeData, 'process'>
