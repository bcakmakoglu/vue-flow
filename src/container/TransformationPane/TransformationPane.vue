<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useVueFlow, useZoomPanHelper } from '../../composables'
import { FlowInstance } from '../../types'
import { onLoadGetEdges, onLoadGetElements, onLoadGetNodes, onLoadProject, onLoadToObject } from '../../utils'

const { id, store } = useVueFlow()

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)

onMounted(async () => {
  const { zoomIn, zoomOut, zoomTo, setTransform, getTransform, fitView, fitBounds, setCenter } = useZoomPanHelper(store)
  const instance: FlowInstance = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    getTransform,
    setCenter,
    fitBounds,
    project: onLoadProject(store),
    getElements: onLoadGetElements(store),
    getNodes: onLoadGetNodes(store),
    getEdges: onLoadGetEdges(store),
    toObject: onLoadToObject(store),
  }
  store.instance = instance
  store.fitViewOnInit && instance.fitView()
  store.paneReady = true
  store.hooks.paneReady.trigger(instance)
})
</script>
<template>
  <div :key="`transformation-pane-${id}`" class="vue-flow__transformation-pane vue-flow__container" :style="{ transform }">
    <NodeRenderer v-if="store.getNodes.length" :key="`node-renderer-${id}`">
      <template
        v-for="nodeName of Object.keys(store.getNodeTypes)"
        #[`node-${nodeName}`]="nodeProps"
        :key="`node-${nodeName}-${id}`"
      >
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
    </NodeRenderer>
    <EdgeRenderer :key="`edge-renderer-${id}`">
      <template
        v-for="edgeName of Object.keys(store.getEdgeTypes)"
        #[`edge-${edgeName}`]="edgeProps"
        :key="`edge-${edgeName}-${id}`"
      >
        <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
      </template>
      <template #connection-line="customConnectionLineProps">
        <slot name="connection-line" v-bind="customConnectionLineProps" />
      </template>
    </EdgeRenderer>
    <slot />
  </div>
</template>
