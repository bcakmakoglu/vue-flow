import type { CustomEvent, ElementData } from '~/types'

/**
 * Access a node, it's parent (if one exists) and connected edges
 *
 * If no node id is provided, the node id is injected from context
 *
 * Meaning if you do not provide an id, this composable has to be called in a child of your custom node component, or it will throw
 */
export default function useNode<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any>(id?: string) {
  const nodeId = id ?? inject(NodeId, '')
  const nodeEl = inject(NodeRef, null)

  const { findNode, getEdges } = useVueFlow()

  const node = findNode<Data, CustomEvents>(nodeId)

  if (!node) {
    throw new VueFlowError(`Node with id ${nodeId} not found!`, 'useNode')
  }

  return {
    id: nodeId,
    nodeEl,
    node,
    parentNode: computed(() => (node.parentNode ? findNode(node.parentNode) : undefined)),
    connectedEdges: computed(() => getConnectedEdges([node], getEdges.value)),
  }
}
