import type { NodeDragItem, XYPosition } from '../types'
import { calcNextPosition } from '../utils'
import { useVueFlow } from './useVueFlow'

/**
 * Composable for updating the position of nodes.
 *
 * @internal
 */
export function useUpdateNodePositions() {
  const { getSelectedNodes, nodeExtent, updateNodePositions, findNode, snapGrid, snapToGrid, nodesDraggable, emits } =
    useVueFlow()

  return (positionDiff: XYPosition, isShiftPressed = false) => {
    // by default a node moves 5px on each key press, or 20px if shift is pressed
    // if snap grid is enabled, we use that for the velocity.
    const xVelo = snapToGrid.value ? snapGrid.value[0] : 5
    const yVelo = snapToGrid.value ? snapGrid.value[1] : 5
    const factor = isShiftPressed ? 4 : 1

    const positionDiffX = positionDiff.x * xVelo * factor
    const positionDiffY = positionDiff.y * yVelo * factor

    const nodeUpdates: NodeDragItem[] = []
    for (const node of getSelectedNodes.value) {
      if (node.draggable || (nodesDraggable && typeof node.draggable === 'undefined')) {
        const nextPosition = {
          x: node.internals.positionAbsolute.x + positionDiffX,
          y: node.internals.positionAbsolute.y + positionDiffY,
        }

        const { position } = calcNextPosition(
          node,
          nextPosition,
          emits.error,
          nodeExtent.value,
          node.parentId ? findNode(node.parentId) : undefined,
        )

        nodeUpdates.push({
          id: node.id,
          position,
          distance: { x: positionDiff.x, y: positionDiff.y },
          measured: { width: node.measured.width, height: node.measured.height },
          internals: { positionAbsolute: { x: node.internals.positionAbsolute.x, y: node.internals.positionAbsolute.y } },
        })
      }
    }

    updateNodePositions(nodeUpdates, true, false)
  }
}
