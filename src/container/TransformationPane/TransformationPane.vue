<script lang="ts" setup>
import NodeRenderer from '../NodeRenderer/NodeRenderer.vue'
import EdgeRenderer from '../EdgeRenderer/EdgeRenderer.vue'
import { useVueFlow } from '../../composables'

const { store } = useVueFlow()
</script>
<template>
  <div
    class="vue-flow__transformation-pane vue-flow__container"
    :style="{ transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})` }"
  >
    <NodeRenderer :key="`node-renderer-${store.id}`">
      <template
        v-for="nodeName of Object.keys(store.getNodeTypes)"
        #[`node-${nodeName}`]="nodeProps"
        :key="`node-${nodeName}-${store.id}`"
      >
        <slot :name="`node-${nodeName}`" v-bind="nodeProps" />
      </template>
    </NodeRenderer>
    <EdgeRenderer :key="`edge-renderer-${store.id}`">
      <template
        v-for="edgeName of Object.keys(store.getEdgeTypes)"
        #[`edge-${edgeName}`]="edgeProps"
        :key="`edge-${edgeName}-${store.id}`"
      >
        <slot :name="`edge-${edgeName}`" v-bind="edgeProps" />
      </template>
      <template #connection-line="customConnectionLineProps">
        <slot name="connection-line" v-bind="customConnectionLineProps" />
      </template>
    </EdgeRenderer>
  </div>
</template>
