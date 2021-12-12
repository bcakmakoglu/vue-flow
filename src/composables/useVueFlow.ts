import { getCurrentInstance } from 'vue'
import { EdgeChange, FlowOptions, GraphEdge, GraphNode, NodeChange, UseVueFlow } from '~/types'
import { applyChanges } from '~/utils'
import { VueFlow } from '~/context'
import { useStore } from '~/store'

const applyNodeChanges = (changes: NodeChange[], nodes: GraphNode[]) => applyChanges(changes, nodes)
const applyEdgeChanges = (changes: EdgeChange[], edges: GraphEdge[]) => applyChanges(changes, edges)

export default (options?: FlowOptions): UseVueFlow => {
  const currentInstance = getCurrentInstance()
  let vueFlow: UseVueFlow | false | undefined = currentInstance ? inject(VueFlow, undefined) : false
  if (!vueFlow || (vueFlow && options?.id && options.id !== vueFlow.store.id)) {
    const store = reactive(useStore(options))
    const applyNodes = (changes: NodeChange[]) => applyNodeChanges(changes, store.nodes)
    const applyEdges = (changes: EdgeChange[]) => applyEdgeChanges(changes, store.edges)
    vueFlow = {
      id: store.id,
      store,
      useNodesState: (nodes) => {
        store.setNodes(nodes)
        return {
          nodes: store.nodes,
          setNodes: store.setNodes,
          OnNodesChange: (applyDefault = false) => {
            if (applyDefault) store.hooksOn.OnNodesChange((e) => applyNodes(e))
            return store.hooksOn.OnNodesChange
          },
        }
      },
      useEdgesState: (edges) => {
        store.setEdges(edges)
        return {
          edges: store.edges,
          setEdges: store.setEdges,
          OnEdgesChange: (applyDefault = false) => {
            if (applyDefault) store.hooksOn.OnEdgesChange((e) => applyEdges(e))
            return store.hooksOn.OnEdgesChange
          },
        }
      },
      applyNodeChanges: applyNodes,
      applyEdgeChanges: applyEdges,
      ...store.hooksOn,
    }
  }
  if (currentInstance) provide(VueFlow, vueFlow)

  return vueFlow
}
