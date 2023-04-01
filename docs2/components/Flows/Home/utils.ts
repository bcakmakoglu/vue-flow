import type { Edge, Node } from '@vue-flow/core'

export const initialEdges: Edge[] = [
  {
    id: 'eintro-examples',
    sourceHandle: 'a',
    source: 'intro',
    target: 'examples',
    animated: true,
    type: 'smoothstep',
    style: { strokeWidth: 4, stroke: '#ef467e' },
  },
  {
    id: 'eintro-documentation',
    sourceHandle: 'a',
    source: 'intro',
    target: 'documentation',
    animated: true,
    type: 'smoothstep',
    style: { strokeWidth: 4, stroke: '#f97316' },
  },
  {
    id: 'eintro-acknowledgement',
    sourceHandle: 'a',
    source: 'intro',
    target: 'acknowledgement',
    animated: true,
    type: 'smoothstep',
    style: { strokeWidth: 4, stroke: '#0ea5e9' },
  },
]

export const mobileEdges: Edge[] = [
  {
    id: 'eintro-examples',
    sourceHandle: 'a',
    source: 'intro',
    target: 'examples',
    animated: true,
    style: { strokeWidth: 4, stroke: '#ef467e' },
  },
  {
    id: 'eexamples-documentation',
    source: 'examples',
    target: 'documentation',
    animated: true,
    style: { strokeWidth: 4, stroke: '#f97316' },
  },
  {
    id: 'edocumentation-acknowledgement',
    source: 'documentation',
    target: 'acknowledgement',
    animated: true,
    style: { strokeWidth: 4, stroke: '#0ea5e9' },
  },
]

export const initialNodes: Node[] = [
  { id: 'intro', type: 'intro', position: { x: 0, y: 0 } },
  { id: 'examples', type: 'examples', position: { x: -50, y: 400 } },
  { id: 'documentation', type: 'documentation', position: { x: 300, y: 400 } },
  { id: 'acknowledgement', type: 'acknowledgement', position: { x: 150, y: 500 } },
]
