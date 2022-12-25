import type { NodeDragItem, XYPosition } from '~/types'

function useUpdateNodePositions() {
  const { getSelectedNodes, nodeExtent, updateNodePositions, findNode, snapGrid, snapToGrid } = useVueFlow()

  return (positionDiff: XYPosition, isShiftPressed = false) => {
    // by default a node moves 5px on each key press, or 20px if shift is pressed
    // if snap grid is enabled, we use that for the velocity.
    const xVelo = snapToGrid.value ? snapGrid.value[0] : 5
    const yVelo = snapToGrid.value ? snapGrid.value[1] : 5
    const factor = isShiftPressed ? 4 : 1

    const positionDiffX = positionDiff.x * xVelo * factor
    const positionDiffY = positionDiff.y * yVelo * factor

    const nodeUpdates = getSelectedNodes.value.map((n) => {
      const nextPosition = { x: n.computedPosition.x + positionDiffX, y: n.computedPosition.y + positionDiffY }

      const updatedPos = calcNextPosition(n, nextPosition, nodeExtent.value, n.parentNode ? findNode(n.parentNode) : undefined)

      return {
        id: n.id,
        position: updatedPos.position,
        from: n.position,
        distance: { x: positionDiff.x, y: positionDiff.y },
        dimensions: n.dimensions,
      } as NodeDragItem
    })

    updateNodePositions(nodeUpdates, true, false)
  }
}

export default useUpdateNodePositions
