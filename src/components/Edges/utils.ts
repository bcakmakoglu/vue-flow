import { ArrowHeadType, Position, EdgeProps, EdgeSmoothStepProps } from '../../types';
import { PropType } from 'vue';

export const getMarkerEnd = (arrowHeadType?: ArrowHeadType, markerEndId?: string): string => {
  if (typeof markerEndId !== 'undefined' && markerEndId) {
    return `url(#${markerEndId})`;
  }

  return typeof arrowHeadType !== 'undefined' ? `url(#revue-flow__${arrowHeadType})` : 'none';
};

export interface GetCenterParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: Position;
  targetPosition?: Position;
}

const LeftOrRight = [Position.Left, Position.Right];

export const getCenter = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top
}: GetCenterParams): [number, number, number, number] => {
  const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
  const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);

  // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
  // a mixed edge is when one the source is on the left and the target is on the top for example.
  const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight);

  if (mixedEdge) {
    const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;
    const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset;

    const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);
    const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset;

    return [centerX, centerY, xOffset, yOffset];
  }

  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
};

export const DefaultEdgeProps = {
  id: {
    type: String as PropType<EdgeProps['id']>,
    required: true,
    default: 0
  },
  sourceX: {
    type: Number as PropType<EdgeProps['sourceX']>,
    required: true,
    default: 0
  },
  sourceY: {
    type: Number as PropType<EdgeProps['sourceY']>,
    required: true,
    default: 0
  },
  targetX: {
    type: Number as PropType<EdgeProps['targetX']>,
    required: true,
    default: 0
  },
  targetY: {
    type: Number as PropType<EdgeProps['targetY']>,
    required: true,
    default: 0
  },
  sourcePosition: {
    type: String as PropType<EdgeProps['sourcePosition']>,
    required: false,
    default: Position.Bottom
  },
  targetPosition: {
    type: String as PropType<EdgeProps['targetPosition']>,
    required: false,
    default: Position.Top
  },
  label: {
    type: [String, Object] as PropType<EdgeProps['label']>,
    required: false,
    default: () => {}
  },
  labelStyle: {
    type: Object as PropType<EdgeProps['labelStyle']>,
    required: false,
    default: undefined
  },
  labelShowBg: {
    type: Boolean as PropType<EdgeProps['labelShowBg']>,
    required: false,
    default: true
  },
  labelBgStyle: {
    type: [String, Object] as PropType<EdgeProps['labelBgStyle']>,
    required: false,
    default: undefined
  },
  labelBgPadding: {
    type: Array as unknown as PropType<[number, number]>,
    required: false,
    default: undefined
  },
  labelBgBorderRadius: {
    type: Number as PropType<EdgeProps['labelBgBorderRadius']>,
    required: false,
    default: undefined
  },
  arrowHeadType: {
    type: String as PropType<EdgeProps['arrowHeadType']>,
    required: false,
    default: undefined
  },
  markerEndId: {
    type: String as PropType<EdgeProps['markerEndId']>,
    required: false,
    default: undefined
  },
  style: {
    type: Object as PropType<EdgeProps['style']>,
    required: false,
    default: undefined
  },
  data: {
    type: Object as PropType<EdgeProps['data']>,
    required: false,
    default: undefined
  },
  sourceHandleId: {
    type: String as PropType<EdgeProps['sourceHandleId']>,
    required: false,
    default: undefined
  },
  targetHandleId: {
    type: String as PropType<EdgeProps['targetHandleId']>,
    required: false,
    default: undefined
  }
};

export const EdgeSmoothProps = {
  ...DefaultEdgeProps,
  borderRadius: {
    type: Number as PropType<EdgeSmoothStepProps['borderRadius']>,
    required: false,
    default: 5
  }
};
