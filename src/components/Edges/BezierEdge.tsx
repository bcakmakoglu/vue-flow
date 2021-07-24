import { defineComponent } from 'vue';
import EdgeText from './EdgeText';
import { getMarkerEnd, getCenter, GetCenterParams, DefaultEdgeProps } from './utils';
import { ArrowHeadType, EdgeType, Position } from '../../types';
import { reactify } from '@vueuse/core';

interface GetBezierPathParams {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  centerX?: number;
  centerY?: number;
}

export function getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  centerX,
  centerY
}: GetBezierPathParams): string {
  const [_centerX, _centerY] = getCenter({ sourceX, sourceY, targetX, targetY });
  const leftAndRight = [Position.Left, Position.Right];

  const cX = typeof centerX !== 'undefined' ? centerX : _centerX;
  const cY = typeof centerY !== 'undefined' ? centerY : _centerY;

  let path = `M${sourceX},${sourceY} C${sourceX},${cY} ${targetX},${cY} ${targetX},${targetY}`;

  if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${cX},${sourceY} ${cX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${sourceX},${targetY} ${sourceX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(sourcePosition)) {
    path = `M${sourceX},${sourceY} C${targetX},${sourceY} ${targetX},${sourceY} ${targetX},${targetY}`;
  }

  return path;
}

export default defineComponent({
  inheritAttrs: false,
  props: {
    ...DefaultEdgeProps
  },
  setup(props) {
    const centered = reactify(({ sourceX, sourceY, targetX, targetY, targetPosition, sourcePosition }: GetCenterParams) => {
      return getCenter({
        sourceX: sourceX,
        sourceY: sourceY,
        targetX: targetX,
        targetY: targetY,
        sourcePosition: sourcePosition,
        targetPosition: targetPosition
      });
    });
    const path = reactify(({ sourceX, sourceY, targetX, targetY, targetPosition, sourcePosition }: GetBezierPathParams) => {
      return getBezierPath({
        sourceX: sourceX,
        sourceY: sourceY,
        targetX: targetX,
        targetY: targetY,
        targetPosition: targetPosition,
        sourcePosition: sourcePosition
      });
    });

    const text = props.label ? (
      <EdgeText
        x={centered({ ...props }).value[0]}
        y={centered({ ...props }).value[1]}
        label={props.label}
        labelStyle={props.labelStyle}
        labelShowBg={props.labelShowBg}
        labelBgStyle={props.labelBgStyle}
        labelBgPadding={props.labelBgPadding}
        labelBgBorderRadius={props.labelBgBorderRadius}
      />
    ) : null;

    const markerEnd = reactify((arrowHeadType?: ArrowHeadType, markerEndId?: string) => getMarkerEnd(arrowHeadType, markerEndId));

    return () => (
      <>
        <path
          class="revue-flow__edge-path"
          style={props.style}
          d={path({ ...props }).value}
          marker-end={markerEnd(props.arrowHeadType, props.markerEndId).value}
        />
        {text}
      </>
    );
  }
}) as EdgeType;
