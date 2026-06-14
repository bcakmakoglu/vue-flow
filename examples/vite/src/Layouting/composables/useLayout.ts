import type { Edge, Node } from '@vue-flow/core';
import dagre, { graphlib } from '@dagrejs/dagre';
import { Position, useVueFlow } from '@vue-flow/core';
import { shallowRef } from 'vue';

export type Direction = 'LR' | 'TB';

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
  const { getNode } = useVueFlow();

  // shallowRef: a dagre graph is an opaque class instance — deep-reactive unwrapping (`ref`) would both
  // be wasteful and strip the class's private members from its type
  const graph = shallowRef(new graphlib.Graph());

  function layout<NodeType extends Node, EdgeType extends Edge>(nodes: NodeType[], edges: EdgeType[], direction: Direction) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new graphlib.Graph();

    graph.value = dagreGraph;

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
      const graphNode = getNode(node.id);

      if (!graphNode) {
        console.error(`Node with id ${node.id} not found in the graph`);
        continue;
      }

      dagreGraph.setNode(node.id, { width: graphNode.measured?.width || 150, height: graphNode.measured?.height || 50 });
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target);
    }

    dagre.layout(dagreGraph);

    // set nodes with updated positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      return {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      };
    });
  }

  return { graph, layout };
}
