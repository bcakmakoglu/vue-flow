<script lang="ts" setup>
import NodeWrapper from '../../components/Nodes/NodeWrapper.vue'
import { useVueFlow } from '../../composables'
import { NodeComponent } from '../../types'
import { Slots } from '../../context'

const { store } = useVueFlow()
const slots = inject(Slots)

const names: Record<string, string> = reactive({})

const getType = (name = 'default') => {
  const instance = getCurrentInstance()
  let nodeType = store.getNodeTypes[name]
  if (typeof nodeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        nodeType = resolveComponent(name, false) as NodeComponent
      }
    }
  }

  if (typeof nodeType !== 'string') {
    names[name] = name
    return nodeType
  }

  const slot = slots?.[`node-${name}`]
  if (!slot?.({})) {
    console.warn(`[vueflow]: Node type "${name}" not found and no node-slot detected. Using fallback type "default".`)
    names[name] = 'default'
    return store.getNodeTypes.default
  }

  names[name] = name
  return slot
}
</script>
<script lang="ts">
export default {
  name: 'Nodes',
}
</script>
<template>
  <div class="vue-flow__nodes vue-flow__container">
    <NodeWrapper
      v-for="node of store.getNodes"
      :id="node.id"
      :key="`vue-flow__node-${node.id}`"
      :node="node"
      :name="names[node.type] || 'default'"
      :draggable="typeof node.draggable === 'undefined' ? store.nodesDraggable : !!node.draggable"
      :selectable="typeof node.selectable === 'undefined' ? store.elementsSelectable : !!node.selectable"
      :connectable="typeof node.connectable === 'undefined' ? store.nodesConnectable : !!node.connectable"
      :snap-grid="node.snapGrid ?? (store.snapToGrid ? store.snapGrid : undefined)"
    >
      <template #default="props">
        <component :is="getType(node.type)" v-bind="props" />
      </template>
    </NodeWrapper>
  </div>
</template>
