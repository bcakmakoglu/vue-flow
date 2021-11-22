import { Connection, Edge, Elements, Node, NodeExtent, GraphNode, XYPosition, NextElements, FlowElement } from '~/types'

export default () =>
  useWebWorkerFn((elements: Elements, nodes: GraphNode[], edges: Edge[], nodeExtent: NodeExtent): NextElements => {
    const clamp = (val: number, min = 0, max = 1): number => Math.min(Math.max(val, min), max)

    const clampPosition = (position: XYPosition, extent: NodeExtent): XYPosition => ({
      x: clamp(position.x, extent[0][0], extent[1][0]),
      y: clamp(position.y, extent[0][1], extent[1][1]),
    })

    const parseNode = (node: Node, nodeExtent: NodeExtent): GraphNode =>
      Object.assign(node as GraphNode, {
        id: node.id.toString(),
        type: node.type || 'default',
        __vf: {
          position: clampPosition(node.position, nodeExtent),
          width: 0,
          height: 0,
          handleBounds: {},
          isDragging: false,
        },
      })

    const parseEdge = (edge: Edge): Edge =>
      Object.assign(edge, {
        source: edge.source.toString(),
        target: edge.target.toString(),
        sourceHandle: edge.sourceHandle ? edge.sourceHandle.toString() : null,
        targetHandle: edge.targetHandle ? edge.targetHandle.toString() : null,
        id: edge.id.toString(),
        type: edge.type || 'default',
      })

    const isEdge = (element: Node | FlowElement | Connection): element is Edge =>
      'id' in element && 'source' in element && 'target' in element

    const isNode = (element: Node | FlowElement | Connection): element is Node =>
      'id' in element && !('source' in element) && !('target' in element)

    const nextElements: NextElements = {
      nextNodes: [],
      nextEdges: [],
    }

    for (const element of elements) {
      if (isNode(element)) {
        const storeNode = nodes[nodes.map((x) => x.id).indexOf(element.id)]

        if (storeNode) {
          const updatedNode = Object.assign(storeNode, element)
          updatedNode.__vf!.position = element.position

          if (typeof element.type !== 'undefined' && element.type !== storeNode.type) {
            // we reset the elements dimensions here in order to force a re-calculation of the bounds.
            // When the type of a node changes it is possible that the number or positions of handles changes too.
            updatedNode.__vf!.width = 0
          }

          nextElements.nextNodes.push(updatedNode)
        } else {
          nextElements.nextNodes.push(parseNode(element, nodeExtent))
        }
      } else if (isEdge(element)) {
        const storeEdge = edges[edges.map((x) => x.id).indexOf(element.id)]

        if (storeEdge) {
          nextElements.nextEdges.push(Object.assign(storeEdge, element))
        } else {
          nextElements.nextEdges.push(parseEdge(element))
        }
      }
    }

    return nextElements
  })
