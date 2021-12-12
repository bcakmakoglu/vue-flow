import { getCurrentInstance } from 'vue'
import { EdgeChange, FlowOptions, GraphEdge, GraphNode, NodeChange, UseVueFlow } from '~/types'
import { applyChanges } from '~/utils'
import { VueFlow } from '~/context'
import { useStore } from '~/store'

const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)
const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)

export default (options?: FlowOptions): UseVueFlow => {
  const currentInstance = getCurrentInstance()
  let vueFlow = currentInstance ? inject(VueFlow, undefined) : false
  if (!vueFlow || (vueFlow && options?.id && options.id !== vueFlow.store.id)) {
    const store = reactive(useStore(options))
    vueFlow = {
      store,
      useNodesState: (nodes) => {
        store.setNodes(nodes)
        return store.nodes
      },
      useEdgesState: (edges) => {
        store.setEdges(edges)
        return store.edges
      },
      applyNodeChanges: (changes) => applyNodeChanges(changes, store.nodes),
      applyEdgeChanges: (changes) => applyEdgeChanges(changes, store.edges),
      ...store.hooksOn,
    }
  }
  if (currentInstance) provide(VueFlow, vueFlow)

  return vueFlow
}
