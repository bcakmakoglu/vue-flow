import type { SmoothStepEdgeProps } from '../../types';
import { getSmoothStepPath } from '@xyflow/system';
import { defineComponent, h } from 'vue';
import { Position } from '../../types';
import BaseEdge from './BaseEdge.vue';
import { baseEdgeProps } from './utils';

const SmoothStepEdge = defineComponent<SmoothStepEdgeProps>({
  name: 'SmoothStepEdge',
  // see StraightEdge: keep undeclared attrs (source/target/…) from leaking onto the <path>
  inheritAttrs: false,
  props: [
    'sourcePosition',
    'targetPosition',
    'label',
    'labelStyle',
    'labelShowBg',
    'labelBgStyle',
    'labelBgPadding',
    'labelBgBorderRadius',
    'sourceY',
    'sourceX',
    'targetX',
    'targetY',
    'borderRadius',
    'markerEnd',
    'markerStart',
    'interactionWidth',
    'offset',
  ],
  compatConfig: { MODE: 3 },
  setup(props, { attrs }) {
    return () => {
      const [path, labelX, labelY] = getSmoothStepPath({
        ...props,
        sourcePosition: props.sourcePosition ?? Position.Bottom,
        targetPosition: props.targetPosition ?? Position.Top,
      });

      return h(BaseEdge, { path, labelX, labelY, ...baseEdgeProps(props, attrs) });
    };
  },
});

export default SmoothStepEdge;
