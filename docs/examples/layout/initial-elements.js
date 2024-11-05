const position = { x: 0, y: 0 }
const nodeType = 'process'

export const initialNodes = [
  {
    id: '1',
    position,
    type: nodeType,
  },
  {
    id: '2',
    position,
    type: nodeType,
  },
  {
    id: '2a',
    position,
    type: nodeType,
  },
  {
    id: '2b',
    position,
    type: nodeType,
  },
  {
    id: '2c',
    position,
    type: nodeType,
  },
  {
    id: '2d',
    position,
    type: nodeType,
  },
  {
    id: '3',
    position,
    type: nodeType,
  },
  {
    id: '4',
    position,
    type: nodeType,
  },
  {
    id: '5',
    position,
    type: nodeType,
  },
  {
    id: '6',
    position,
    type: nodeType,
  },
  {
    id: '7',
    position,
    type: nodeType,
  },
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-2a', source: '2', target: '2a', animated: true },
  { id: 'e2-2b', source: '2', target: '2b', animated: true },
  { id: 'e2-2c', source: '2', target: '2c', animated: true },
  { id: 'e2c-2d', source: '2c', target: '2d', animated: true },
  { id: 'e3-7', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e5-7', source: '5', target: '7', animated: true },
]
