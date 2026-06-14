import type { CoordinateExtent, CoordinateExtentRange, GraphNode, NodeDragItem, State, XYPosition } from '../types';
import { clampPosition, getNodeDimensions } from '@xyflow/system';
import { ErrorCode, VueFlowError } from '.';

function getExtentPadding(padding: CoordinateExtentRange['padding']): [number, number, number, number] {
  if (Array.isArray(padding)) {
    switch (padding.length) {
      case 1:
        return [padding[0], padding[0], padding[0], padding[0]];
      case 2:
        return [padding[0], padding[1], padding[0], padding[1]];
      case 3:
        return [padding[0], padding[1], padding[2], padding[1]];
      case 4:
        return padding;
      default:
        return [0, 0, 0, 0];
    }
  }

  return [padding, padding, padding, padding];
}

function getParentExtent(
  currentExtent: CoordinateExtentRange | 'parent',
  node: GraphNode | NodeDragItem,
  parent: GraphNode,
): CoordinateExtent | false {
  const [top, right, bottom, left] = typeof currentExtent !== 'string' ? getExtentPadding(currentExtent.padding) : [0, 0, 0, 0];

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
    const [top, right, bottom, left] = getExtentPadding(currentExtent.padding);

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
