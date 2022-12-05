import type dagre from 'dagre'

export type Direction = 'TB' | 'BT' | 'LR' | 'RL'

export interface UseDagreState {
  layout: (direction: Direction) => void
  dagreGraph: dagre.graphlib.Graph
}
