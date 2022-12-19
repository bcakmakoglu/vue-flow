import type { Plugin, VueFlowStore } from '@vue-flow/core'
import { Position, useVueFlow } from '@vue-flow/core'
import { layout as dagreLayout, graphlib } from 'dagre'
import type { Ref, WatchStopHandle } from 'vue'
import { onScopeDispose, ref, unref, watch } from 'vue'
import type { Direction } from './types'

const createDagreState = (store: VueFlowStore) => {
  const dagreGraph = new graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  const layoutDirection = ref<Direction>()

  function layout(direction?: Direction) {
    const isHorizontal = direction === 'LR' || direction === 'RL'
    dagreGraph.setGraph({ rankdir: direction })

    store.getNodesInitialized.value.forEach((node) => {
      dagreGraph.setNode(node.id, { width: node.dimensions.width, height: node.dimensions.height })
    })

    store.getEdges.value.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })

    dagreLayout(dagreGraph)

    store.getNodesInitialized.value.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)

      node.targetPosition = isHorizontal ? Position.Left : Position.Top
      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom

      node.position = { x: nodeWithPosition.x, y: nodeWithPosition.y }
    })
  }

  return {
    dagreGraph,
    layout,
    direction: layoutDirection,
  }
}

export const PluginDagreLayout: Plugin = (hooks) => {
  hooks.created((store) => {
    store.dagre = createDagreState(store)
  })
}

export function useDagreLayout(autoLayout?: Ref<boolean> | boolean) {
  const { dagre, getNodesInitialized, getEdges } = useVueFlow()

  const stop = watch(
    () => unref(autoLayout),
    (shouldAutoLayout, _, onCleanup) => {
      let stop: WatchStopHandle | undefined
      if (shouldAutoLayout) {
        stop = watch(
          [getNodesInitialized, getEdges, () => getNodesInitialized.value.length, () => getEdges.value.length],
          () => {
            dagre.layout(dagre.direction.value)
          },
          { immediate: true },
        )
      }

      onCleanup(() => stop?.())
    },
    { immediate: true },
  )

  onScopeDispose(stop)

  return dagre
}
