import type { NodeDragItem, XYPosition } from '~/types'

function useUpdateNodePositions() {
  const { getSelectedNodes, nodeExtent, updateNodePositions, findNode } = useVueFlow()

  return (positionDiff: XYPosition) => {
    const nodeUpdates = getSelectedNodes.value.flatMap((n) => {
      if (n.computedPosition) {
        const nextPosition = { x: n.computedPosition.x + positionDiff.x, y: n.computedPosition.y + positionDiff.y }

        const updatedPos = calcNextPosition(n, nextPosition, nodeExtent.value, n.parentNode ? findNode(n.parentNode) : undefined)

        return [
          {
            id: n.id,
            position: updatedPos.position,
            computedPosition: { ...n.computedPosition, ...updatedPos.computedPosition },
            from: n.position,
            distance: { x: positionDiff.x, y: positionDiff.y },
            dimensions: n.dimensions,
          },
        ] as NodeDragItem[]
      }

      return []
    })

    updateNodePositions(nodeUpdates, true, true)
  }
}

export default useUpdateNodePositions
