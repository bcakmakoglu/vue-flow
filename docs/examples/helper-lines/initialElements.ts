import type { Edge, Node } from '@vue-flow/core'

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    style: { width: '200px', height: '100px', backgroundColor: '#D6E4F0' },
    data: { label: 'Move me around' },
  },
  {
    id: '2',
    position: { x: 400, y: 300 },
    style: { width: '220px', height: '400px', backgroundColor: '#5CD882' },
    data: { label: 'Move me around' },
  },
  {
    id: '3',
    position: { x: -55, y: 220 },
    style: { width: '125px', height: '220px', backgroundColor: '#F6E5E5' },
    data: { label: 'Move me around' },
  },
  {
    id: '4',
    position: { x: 250, y: -200 },
    style: { width: '180px', height: '180px', backgroundColor: '#FF0071' },
    data: { label: 'Move me around' },
  },
  {
    id: '5',
    position: { x: -120, y: 500 },
    style: { width: '300px', height: '120px', backgroundColor: '#FBC2EB' },
    data: { label: 'Move me around' },
  },
]

export const initialEdges: Edge[] = []
