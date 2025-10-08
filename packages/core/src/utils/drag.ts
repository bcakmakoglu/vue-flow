import type {
  Actions,
  CoordinateExtent,
  CoordinateExtentRange,
  Dimensions,
  GraphNode,
  NodeDragItem,
  NodeLookup,
  State,
  XYPosition,
} from '../types'
import { ErrorCode, VueFlowError, clampPosition, clampPositionToParent, isParentSelected } from '.'

export function hasSelector(target: Element, selector: string, node: Element): boolean {
  let current = target

  do {
    if (current && current.matches(selector)) {
      return true
    } else if (current === node) {
      return false
    }

    current = current.parentElement as Element
  } while (current)

  return false
}

// looks for all selected nodes and created a NodeDragItem for each of them
export function getDragItems(nodeLookup: NodeLookup, nodesDraggable: boolean, mousePos: XYPosition, nodeId?: string) {
  const dragItems = new Map<string, NodeDragItem>()

  for (const [id, node] of nodeLookup) {
    if (
      (node.selected || node.id === nodeId) &&
      (!node.parentNode || !isParentSelected(node, nodeLookup)) &&
      (node.draggable || (nodesDraggable && typeof node.draggable === 'undefined'))
    ) {
      const internalNode = nodeLookup.get(id)

      if (internalNode) {
        dragItems.set(id, {
          id: node.id,
          position: node.position || { x: 0, y: 0 },
          distance: {
            x: mousePos.x - node.computedPosition?.x || 0,
            y: mousePos.y - node.computedPosition?.y || 0,
          },
          from: { x: node.computedPosition.x, y: node.computedPosition.y },
          extent: node.extent,
          parentNode: node.parentNode,
          dimensions: { ...node.dimensions },
          expandParent: node.expandParent,
        })
      }
    }
  }

  // todo: work with map in `useDrag` instead of array
  return Array.from(dragItems.values())
}

export function getEventHandlerParams({
  id,
  dragItems,
  findNode,
}: {
  id?: string
  dragItems: NodeDragItem[]
  findNode: Actions['findNode']
}): [GraphNode, GraphNode[]] {
  const extendedDragItems: GraphNode[] = []
  for (const dragItem of dragItems) {
    const node = findNode(dragItem.id)

    if (node) {
      extendedDragItems.push(node)
    }
  }

  return [id ? extendedDragItems.find((n) => n.id === id)! : extendedDragItems[0], extendedDragItems]
}

function getExtentPadding(padding: CoordinateExtentRange['padding']): [number, number, number, number] {
  if (Array.isArray(padding)) {
    switch (padding.length) {
      case 1:
        return [padding[0], padding[0], padding[0], padding[0]]
      case 2:
        return [padding[0], padding[1], padding[0], padding[1]]
      case 3:
        return [padding[0], padding[1], padding[2], padding[1]]
      case 4:
        return padding
      default:
        return [0, 0, 0, 0]
    }
  }

  return [padding, padding, padding, padding]
}

function getParentExtent(
  currentExtent: CoordinateExtentRange | 'parent',
  node: GraphNode | NodeDragItem,
  parent: GraphNode,
): CoordinateExtent | false {
  const [top, right, bottom, left] = typeof currentExtent !== 'string' ? getExtentPadding(currentExtent.padding) : [0, 0, 0, 0]

  if (
    parent &&
    typeof parent.computedPosition.x !== 'undefined' &&
    typeof parent.computedPosition.y !== 'undefined' &&
    typeof parent.dimensions.width !== 'undefined' &&
    typeof parent.dimensions.height !== 'undefined'
  ) {
    return [
      [parent.computedPosition.x + left, parent.computedPosition.y + top],
      [
        parent.computedPosition.x + parent.dimensions.width - right,
        parent.computedPosition.y + parent.dimensions.height - bottom,
      ],
    ]
  }

  return false
}

export function getExtent<T extends NodeDragItem | GraphNode>(
  item: T,
  triggerError: State['hooks']['error']['trigger'],
  extent?: State['nodeExtent'],
  parent?: GraphNode,
) {
  let currentExtent = item.extent || extent

  if (
    (currentExtent === 'parent' || (!Array.isArray(currentExtent) && currentExtent?.range === 'parent')) &&
    !item.expandParent
  ) {
    if (item.parentNode && parent && item.dimensions.width && item.dimensions.height) {
      const parentExtent = getParentExtent(currentExtent, item, parent)

      if (parentExtent) {
        currentExtent = parentExtent
      }
    } else {
      triggerError(new VueFlowError(ErrorCode.NODE_EXTENT_INVALID, item.id))

      currentExtent = extent
    }
  } else if (Array.isArray(currentExtent)) {
    const parentX = parent?.computedPosition.x || 0
    const parentY = parent?.computedPosition.y || 0

    currentExtent = [
      [currentExtent[0][0] + parentX, currentExtent[0][1] + parentY],
      [currentExtent[1][0] + parentX, currentExtent[1][1] + parentY],
    ]
  } else if (currentExtent !== 'parent' && currentExtent?.range && Array.isArray(currentExtent.range)) {
    const [top, right, bottom, left] = getExtentPadding(currentExtent.padding)

    const parentX = parent?.computedPosition.x || 0
    const parentY = parent?.computedPosition.y || 0

    currentExtent = [
      [currentExtent.range[0][0] + parentX + left, currentExtent.range[0][1] + parentY + top],
      [currentExtent.range[1][0] + parentX - right, currentExtent.range[1][1] + parentY - bottom],
    ]
  }

  return (
    currentExtent === 'parent'
      ? [
          [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
          [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
        ]
      : currentExtent
  ) as CoordinateExtent
}

function clampNodeExtent({ width, height }: Dimensions, extent: CoordinateExtent): CoordinateExtent {
  return [extent[0], [extent[1][0] - (width || 0), extent[1][1] - (height || 0)]]
}

export function calcNextPosition(
  node: GraphNode | NodeDragItem,
  nextPosition: XYPosition,
  triggerError: State['hooks']['error']['trigger'],
  nodeExtent?: State['nodeExtent'],
  parentNode?: GraphNode,
) {
  const currentExtent = node.extent || nodeExtent
  const extent = clampNodeExtent(node.dimensions, getExtent(node, triggerError, nodeExtent, parentNode))

  const clampedPos = clampPosition(nextPosition, extent)

  let computedPos = clampedPos

  if (parentNode && (currentExtent === 'parent' || (!Array.isArray(currentExtent) && currentExtent?.range === 'parent'))) {
    console.log('clamp to parent')
    computedPos = clampPositionToParent(clampedPos, node.dimensions, parentNode)
  }

  return {
    position: {
      x: clampedPos.x - (parentNode?.computedPosition.x || 0),
      y: clampedPos.y - (parentNode?.computedPosition.y || 0),
    },
    computedPosition: computedPos,
  }
}
