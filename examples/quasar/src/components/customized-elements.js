import { MarkerType } from '@vue-flow/core';

/**
 * Nodes and edges are passed separately to the `nodes` and `edges` props of Vue Flow
 */
export const initialNodes = [
  {
    id: '1',
    type: 'card',
    data: { label: 'Node 1' },
    position: { x: 250, y: -50 },
    class: 'light',
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    class: 'light',
  },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 }, class: 'light' },
  { id: '4', data: { label: 'Node 4' }, position: { x: 150, y: 200 }, class: 'light' },
  {
    id: '5',
    type: 'output',
    data: { label: 'Node 5' },
    position: { x: 300, y: 300 },
    class: 'light',
  },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  {
    id: 'e1-3',
    label: 'edge with arrowhead',
    source: '1',
    target: '3',
    markerEnd: MarkerType.Arrow,
  },
  {
    id: 'e4-5',
    type: 'step',
    label: 'step-edge',
    source: '4',
    target: '5',
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' },
  },
  {
    id: 'e3-4',
    type: 'smoothstep',
    label: 'smoothstep-edge',
    source: '3',
    target: '4',
  },
];
