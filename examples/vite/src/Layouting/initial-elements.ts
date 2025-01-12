import type { ProcessNode } from './nodes'
import type { ProcessEdge } from './edges'

const initialPos = { x: 0, y: 0 }
const type = 'process'
const data = { status: null }

export const initialNodes: ProcessNode[] = [
  {
    id: '1',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2a',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2b',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2c',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2d',
    position: initialPos,
    type,
    data,
  },
  {
    id: '3',
    position: initialPos,
    type,
    data,
  },
  {
    id: '4',
    position: initialPos,
    type,
    data,
  },
  {
    id: '5',
    position: initialPos,
    type,
    data,
  },
  {
    id: '6',
    position: initialPos,
    type,
    data,
  },
  {
    id: '7',
    position: initialPos,
    type,
    data,
  },
]

export const initialEdges: ProcessEdge[] = [
  { id: 'e1-2', source: '1', target: '2', type, animated: true },
  { id: 'e1-3', source: '1', target: '3', type, animated: true },
  { id: 'e2-2a', source: '2', target: '2a', type, animated: true },
  { id: 'e2-2b', source: '2', target: '2b', type, animated: true },
  { id: 'e2-2c', source: '2', target: '2c', type, animated: true },
  { id: 'e2c-2d', source: '2c', target: '2d', type, animated: true },
  { id: 'e3-7', source: '3', target: '4', type, animated: true },
  { id: 'e4-5', source: '4', target: '5', type, animated: true },
  { id: 'e5-6', source: '5', target: '6', type, animated: true },
  { id: 'e5-7', source: '5', target: '7', type, animated: true },
]
