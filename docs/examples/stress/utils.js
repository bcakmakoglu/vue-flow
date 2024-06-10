export function getElements(xElements = 10, yElements = 10) {
  const initialNodes = []
  const initialEdges = []
  let nodeId = 1
  let recentNodeId = null

  for (let y = 0; y < yElements; y++) {
    for (let x = 0; x < xElements; x++) {
      const position = { x: x * 75, y: y * 75 }
      const node = {
        id: nodeId.toString(),
        style: { width: `50px`, fontSize: `11px`, zIndex: 1 },
        data: { label: `Node ${nodeId}` },
        class: 'light',
        position,
      }
      initialNodes.push(node)

      if (recentNodeId && nodeId <= xElements * yElements) {
        initialEdges.push({
          id: `${x}-${y}`,
          source: recentNodeId.toString(),
          target: nodeId.toString(),
          style: (edge) => {
            if (!edge.sourceNode.selected && !edge.targetNode.selected) {
              return
            }
            return { stroke: '#10b981', strokeWidth: 3 }
          },
        })
      }

      recentNodeId = nodeId
      nodeId++
    }
  }

  return {
    nodes: initialNodes,
    edges: initialEdges,
  }
}
