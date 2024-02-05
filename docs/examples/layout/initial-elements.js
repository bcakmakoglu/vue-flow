const position = { x: 0, y: 0 }

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    label: 'Start',
    position,
  },
  {
    id: '2',
    label: 'Process 1',
    position,
  },
  {
    id: '2a',
    label: 'Process 2a',
    position,
  },
  {
    id: '2b',
    type: 'output',
    label: 'Process 2b',
    position,
  },
  {
    id: '2c',
    label: 'Process 2c',
    position,
  },
  {
    id: '2d',
    label: 'Process 2d',
    position,
  },
  {
    id: '3',
    label: 'Process 3',
    position,
  },
  {
    id: '4',
    type: 'input',
    label: 'Start',
    position,
  },
  {
    id: '5',
    label: 'Process 5',
    position,
  },
  {
    id: '6',
    type: 'output',
    label: 'Process 6',
    position,
  },
  { id: '7', label: 'Process 7', position },
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true },
  { id: 'e2-2a', source: '2', target: '2a', type: 'smoothstep', animated: true },
  { id: 'e2-2b', source: '2', target: '2b', type: 'smoothstep', animated: true },
  { id: 'e2-2c', source: '2', target: '2c', type: 'smoothstep', animated: true },
  { id: 'e2c-2d', source: '2c', target: '2d', type: 'smoothstep', animated: true },
  { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', animated: true },
  { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', animated: true },
  { id: 'e5-7', source: '5', target: '7', type: 'smoothstep', animated: true },
]
