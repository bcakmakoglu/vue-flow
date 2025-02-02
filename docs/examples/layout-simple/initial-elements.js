const position = { x: 0, y: 0 }

export const initialNodes = [
  {
    id: '1',
    position,
    data: {
      label: 'Node 1',
    },
  },
  {
    id: '2',
    position,
    data: {
      label: 'Node 2',
    },
  },
  {
    id: '2a',
    position,
    data: {
      label: 'Node 2a',
    },
  },
  {
    id: '2b',
    position,
    data: {
      label: 'Node 2b',
    },
  },
  {
    id: '2c',
    position,
    data: {
      label: 'Node 2c',
    },
  },
  {
    id: '2d',
    position,
    data: {
      label: 'Node 2d',
    },
  },
  {
    id: '3',
    position,
    data: {
      label: 'Node 3',
    },
  },
  {
    id: '4',
    position,
    data: {
      label: 'Node 4',
    },
  },
  {
    id: '5',
    position,
    data: {
      label: 'Node 5',
    },
  },
  {
    id: '6',
    position,
    data: {
      label: 'Node 6',
    },
  },
  {
    id: '7',
    position,
    data: {
      label: 'Node 7',
    },
  },
]

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-2a', source: '2', target: '2a' },
  { id: 'e2-2b', source: '2', target: '2b' },
  { id: 'e2-2c', source: '2', target: '2c' },
  { id: 'e2c-2d', source: '2c', target: '2d' },
  { id: 'e3-7', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e5-7', source: '5', target: '7' },
]
