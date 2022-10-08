import type { Edge, Node } from '@braks/vue-flow'

export function getElements(xElements = 10, yElements = 10) {
  const initialNodes: Node[] = []
  const initialEdges: Edge[] = []
  let nodeId = 1
  let recentNodeId = null

  for (let y = 0; y < yElements; y++) {
    for (let x = 0; x < xElements; x++) {
      initialNodes.push({
        id: nodeId.toString(),
        label: `Node ${nodeId}`,
        style: (node) => {
          const style: Record<string, any> = { width: `50px`, fontSize: `11px`, zIndex: 1 }
          if (node.selected) style.border = '1px solid red'
          return style
        },
        type: 'default',
        position: { x: x * 100, y: y * 50 },
        data: {
          randomData: Math.floor(Math.random() * 1e3),
        },
      })

      if (recentNodeId && nodeId <= xElements * yElements) {
        initialEdges.push({
          id: `${x}-${y}`,
          source: recentNodeId.toString(),
          target: nodeId.toString(),
          data: {
            randomData: Math.floor(Math.random() * 1e3),
          },
          style: (edge) => {
            if (edge.selected) return { stroke: '#10b981', strokeWidth: 3 }
          },
          animated: Math.random() > 0.5,
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
