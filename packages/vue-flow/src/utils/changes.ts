import { isGraphEdge, isGraphNode } from './graph'
import type {
  Edge,
  EdgeAddChange,
  EdgeChange,
  EdgeRemoveChange,
  EdgeSelectionChange,
  ElementChange,
  FlowElement,
  FlowElements,
  GraphEdge,
  GraphNode,
  Node,
  NodeAddChange,
  NodeChange,
  NodeRemoveChange,
  NodeSelectionChange,
  XYPosition,
} from '~/types'

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

          if (typeof change.computedPosition !== 'undefined') {
            el.computedPosition = { ...el.computedPosition, ...change.computedPosition }
          }

          if (el.expandParent && el.parentNode) {
            const parent = elements[elementIds.indexOf(el.parentNode)]

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
            const parent = elements[elementIds.indexOf(el.parentNode)]

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

  return elements
}

export const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)
export const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)

export const createSelectionChange = (id: string, selected: boolean): NodeSelectionChange | EdgeSelectionChange => ({
  id,
  type: 'select',
  selected,
})

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

export const createRemoveChange = (id: string): NodeRemoveChange | EdgeRemoveChange => ({
  id,
  type: 'remove',
})

export const getSelectionChanges = (items: FlowElements, selectedIds: string[]) => {
  return items.reduce((res, item) => {
    const willBeSelected = selectedIds.includes(item.id)

    if (!item.selected && willBeSelected) {
      item.selected = true
      res.push(createSelectionChange(item.id, true))
    } else if (item.selected && !willBeSelected) {
      item.selected = false
      res.push(createSelectionChange(item.id, false))
    }

    return res
  }, [] as (NodeSelectionChange | EdgeSelectionChange)[])
}
