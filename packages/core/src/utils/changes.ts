import { nextTick } from 'vue'
import type {
  EdgeAddChange,
  EdgeChange,
  EdgeRemoveChange,
  EdgeSelectionChange,
  ElementChange,
  GraphEdge,
  GraphNode,
  NodeAddChange,
  NodeChange,
  NodeRemoveChange,
  NodeSelectionChange,
  Styles,
} from '../types'
import { isGraphNode } from '.'

function handleParentExpand(updateItem: GraphNode, parent: GraphNode) {
  if (parent) {
    const extendWidth = updateItem.position.x + updateItem.dimensions.width - parent.dimensions.width
    const extendHeight = updateItem.position.y + updateItem.dimensions.height - parent.dimensions.height

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      let parentStyles: Styles = {}

      if (parent.style) {
        parentStyles = { ...parent.style }
      }

      parentStyles.width = parentStyles.width ?? `${parent.dimensions.width}px`
      parentStyles.height = parentStyles.height ?? `${parent.dimensions.height}px`

      if (extendWidth > 0) {
        if (typeof parentStyles.width === 'string') {
          const currWidth = Number(parentStyles.width.replace('px', ''))
          parentStyles.width = `${currWidth + extendWidth}px`
        } else {
          parentStyles.width += extendWidth
        }
      }

      if (extendHeight > 0) {
        if (typeof parentStyles.height === 'string') {
          const currWidth = Number(parentStyles.height.replace('px', ''))
          parentStyles.height = `${currWidth + extendHeight}px`
        } else {
          parentStyles.height += extendHeight
        }
      }

      if (updateItem.position.x < 0) {
        const xDiff = Math.abs(updateItem.position.x)
        parent.position.x = parent.position.x - xDiff

        if (typeof parentStyles.width === 'string') {
          const currWidth = Number(parentStyles.width.replace('px', ''))
          parentStyles.width = `${currWidth + xDiff}px`
        } else {
          parentStyles.width += xDiff
        }

        updateItem.position.x = 0
      }

      if (updateItem.position.y < 0) {
        const yDiff = Math.abs(updateItem.position.y)
        parent.position.y = parent.position.y - yDiff

        if (typeof parentStyles.height === 'string') {
          const currWidth = Number(parentStyles.height.replace('px', ''))
          parentStyles.height = `${currWidth + yDiff}px`
        } else {
          parentStyles.height += yDiff
        }

        updateItem.position.y = 0
      }

      parent.style = {
        ...parent.style,
        ...parentStyles,
      }
    }
  }
}

export function applyChanges<
  T extends GraphNode | GraphEdge = GraphNode | GraphEdge,
  C extends ElementChange = T extends GraphNode ? NodeChange : EdgeChange,
>(changes: C[], elements: T[]): T[] {
  const addRemoveChanges = changes.filter((c) => c.type === 'add' || c.type === 'remove') as (
    | NodeAddChange
    | EdgeAddChange
    | NodeRemoveChange
    | EdgeRemoveChange
  )[]

  for (const change of addRemoveChanges) {
    if (change.type === 'add') {
      const index = elements.findIndex((el) => el.id === change.item.id)

      if (index === -1) {
        elements.push(<T>change.item)
      }
    } else if (change.type === 'remove') {
      const index = elements.findIndex((el) => el.id === change.id)

      if (index !== -1) {
        elements.splice(index, 1)
      }
    }
  }

  const elementIds = elements.map((el) => el.id)

  for (const element of elements) {
    for (const currentChange of changes) {
      if ((<any>currentChange).id !== element.id) {
        continue
      }

      switch (currentChange.type) {
        case 'select':
          element.selected = currentChange.selected
          break
        case 'position':
          if (isGraphNode(element)) {
            if (typeof currentChange.position !== 'undefined') {
              element.position = currentChange.position
            }

            if (typeof currentChange.dragging !== 'undefined') {
              element.dragging = currentChange.dragging
            }

            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)]

              if (parent && isGraphNode(parent)) {
                handleParentExpand(element, parent)
              }
            }
          }
          break
        case 'dimensions':
          if (isGraphNode(element)) {
            if (typeof currentChange.dimensions !== 'undefined') {
              element.dimensions = currentChange.dimensions
            }

            if (typeof currentChange.updateStyle !== 'undefined') {
              element.style = {
                ...(element.style || {}),
                width: `${currentChange.dimensions?.width}px`,
                height: `${currentChange.dimensions?.height}px`,
              }
            }

            if (typeof currentChange.resizing !== 'undefined') {
              element.resizing = currentChange.resizing
            }

            if (element.expandParent && element.parentNode) {
              const parent = elements[elementIds.indexOf(element.parentNode)]

              if (parent && isGraphNode(parent)) {
                const parentInit = !!parent.dimensions.width && !!parent.dimensions.height

                if (!parentInit) {
                  nextTick(() => {
                    handleParentExpand(element, parent)
                  })
                } else {
                  handleParentExpand(element, parent)
                }
              }
            }
          }
          break
      }
    }
  }

  return elements
}

/** @deprecated Use store instance and call `applyChanges` with template-ref or the one received by `onPaneReady` instead */
export function applyEdgeChanges(changes: EdgeChange[], edges: GraphEdge[]) {
  return applyChanges(changes, edges)
}

/** @deprecated Use store instance and call `applyChanges` with template-ref or the one received by `onPaneReady` instead */
export function applyNodeChanges(changes: NodeChange[], nodes: GraphNode[]) {
  return applyChanges(changes, nodes)
}

export function createSelectionChange(id: string, selected: boolean): NodeSelectionChange | EdgeSelectionChange {
  return {
    id,
    type: 'select',
    selected,
  }
}

export function createAdditionChange<
  T extends GraphNode | GraphEdge = GraphNode,
  C extends NodeAddChange | EdgeAddChange = T extends GraphNode ? NodeAddChange : EdgeAddChange,
>(item: T): C {
  return <C>{
    item,
    type: 'add',
  }
}

export function createNodeRemoveChange(id: string): NodeRemoveChange {
  return {
    id,
    type: 'remove',
  }
}

export function createEdgeRemoveChange(
  id: string,
  source: string,
  target: string,
  sourceHandle?: string | null,
  targetHandle?: string | null,
): EdgeRemoveChange {
  return {
    id,
    source,
    target,
    sourceHandle: sourceHandle || null,
    targetHandle: targetHandle || null,
    type: 'remove',
  }
}

export function getSelectionChanges(
  items: Map<string, any>,
  selectedIds: Set<string> = new Set(),
  mutateItem = false,
): NodeSelectionChange[] | EdgeSelectionChange[] {
  const changes: NodeSelectionChange[] | EdgeSelectionChange[] = []

  for (const [id, item] of items) {
    const willBeSelected = selectedIds.has(id)

    // we don't want to set all items to selected=false on the first selection
    if (!(item.selected === undefined && !willBeSelected) && item.selected !== willBeSelected) {
      if (mutateItem) {
        // this hack is needed for nodes. When the user dragged a node, it's selected.
        // When another node gets dragged, we need to deselect the previous one,
        // in order to have only one selected node at a time - the onNodesChange callback comes too late here :/
        item.selected = willBeSelected
      }
      changes.push(createSelectionChange(item.id, willBeSelected))
    }
  }

  return changes
}
