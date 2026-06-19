import type { Edge } from '@vue-flow/core';

export interface ProcessEdgeData extends Record<string, unknown> {
  isAnimating?: boolean;
}

export type ProcessEdge = Edge<ProcessEdgeData, 'process'>;
