import type { Plugin, VueFlowStore } from '@vue-flow/core'
import { Position, useVueFlow } from '@vue-flow/core'
import dagre from 'dagre'
import type { Direction } from './types'

const createDagreState = (store: VueFlowStore) => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  function layout(direction: Direction) {
    const isHorizontal = direction === 'LR' || direction === 'RL'
    dagreGraph.setGraph({ rankdir: direction })

    store.nodes.value.forEach((node) => {
      dagreGraph.setNode(node.id, { width: node.dimensions.width, height: node.dimensions.height })
    })

    store.edges.value.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    store.nodes.value.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      node.targetPosition = isHorizontal ? Position.Left : Position.Top
      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom
      node.position = { x: nodeWithPosition.x, y: nodeWithPosition.y }
    })
  }

  return {
    dagreGraph,
    layout,
  }
}

export const PluginDagreLayout: Plugin = (hooks) => {
  hooks.created((store) => {
    store.dagre = createDagreState(store)
  })
}

export function useDagreLayout() {
  return useVueFlow().dagre
}
