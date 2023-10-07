import { markRaw } from 'vue'
import type { Dimensions, XYPosition } from '@xyflow/system'
import { clampPosition } from '@xyflow/system'
import { ErrorCode, VueFlowError, isNumber, isParentSelected } from '.'
import type { Actions, CoordinateExtent, CoordinateExtentRange, GraphNode, NodeDragItem, State } from '~/types'

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

export function getDragItems(
  nodes: GraphNode[],
  nodesDraggable: boolean,
  mousePos: XYPosition,
  findNode: Actions['findNode'],
  nodeId?: string,
): NodeDragItem[] {
  return nodes
    .filter(
      (n) =>
        (n.selected || n.id === nodeId) &&
        (!n.parentNode || !isParentSelected(n, findNode)) &&
        (n.draggable || (nodesDraggable && typeof n.draggable === 'undefined')),
    )
    .map((n) =>
      markRaw({
        id: n.id,
        position: n.position || { x: 0, y: 0 },
        distance: {
          x: mousePos.x - n.computedPosition?.x || 0,
          y: mousePos.y - n.computedPosition?.y || 0,
        },
        from: n.computedPosition,
        extent: n.extent,
        parentNode: n.parentNode,
        dimensions: n.dimensions,
        expandParent: n.expandParent,
      }),
    )
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
  const extendedDragItems = dragItems.reduce((acc, dragItem) => {
    const node = findNode(dragItem.id)

    if (node) {
      acc.push(node)
    }

    return acc
  }, [] as GraphNode[])

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
  const extent = clampNodeExtent(node.dimensions, getExtent(node, triggerError, nodeExtent, parentNode))

  const clampedPos = clampPosition(nextPosition, extent)

  return {
    position: {
      x: clampedPos.x - (parentNode?.computedPosition.x || 0),
      y: clampedPos.y - (parentNode?.computedPosition.y || 0),
    },
    computedPosition: clampedPos,
  }
}
