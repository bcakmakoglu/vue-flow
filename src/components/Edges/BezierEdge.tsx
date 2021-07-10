import { computed, CSSProperties, defineComponent, PropType } from 'vue';

import EdgeText from './EdgeText';

import { getMarkerEnd, getCenter } from './utils';
import { ArrowHeadType, Position } from '../../types';

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

const BezierEdge = defineComponent({
  props: {
    sourceX: {
      type: Number,
      required: true,
      default: 0
    },
    sourceY: {
      type: Number,
      required: true,
      default: 0
    },
    targetX: {
      type: Number,
      required: true,
      default: 0
    },
    targetY: {
      type: Number,
      required: true,
      default: 0
    },
    sourcePosition: {
      type: String as PropType<Position>,
      required: true,
      default: Position.Bottom
    },
    targetPosition: {
      type: String as PropType<Position>,
      required: true,
      default: Position.Top
    },
    label: {
      type: String,
      required: true
    },
    labelStyle: {
      type: Object as PropType<any>,
      required: true,
      default: () => ({})
    },
    labelShowBg: {
      type: Boolean,
      required: false,
      default: false
    },
    labelBgStyle: {
      type: String,
      required: true
    },
    labelBgPadding: {
      type: Array as unknown as PropType<[number, number]>,
      required: false,
      default: () => [0, 0]
    },
    labelBgBorderRadius: {
      type: Number,
      required: false,
      default: 0
    },
    arrowHeadType: {
      type: Object as PropType<ArrowHeadType>,
      required: true
    },
    markerEndId: {
      type: String,
      required: true
    },
    style: {
      type: Object as PropType<CSSProperties>,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const centered = computed(() => {
      return getCenter({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
        sourcePosition: props.sourcePosition,
        targetPosition: props.targetPosition
      });
    });
    const path = computed(() => {
      return getBezierPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
        targetPosition: props.targetPosition
      });
    });

    const text = props.label ? (
      <EdgeText
        x={centered.value[0]}
        y={centered.value[1]}
        label={props.label}
        labelStyle={props.labelStyle}
        labelShowBg={props.labelShowBg}
        labelBgStyle={props.labelBgStyle}
        labelBgPadding={props.labelBgPadding}
        labelBgBorderRadius={props.labelBgBorderRadius}
      />
    ) : null;

    const markerEnd = getMarkerEnd(props.arrowHeadType, props.markerEndId);

    return () => (
      <>
        <path style={props.style} d={path.value} class="revue-flow__edge-path" marker-end={markerEnd} />
        {text}
      </>
    );
  }
});

export default BezierEdge;
