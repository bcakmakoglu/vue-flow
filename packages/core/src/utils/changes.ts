import type {
  EdgeAddChange,
  EdgeChange,
  EdgeLookup,
  EdgeRemoveChange,
  EdgeSelectionChange,
  GraphEdge,
  GraphNode,
  NodeAddChange,
  NodeChange,
  NodeLookup,
  NodeRemoveChange,
  NodeSelectionChange,
  Styles,
} from '../types'

function handleParentExpand(updateItem: GraphNode, parent: GraphNode) {
  if (parent) {
    const itemWidth = updateItem.measured.width || 0
    const itemHeight = updateItem.measured.height || 0
    const parentWidth = updateItem.measured.width || 0
    const parentHeight = updateItem.measured.height || 0

    const extendWidth = updateItem.position.x + itemWidth - parentWidth
    const extendHeight = updateItem.position.y + itemHeight - parentHeight

    if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
      let parentStyles: Styles = {}

      if (parent.style) {
        parentStyles = { ...parent.style }
      }

      parentStyles.width = parentStyles.width ?? `${parent.measured.width}px`
      parentStyles.height = parentStyles.height ?? `${parent.measured.height}px`

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

      parent.width = Number(parentStyles.width.toString().replace('px', ''))
      parent.height = Number(parentStyles.height.toString().replace('px', ''))
      parent.style = {
        ...parent.style,
        ...parentStyles,
      }
    }
  }
}

export function applyEdgeChanges(changes: EdgeChange[], edgeLookup: EdgeLookup) {
  for (const change of changes) {
    if (change.type === 'add') {
      edgeLookup.set(change.item.id, change.item)
    }

    if (change.type === 'remove') {
      edgeLookup.delete(change.id)
    }

    if (change.type === 'select') {
      const edge = edgeLookup.get(change.id)

      if (edge) {
        edge.selected = change.selected
      }
    }
  }

  return Array.from(edgeLookup.values())
}

export function applyNodeChanges(changes: NodeChange[], nodeLookup: NodeLookup) {
  for (const change of changes) {
    if (change.type === 'add') {
      nodeLookup.set(change.item.id, change.item)
    }

    if (change.type === 'remove') {
      nodeLookup.delete(change.id)
    }

    if (change.type === 'select') {
      const node = nodeLookup.get(change.id)

      if (node) {
        node.selected = change.selected
      }
    }

    if (change.type === 'position') {
      const node = nodeLookup.get(change.id)

      if (node) {
        if (typeof change.position !== 'undefined') {
          node.position = change.position
        }

        if (typeof change.dragging !== 'undefined') {
          node.dragging = change.dragging
        }

        if (node.expandParent && node.parentId) {
          const parent = nodeLookup.get(node.parentId)

          if (parent) {
            handleParentExpand(node, parent)
          }
        }
      }
    }
  }

  return Array.from(nodeLookup.values())
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
