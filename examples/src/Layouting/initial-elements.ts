import { Elements, XYPosition } from '@braks/vue-flow'

const position: XYPosition = { x: 0, y: 0 }

const elements: Elements = [
  {
    id: '1',
    type: 'input',
    label: 'input',
    position,
  },
  {
    id: '2',
    label: 'node 2',
    position,
  },
  {
    id: '2a',
    label: 'node 2a',
    position,
  },
  {
    id: '2b',
    label: 'node 2b',
    position,
  },
  {
    id: '2c',
    label: 'node 2c',
    position,
  },
  {
    id: '2d',
    label: 'node 2d',
    position,
  },
  {
    id: '3',
    label: 'node 3',
    position,
  },
  {
    id: '4',
    label: 'node 4',
    position,
  },
  {
    id: '5',
    label: 'node 5',
    position,
  },
  {
    id: '6',
    type: 'output',
    label: 'output',
    position,
  },
  { id: '7', type: 'output', label: 'output', position: { x: 400, y: 450 } },
  { id: 'e12', source: '1', target: '2', type: 'smoothstep', animated: true },
  { id: 'e13', source: '1', target: '3', type: 'smoothstep', animated: true },
  { id: 'e22a', source: '2', target: '2a', type: 'smoothstep', animated: true },
  { id: 'e22b', source: '2', target: '2b', type: 'smoothstep', animated: true },
  { id: 'e22c', source: '2', target: '2c', type: 'smoothstep', animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', type: 'smoothstep', animated: true },

  { id: 'e45', source: '4', target: '5', type: 'smoothstep', animated: true },
  { id: 'e56', source: '5', target: '6', type: 'smoothstep', animated: true },
  { id: 'e57', source: '5', target: '7', type: 'smoothstep', animated: true },
]

export default elements
