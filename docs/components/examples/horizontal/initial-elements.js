import { MarkerType, Position } from '@braks/vue-flow'

export const initialElements = [
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'output',
    label: 'Node 2',
    position: { x: 250, y: 0 },
    targetPosition: Position.Left,
  },
  { id: '3', label: 'Node 3', position: { x: 250, y: 100 }, sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: '4', label: 'Node 4', position: { x: 500, y: 150 }, sourcePosition: Position.Right, targetPosition: Position.Left },
  {
    id: '5',
    type: 'output',
    label: 'Node 5',
    position: { x: 750, y: 50 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', markerEnd: MarkerType.Arrow },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' },
  },
  { id: 'e3-4', source: '3', target: '4' },
]
