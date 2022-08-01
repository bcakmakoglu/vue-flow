<script lang="ts" setup>
import type { CSSProperties, EffectScope } from 'vue'
import EdgeWrapper from '../../components/Edges/Wrapper'
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue'
import { useEdgeHooks, useHandle, useVueFlow } from '../../composables'
import { connectionExists, groupEdgesByZLevel } from '../../utils'
import type { EdgeComponent, GraphEdge } from '../../types'
import { Slots } from '../../context'
import MarkerDefinitions from './MarkerDefinitions.vue'

const slots = inject(Slots)

const {
  emits,
  connectionMode,
  edgeUpdaterRadius,
  onPaneReady,
  connectionNodeId,
  nodesConnectable,
  connectionHandleType,
  edgesUpdatable,
  elementsSelectable,
  getSelectedNodes,
  nodesSelectionActive,
  getNode,
  getNodes,
  getEdges,
  getEdgeTypes,
  addSelectedEdges,
  noPanClassName,
  elevateEdgesOnSelect,
} = $(useVueFlow())

const selectable = (s?: boolean) => (typeof s === 'undefined' ? elementsSelectable : s)
const updatable = (u?: boolean) => (typeof u === 'undefined' ? edgesUpdatable : u)

const sourceNode = $(
  controlledComputed($$(connectionNodeId), () => {
    if (connectionNodeId) return getNode(connectionNodeId)
    return false
  }),
)

const connectionLineVisible = $(
  controlledComputed(
    $$(connectionNodeId),
    () =>
      !!(
        sourceNode &&
        (typeof sourceNode.connectable === 'undefined' ? nodesConnectable : sourceNode.connectable) &&
        connectionNodeId &&
        connectionHandleType
      ),
  ),
)

const hooks = $ref<Record<string, ReturnType<typeof useEdgeHooks>>>({})

let groups = $ref<ReturnType<typeof groupEdgesByZLevel>>([])

let scope: EffectScope | null = effectScope()

onPaneReady(() => {
  if (!scope) scope = effectScope()

  scope.run(() => {
    const edgeAmount = computed(() => getEdges.length)

    watch(
      [$$(getSelectedNodes), edgeAmount],
      () => {
        getEdges.forEach((edge) => {
          if (hooks[edge.id]) return
          hooks[edge.id] = useEdgeHooks(edge, emits)
        })

        if (elevateEdgesOnSelect) {
          nextTick(() => (groups = groupEdgesByZLevel(getEdges, getNode)))
        } else {
          groups = [
            {
              isMaxLevel: true,
              edges: getEdges,
              level: 0,
            },
          ]
        }
      },
      {
        immediate: true,
      },
    )
  })
})

onBeforeUnmount(() => {
  scope?.stop()
  scope = null
})

const getType = (type?: string, template?: GraphEdge['template']) => {
  const name = type || 'default'
  let edgeType = template ?? getEdgeTypes[name]
  const instance = getCurrentInstance()

  if (typeof edgeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        edgeType = resolveComponent(name, false) as EdgeComponent
      }
    }
  }
  if (edgeType && typeof edgeType !== 'string') return edgeType

  const slot = slots?.[`edge-${name}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Edge type "${type}" not found and no edge-slot detected. Using fallback type "default".`)
    return false
  }

  return slot
}

const onEdgeClick = (event: MouseEvent, edge: GraphEdge) => {
  const data = { event, edge }
  if (selectable(edge.selectable)) {
    $$(nodesSelectionActive).value = false

    addSelectedEdges([edge])
  }
  hooks[edge.id].emit.click(data)
}

const onEdgeContextMenu = (event: MouseEvent, edge: GraphEdge) => hooks[edge.id].emit.contextMenu({ event, edge })

const onDoubleClick = (event: MouseEvent, edge: GraphEdge) => hooks[edge.id].emit.doubleClick({ event, edge })

const onEdgeMouseEnter = (event: MouseEvent, edge: GraphEdge) => hooks[edge.id].emit.mouseEnter({ event, edge })

const onEdgeMouseMove = (event: MouseEvent, edge: GraphEdge) => hooks[edge.id].emit.mouseMove({ event, edge })

const onEdgeMouseLeave = (event: MouseEvent, edge: GraphEdge) => hooks[edge.id].emit.mouseLeave({ event, edge })

const onEdgeUpdaterSourceMouseDown = (event: MouseEvent, edge: GraphEdge) => handleEdgeUpdater(event, edge, true)

const onEdgeUpdaterTargetMouseDown = (event: MouseEvent, edge: GraphEdge) => handleEdgeUpdater(event, edge, false)

const { onMouseDown } = useHandle()

const handleEdgeUpdater = (event: MouseEvent, edge: GraphEdge, isSourceHandle: boolean) => {
  const nodeId = isSourceHandle ? edge.target : edge.source
  const handleId = (isSourceHandle ? edge.targetHandle : edge.sourceHandle) ?? ''

  hooks[edge.id].emit.updateStart({ event, edge })

  onMouseDown(
    event,
    handleId,
    nodeId,
    isSourceHandle,
    undefined,
    isSourceHandle ? 'target' : 'source',
    (connection) => {
      if (!connectionExists(connection, getEdges)) hooks[edge.id].emit.update({ edge, connection })
    },
    () => hooks[edge.id].emit.updateEnd({ event, edge }),
  )
}

const getClass = (edge: GraphEdge) => {
  const extraClass = edge.class instanceof Function ? edge.class(edge) : edge.class
  return [noPanClassName, extraClass]
}

const getStyle = (edge: GraphEdge) => (edge.style instanceof Function ? edge.style(edge) : edge.style) as CSSProperties
</script>

<script lang="ts">
export default {
  name: 'Edges',
}
</script>

<template>
  <svg v-for="group of groups" :key="group.level" class="vue-flow__edges vue-flow__container" :style="`z-index: ${group.level}`">
    <MarkerDefinitions v-if="group.isMaxLevel" />
    <g>
      <EdgeWrapper
        v-for="edge of group.edges"
        :id="edge.id"
        :key="edge.id"
        :type="getType(edge.type, edge.template)"
        :name="edge.type || 'default'"
        :source="edge.source"
        :target="edge.target"
        :target-handle-id="edge.targetHandle"
        :source-handle-id="edge.sourceHandle"
        :source-node="getNode(edge.source)"
        :target-node="getNode(edge.target)"
        :label="edge.label"
        :data="edge.data"
        :events="{ ...edge.events, ...hooks[edge.id].on }"
        :animated="edge.animated"
        :selectable="selectable(edge.selectable)"
        :selected="edge.selected"
        :updatable="updatable(edge.updatable)"
        :label-style="edge.labelStyle"
        :label-show-bg="edge.labelShowBg"
        :label-bg-style="edge.labelBgStyle"
        :label-bg-padding="edge.labelBgPadding"
        :label-bg-border-radius="edge.labelBgBorderRadius"
        :connection-mode="connectionMode"
        :edge-updater-radius="edgeUpdaterRadius"
        :marker-end="edge.markerEnd"
        :marker-start="edge.markerStart"
        :style="getStyle(edge)"
        :class="getClass(edge)"
        @click="onEdgeClick($event, edge)"
        @dblclick="onDoubleClick($event, edge)"
        @contextmenu="onEdgeContextMenu($event, edge)"
        @mouseenter="onEdgeMouseEnter($event, edge)"
        @mousemove="onEdgeMouseMove($event, edge)"
        @mouseleave="onEdgeMouseLeave($event, edge)"
        @source-mousedown="onEdgeUpdaterSourceMouseDown($event, edge)"
        @target-mousedown="onEdgeUpdaterTargetMouseDown($event, edge)"
      />
    </g>
  </svg>
  <svg v-if="connectionLineVisible && !!sourceNode" class="vue-flow__edges vue-flow__connectionline vue-flow__container">
    <ConnectionLine :source-node="sourceNode" />
  </svg>
</template>
