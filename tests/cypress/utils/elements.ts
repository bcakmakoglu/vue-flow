import type { Edge, Node } from '@vue-flow/core';

export function getElements(xElements = 10, yElements = 10) {
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  let nodeId = 1;
  let recentNodeId = null;

  for (let y = 0; y < yElements; y++) {
    for (let x = 0; x < xElements; x++) {
      initialNodes.push({
        id: nodeId.toString(),
        style: { width: '50px', fontSize: '11px', zIndex: 1 },
        type: 'default',
        position: { x: x * 100, y: y * 50 },
        data: {
          label: `Node ${nodeId}`,
          randomData: Math.floor(Math.random() * 1e3),
        },
      });

      if (recentNodeId && nodeId <= xElements * yElements) {
        initialEdges.push({
          id: `${x}-${y}`,
          source: recentNodeId.toString(),
          target: nodeId.toString(),
          data: {
            randomData: Math.floor(Math.random() * 1e3),
          },
          animated: Math.random() > 0.5,
        });
      }

      recentNodeId = nodeId;
      nodeId++;
    }
  }

  return {
    nodes: initialNodes,
    edges: initialEdges,
  };
}
