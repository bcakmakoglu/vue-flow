import { defineComponent } from 'vue';

import EdgeText from './EdgeText';
import { getMarkerEnd } from './utils';
import { EdgeProps } from '../../types';

const StraightEdge = defineComponent({
  inheritAttrs: false,
  props: EdgeProps,
  setup(props) {
    const yOffset = Math.abs(props.targetY - props.sourceY) / 2;
    const centerY = props.targetY < props.sourceY ? props.targetY + yOffset : props.targetY - yOffset;

    const xOffset = Math.abs(props.targetX - props.sourceX) / 2;
    const centerX = props.targetX < props.sourceX ? props.targetX + xOffset : props.targetX - xOffset;
    const markerEnd = getMarkerEnd(props.arrowHeadType, props.markerEndId);

    const text = props.label ? (
      <EdgeText
        x={centerX}
        y={centerY}
        label={props.label}
        labelStyle={props.labelStyle}
        labelShowBg={props.labelShowBg}
        labelBgStyle={props.labelBgStyle}
        labelBgPadding={props.labelBgPadding}
        labelBgBorderRadius={props.labelBgBorderRadius}
      />
    ) : null;

    return (
      <>
        <path
          style={props.style}
          class="revue-flow__edge-path"
          d={`M ${props.sourceX},${props.sourceY}L ${props.targetX},${props.targetY}`}
          marker-end={markerEnd}
        />
        {text}
      </>
    );
  }
});

export default StraightEdge;
