import type { EdgeMarkerType, Elements } from '@braks/vue-flow'
import { MarkerType } from '@braks/vue-flow'

const markerEnd: EdgeMarkerType = MarkerType.Arrow

export default [
  {
    id: '1',
    label: 'Node 1',
    position: {
      x: 430,
      y: 0,
    },
  },
  {
    id: '2',
    label: 'Node 2',
    position: {
      x: 230,
      y: 90,
    },
  },
  {
    id: '2a',
    label: 'Node 2a',
    position: {
      x: 0,
      y: 180,
    },
  },
  {
    id: '2b',
    label: 'Node 2b',
    position: {
      x: 230,
      y: 180,
    },
  },
  {
    id: '2c',
    label: 'Node 2c',
    position: {
      x: 430,
      y: 180,
    },
  },
  {
    id: '2d',
    label: 'Node 2d',
    position: {
      x: 475,
      y: 270,
    },
  },
  {
    id: '3',
    label: 'Node 3',
    position: {
      x: 430,
      y: 90,
    },
  },
  {
    id: 'e12',
    source: '1',
    target: '2',
    label: 'Foobar',
    style: { stroke: 'red' },
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e13',
    source: '1',
    target: '3',
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e22a',
    source: '2',
    target: '2a',
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e22b',
    source: '2',
    target: '2b',
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e22c',
    source: '2',
    target: '2c',
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e2c2d',
    source: '2c',
    target: '2d',
    type: 'perfectArrow',
    label: 'perfect arrow',
    markerEnd,
  },
  {
    id: 'e2d2c',
    source: '2d',
    target: '2c',
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e2d1',
    source: '2d',
    target: '1',
    type: 'pathFinding',
    markerEnd,
  },
  {
    id: 'e2a2b',
    source: '2a',
    target: '2b',
    type: 'pathFinding',
    markerEnd,
  },
] as Elements
