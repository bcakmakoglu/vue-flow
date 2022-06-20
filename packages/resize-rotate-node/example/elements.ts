import type { Elements } from '@vue-flow/renderer'

export default [
  {
    id: '1',
    label: 'Node 1',
    type: 'resize-rotate',
    targetPosition: 'left',
    sourcePosition: 'right',
    position: {
      x: 0,
      y: 0,
    },
    dragHandle: `[data-moveable-id='1']`,
    style: {
      cursor: 'default',
    },
    data: {
      style: {
        background: 'rgb(255, 0, 114) none repeat scroll 0% 0%',
        padding: '20px',
        borderRadius: '20px',
      },
    },
  },
  {
    id: '2',
    label: 'Node 2',
    type: 'resize-rotate',
    targetPosition: 'left',
    position: {
      x: 330,
      y: 50,
    },
    data: {
      style: {
        background: 'rgb(50, 188, 188) none repeat scroll 0% 0%',
        padding: '20px',
        borderRadius: '20px',
      },
    },
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
] as Elements
