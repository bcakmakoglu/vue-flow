import { defineComponent } from 'vue';
import EdgeText from './EdgeText';
import { getMarkerEnd, DefaultEdgeProps } from './utils';
import { reactify } from '@vueuse/core';
import { ArrowHeadType, EdgeType } from '../../types';

export default defineComponent({
  inheritAttrs: false,
  props: {
    ...DefaultEdgeProps
  },
  setup(props) {
    const centerY = reactify((targetY: number, sourceY: number) => {
      const yOffset = Math.abs(targetY - sourceY) / 2;
      return targetY < sourceY ? targetY + yOffset : targetY - yOffset;
    });
    const centerX = reactify((targetX: number, sourceX: number) => {
      const xOffset = Math.abs(targetX - sourceX) / 2;
      return targetX < sourceX ? targetX + xOffset : targetX - xOffset;
    });

    const markerEnd = reactify((arrowHeadType?: ArrowHeadType, markerEndId?: string) => getMarkerEnd(arrowHeadType, markerEndId));

    return () => (
      <>
        <path
          style={props.style}
          class="revue-flow__edge-path"
          d={`M ${props.sourceX},${props.sourceY}L ${props.targetX},${props.targetY}`}
          marker-end={markerEnd(props.arrowHeadType, props.markerEndId).value}
        />
        {props.label ? (
          <EdgeText
            x={centerX(props.targetX, props.sourceX).value}
            y={centerY(props.targetY, props.sourceY).value}
            label={props.label}
            labelStyle={props.labelStyle}
            labelShowBg={props.labelShowBg}
            labelBgStyle={props.labelBgStyle}
            labelBgPadding={props.labelBgPadding}
            labelBgBorderRadius={props.labelBgBorderRadius}
          />
        ) : null}
      </>
    );
  }
}) as unknown as EdgeType;
