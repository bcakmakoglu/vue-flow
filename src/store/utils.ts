import { Edge, Elements, Node, NodeExtent } from '~/types'
import { isEdge, isNode, parseEdge, parseNode } from '~/utils'

type NextElements = {
  nextNodes: Node[]
  nextEdges: Edge[]
}

export const parseElements = (elements: Elements, nodes: Node[], edges: Edge[], nodeExtent: NodeExtent) => {
  const nextElements: NextElements = {
    nextNodes: [],
    nextEdges: [],
  }
  for (const element of elements) {
    if (isNode(element)) {
      const storeNode = nodes[nodes.map((x) => x.id).indexOf(element.id)]

      if (storeNode) {
        const updatedNode: Node = {
          ...storeNode,
          ...element,
        }
        if (!updatedNode.__rf) updatedNode.__rf = {}

        if (storeNode.position.x !== element.position.x || storeNode.position.y !== element.position.y) {
          updatedNode.__rf.position = element.position
        }

        if (typeof element.type !== 'undefined' && element.type !== storeNode.type) {
          // we reset the elements dimensions here in order to force a re-calculation of the bounds.
          // When the type of a node changes it is possible that the number or positions of handles changes too.
          updatedNode.__rf.width = undefined
        }

        nextElements.nextNodes.push(updatedNode)
      } else {
        nextElements.nextNodes.push(parseNode(element, nodeExtent))
      }
    } else if (isEdge(element)) {
      const storeEdge = edges[edges.map((x) => x.id).indexOf(element.id)]

      if (storeEdge) {
        nextElements.nextEdges.push({
          ...storeEdge,
          ...element,
        })
      } else {
        nextElements.nextEdges.push(parseEdge(element))
      }
    }
  }

  return nextElements
}
