import { clampPosition, isGraphEdge, isGraphNode } from './graph'
import type {
  CoordinateExtent,
  Edge,
  EdgeAddChange,
  EdgeChange,
  EdgeSelectionChange,
  ElementChange,
  FlowElement,
  FlowElements,
  Getters,
  GraphEdge,
  GraphNode,
  Node,
  NodeAddChange,
  NodeChange,
  NodePositionChange,
  NodeSelectionChange,
  XYPosition,
} from '~/types'

interface CreatePositionChangeParams {
  node: GraphNode
  nodeExtent: CoordinateExtent
  diff?: XYPosition
}

function handleParentExpand(updateItem: GraphNode, parent: GraphNode) {
  if (parent) {
    const extendWidth = updateItem.position.x + updateItem.dimensions.width - parent.dimensions.width
    const extendHeight = updateItem.position.y + updateItem.dimensions.height - parent.dimensions.height

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      parent.style = { ...parent.style } || {}

      if (extendWidth > 0) {
        if (!parent.style.width) {
          parent.style.width = parent.dimensions.width
        }
        if (typeof parent.style.width === 'string') {
          const currWidth = parseInt(parent.style.width, 10)
          parent.style.width = `${currWidth + extendWidth}px`
        } else {
          parent.style.width += extendWidth
        }
      }

      if (extendHeight > 0) {
        if (!parent.style.height) {
          parent.style.height = parent.dimensions.height
        }
        if (typeof parent.style.height === 'string') {
          const currWidth = parseInt(parent.style.height, 10)
          parent.style.height = `${currWidth + extendHeight}px`
        } else {
          parent.style.height += extendHeight
        }
      }

      if (updateItem.position.x < 0) {
        const xDiff = Math.abs(updateItem.position.x)
        parent.position.x = parent.position.x - xDiff
        if (typeof parent.style.width === 'string') {
          const currWidth = parseInt(parent.style.width, 10)
          parent.style.width = `${currWidth + xDiff}px`
        } else {
          ;(parent.style as any).width += xDiff
        }
        updateItem.position.x = 0
      }

      if (updateItem.position.y < 0) {
        const yDiff = Math.abs(updateItem.position.y)
        parent.position.y = parent.position.y - yDiff
        if (typeof parent.style.height === 'string') {
          const currWidth = parseInt(parent.style.height, 10)
          parent.style.height = `${currWidth + yDiff}px`
        } else {
          ;(parent.style as any).height += yDiff
        }
        updateItem.position.y = 0
      }

      parent.dimensions.width = (
        typeof parent.style.width === 'string' ? parseInt((<string>parent.style.width)!, 10) : parent.style.width
      )!
      parent.dimensions.height = (
        typeof parent.style.height === 'string' ? parseInt((<string>parent.style.height)!, 10) : parent.style.height
      )!
    }
  }
}

export const applyChanges = <
  T extends Node | Edge | FlowElement = Node,
  C extends ElementChange = T extends GraphNode ? NodeChange : EdgeChange,
>(
  changes: C[],
  elements: T[],
): T[] => {
  let elementIds = elements.map((el) => el.id)
  changes.forEach((change) => {
    nextTick(() => {
      if (change.type === 'add') {
        const item = <T>change.item
        return elements.push(item)
      }

      const i = elementIds.indexOf((<any>change).id)
      const el = elements[i]
      switch (change.type) {
        case 'select':
          if (isGraphNode(el) || isGraphEdge(el)) el.selected = change.selected
          break
        case 'position':
          if (isGraphNode(el)) {
            if (typeof change.position !== 'undefined') el.position = change.position
            if (el.expandParent && el.parentNode) {
              const parent = elements.find((parent) => parent.id === el.parentNode)

              if (parent && isGraphNode(parent)) {
                handleParentExpand(el, parent)
              }
            }
          }
          break
        case 'dimensions':
          if (isGraphNode(el)) {
            if (typeof change.dimensions !== 'undefined') el.dimensions = change.dimensions
            if (el.expandParent && el.parentNode) {
              const parent = elements.find((parent) => parent.id === el.parentNode)

              if (parent && isGraphNode(parent)) {
                handleParentExpand(el, parent)
              }
            }
          }
          break
        case 'remove':
          if (elementIds.includes(change.id)) {
            elements.splice(i, 1)
            elementIds = elements.map((el) => el.id)
          }
          break
      }
    })
  })

  return elements
}

export const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)
export const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)

export const createSelectionChange = (id: string, selected: boolean): NodeSelectionChange | EdgeSelectionChange => ({
  id,
  type: 'select',
  selected,
})

export const createPositionChange = (
  { node, diff, nodeExtent }: CreatePositionChangeParams,
  getNode: Getters['getNode'],
): NodePositionChange => {
  const parent = node.parentNode ? getNode(node.parentNode) : undefined
  const change: NodePositionChange = {
    id: node.id,
    type: 'position',
  }

  if (diff) {
    const nextPosition = { x: node.position.x + diff.x, y: node.position.y + diff.y }
    let currentExtent = node.extent === 'parent' || typeof node.extent === 'undefined' ? nodeExtent : node.extent

    if (node.extent === 'parent' && parent && node.dimensions.width && node.dimensions.height) {
      if (parent.dimensions.width && parent.dimensions.height) {
        currentExtent = [
          [0, 0],
          [parent.dimensions.width - node.dimensions.width, parent.dimensions.height - node.dimensions.height],
        ]
      }
    }

    change.position = currentExtent ? clampPosition(nextPosition, currentExtent) : nextPosition
  }

  return change
}

export const createAdditionChange = <
  T extends GraphNode | GraphEdge = GraphNode,
  C extends NodeAddChange | EdgeAddChange = T extends GraphNode ? NodeAddChange : EdgeAddChange,
>(
  item: T,
): C =>
  <C>{
    item,
    type: 'add',
  }

const isParentSelected = (node: GraphNode, selectedIds: string[], getNode: Getters['getNode']): boolean => {
  const parent = node.parentNode ? getNode(node.parentNode) : undefined
  if (!node.parentNode || !parent) return false
  if (selectedIds.includes(node.parentNode)) return true
  return isParentSelected(parent, selectedIds, getNode)
}

export const getSelectionChanges = (items: FlowElements, selectedIds: string[], getNode: Getters['getNode']) => {
  return items.reduce((res, item) => {
    const willBeSelected =
      selectedIds.includes(item.id) || !!(isGraphNode(item) && item.parentNode && isParentSelected(item, selectedIds, getNode))

    if (!item.selected && willBeSelected) {
      res.push(createSelectionChange(item.id, true))
    } else if (item.selected && !willBeSelected) {
      res.push(createSelectionChange(item.id, false))
    }

    return res
  }, [] as (NodeSelectionChange | EdgeSelectionChange)[])
}
