import type { Edge, Node } from '@vue-flow/core'
import { MarkerType } from '@vue-flow/core'

export enum ExtendedMarkerType {
  Diamond = 'Diamond',
  Circle = 'Circle',
  Square = 'Square'
}

export const initialNodes: Node[] = [
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 0 } },
  { id: '2', label: 'Node 2', position: { x: 150, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 0, y: 200 } },
]

export const initialEdges: Edge[] = [
  {
    id: 'e1-2', source: '1', target: '2', type: 'smoothstep', class: 'normal-edge',
    markerEnd: {
      type: ExtendedMarkerType.Square,
      color: 'hotpink',
      fill: '#38bdf8', // sky
      strokeWidth: 1.5,
    },
    markerStart: {
      type: ExtendedMarkerType.Diamond,
      color: 'hotpink',
      fill: '#38bdf8', // sky
      strokeWidth: 1.5,
    },
    style: { stroke: 'hotpink', strokeWidth: 2 },
  },
  {
    id: 'e2-2a', source: '2', target: '3', type: 'smoothstep',
    markerEnd: {
      type: ExtendedMarkerType.Circle,
      color: 'hotpink',
      fill: 'purple',
      strokeWidth: 1.5,
    },
    markerStart: {
      type: MarkerType.Arrow,
      color: 'hotpink',
      strokeWidth: 1.5,
    },
    style: { stroke: 'hotpink', strokeWidth: 2 },
  }
]
