import type dagre from 'dagre'
import type { Ref } from 'vue'

export type Direction = 'TB' | 'BT' | 'LR' | 'RL'

export interface UseDagreState {
  layout: (direction?: Direction) => void
  dagreGraph: dagre.graphlib.Graph
  direction: Ref<Direction | undefined>
}
