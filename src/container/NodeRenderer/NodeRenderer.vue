<script lang="ts" setup>
import { useStore } from '../../composables'
import { SnapGrid } from '../../types'
import Node from '../../components/Nodes/NodeWrapper.vue'

interface NodeRendererProps {
  selectNodesOnDrag?: boolean
  snapToGrid?: boolean
  snapGrid?: SnapGrid
}

const props = withDefaults(defineProps<NodeRendererProps>(), {
  selectNodesOnDrag: true,
})

const store = useStore()

const transform = computed(() => `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`)
const snapGrid = computed(() => (props.snapToGrid || store.snapToGrid ? props.snapGrid ?? store.snapGrid : undefined))
</script>
<script lang="ts">
export default {
  name: 'Node',
}
</script>
<template>
  <div class="vue-flow__nodes" :style="{ transform }">
    <Node
      v-for="node of store.getNodes"
      :id="node.id"
      :key="node.id"
      :node="node"
      :vf="node.__vf"
      :position="node.position"
      :type="node.type"
      :class="node.class"
      :style="node.style"
      :data="node.data"
      :target-position="node.targetPosition"
      :source-position="node.sourcePosition"
      :is-hidden="node.isHidden"
      :draggable="node.draggable"
      :selectable="node.selectable"
      :connectable="node.connectable"
      :drag-handle="node.dragHandle"
      :snap-grid="snapGrid"
      :select-nodes-on-drag="props.selectNodesOnDrag"
    >
      <template #default="nodeProps">
        <slot :name="`node-${node.type}`" v-bind="nodeProps"></slot>
      </template>
    </Node>
  </div>
</template>
