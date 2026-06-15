import type { PaddingWithUnit } from '@xyflow/system';
import type { CoordinateExtent, CoordinateExtentRange, GraphNode, NodeDragItem, State, XYPosition } from '../types';
import { clampPosition, getNodeDimensions } from '@xyflow/system';
import { ErrorCode, VueFlowError } from '.';

// Resolve one `PaddingWithUnit` against a reference length — `%` is relative, `px`/number is absolute.
function resolvePadding(value: PaddingWithUnit | undefined, reference: number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (!value) {
    return 0;
  }

  const numeric = Number.parseFloat(value);

  if (Number.isNaN(numeric)) {
    return 0;
  }

  return value.endsWith('%') ? (numeric / 100) * reference : numeric;
}

// Resolve system `Padding` into absolute [top, right, bottom, left] within a parent of width × height.
function getExtentPadding(
  padding: CoordinateExtentRange['padding'],
  width: number,
  height: number,
): [number, number, number, number] {
  if (typeof padding === 'number' || typeof padding === 'string') {
    return [resolvePadding(padding, height), resolvePadding(padding, width), resolvePadding(padding, height), resolvePadding(padding, width)];
  }

  return [
    resolvePadding(padding.top ?? padding.y, height),
    resolvePadding(padding.right ?? padding.x, width),
    resolvePadding(padding.bottom ?? padding.y, height),
    resolvePadding(padding.left ?? padding.x, width),
  ];
}

function getParentExtent(
  currentExtent: CoordinateExtentRange | 'parent',
  node: GraphNode | NodeDragItem,
  parent: GraphNode,
): CoordinateExtent | false {
  const [top, right, bottom, left] = typeof currentExtent !== 'string'
    ? getExtentPadding(currentExtent.padding, parent.measured.width ?? 0, parent.measured.height ?? 0)
    : [0, 0, 0, 0];

  if (
    parent
    && typeof parent.internals.positionAbsolute.x !== 'undefined'
    && typeof parent.internals.positionAbsolute.y !== 'undefined'
    && typeof parent.measured.width !== 'undefined'
    && typeof parent.measured.height !== 'undefined'
  ) {
    return [
      [parent.internals.positionAbsolute.x + left, parent.internals.positionAbsolute.y + top],
      [
        parent.internals.positionAbsolute.x + parent.measured.width - right,
        parent.internals.positionAbsolute.y + parent.measured.height - bottom,
      ],
    ];
  }

  return false;
}

export function getExtent<T extends NodeDragItem | GraphNode>(
  item: T,
  triggerError: State['hooks']['error']['trigger'],
  extent?: State['nodeExtent'],
  parent?: GraphNode,
) {
  let currentExtent = item.extent || extent;

  if (
    (currentExtent === 'parent' || (!Array.isArray(currentExtent) && currentExtent?.range === 'parent'))
    && !item.expandParent
  ) {
    if (item.parentId && parent && item.measured.width && item.measured.height) {
      const parentExtent = getParentExtent(currentExtent, item, parent);

      if (parentExtent) {
        currentExtent = parentExtent;
      }
    }
    else {
      triggerError(new VueFlowError(ErrorCode.NODE_EXTENT_INVALID, item.id));

      currentExtent = extent;
    }
  }
  else if (Array.isArray(currentExtent)) {
    const parentX = parent?.internals.positionAbsolute.x || 0;
    const parentY = parent?.internals.positionAbsolute.y || 0;

    currentExtent = [
      [currentExtent[0][0] + parentX, currentExtent[0][1] + parentY],
      [currentExtent[1][0] + parentX, currentExtent[1][1] + parentY],
    ];
  }
  else if (currentExtent !== 'parent' && currentExtent?.range && Array.isArray(currentExtent.range)) {
    const width = currentExtent.range[1][0] - currentExtent.range[0][0];
    const height = currentExtent.range[1][1] - currentExtent.range[0][1];
    const [top, right, bottom, left] = getExtentPadding(currentExtent.padding, width, height);

    const parentX = parent?.internals.positionAbsolute.x || 0;
    const parentY = parent?.internals.positionAbsolute.y || 0;

    currentExtent = [
      [currentExtent.range[0][0] + parentX + left, currentExtent.range[0][1] + parentY + top],
      [currentExtent.range[1][0] + parentX - right, currentExtent.range[1][1] + parentY - bottom],
    ];
  }

  return (
    currentExtent === 'parent'
      ? [
          [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
          [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
        ]
      : currentExtent
  ) as CoordinateExtent;
}

export function calcNextPosition(
  node: GraphNode | NodeDragItem,
  nextPosition: XYPosition,
  triggerError: State['hooks']['error']['trigger'],
  nodeExtent?: State['nodeExtent'],
  parentNode?: GraphNode,
) {
  const measured = getNodeDimensions(node);

  // `clampPosition` already subtracts the node's dimensions from the extent's max corner (same as
  // system's own `clampPositionToParent`), so pass `getExtent`'s region straight through — pre-shrinking
  // it by the node size first would double-count it and clamp the node a full width/height too far in.
  const clampedPos = clampPosition(nextPosition, getExtent(node, triggerError, nodeExtent, parentNode), measured);

  return {
    position: {
      x: clampedPos.x - (parentNode?.internals.positionAbsolute.x || 0),
      y: clampedPos.y - (parentNode?.internals.positionAbsolute.y || 0),
    },
    computedPosition: clampedPos,
  };
}
