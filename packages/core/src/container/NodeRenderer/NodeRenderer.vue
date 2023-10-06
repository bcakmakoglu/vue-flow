<script lang="ts" setup>
import { getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, ref, resolveComponent } from 'vue'
import { until } from '@vueuse/core'
import { NodeWrapper } from '../../components'
import type { GraphNode, HandleConnectable, NodeComponent } from '../../types'
import { Slots } from '../../context'
import { useVueFlow } from '../../composables'
import { ErrorCode, VueFlowError } from '../../utils'

const slots = inject(Slots)

const {
  nodesDraggable,
  nodesFocusable,
  elementsSelectable,
  nodesConnectable,
  getNodes,
  getNodesInitialized,
  areNodesInitialized,
  getNodeTypes,
  updateNodeDimensions,
  emits,
} = useVueFlow()

const resizeObserver = ref<ResizeObserver>()

const instance = getCurrentInstance()

until(() => areNodesInitialized.value)
  .toBe(true)
  .then(() => {
    nextTick(() => {
      emits.nodesInitialized(getNodesInitialized.value)
    })
  })

onMounted(() => {
  resizeObserver.value = new ResizeObserver((entries) => {
    const updates = entries.map((entry) => {
      const id = entry.target.getAttribute('data-id') as string

      return {
        id,
        nodeElement: entry.target as HTMLDivElement,
        forceUpdate: true,
      }
    })

    nextTick(() => updateNodeDimensions(updates))
  })
})

onBeforeUnmount(() => resizeObserver.value?.disconnect())

function draggable(nodeDraggable?: boolean) {
  return typeof nodeDraggable === 'undefined' ? nodesDraggable.value : nodeDraggable
}
function selectable(nodeSelectable?: boolean) {
  return typeof nodeSelectable === 'undefined' ? elementsSelectable.value : nodeSelectable
}
function connectable(nodeConnectable?: HandleConnectable) {
  return typeof nodeConnectable === 'undefined' ? nodesConnectable.value : nodeConnectable
}
function focusable(nodeFocusable?: boolean) {
  return typeof nodeFocusable === 'undefined' ? nodesFocusable.value : nodeFocusable
}

function getType(type?: string, template?: GraphNode['template']) {
  const name = type || 'default'

  const slot = slots?.[`node-${name}`]
  if (slot) {
    return slot
  }

  let nodeType = template ?? getNodeTypes.value[name]

  if (typeof nodeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        nodeType = resolveComponent(name, false) as NodeComponent
      }
    }
  }

  if (nodeType && typeof nodeType !== 'string') {
    return nodeType
  }

  emits.error(new VueFlowError(ErrorCode.NODE_TYPE_MISSING, nodeType))

  return false
}
</script>

<script lang="ts">
export default {
  name: 'Nodes',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <div class="vue-flow__nodes vue-flow__container">
    <template v-if="resizeObserver">
      <NodeWrapper
        v-for="node of getNodes"
        :id="node.id"
        :key="node.id"
        :resize-observer="resizeObserver"
        :type="getType(node.type, node.template)"
        :name="node.type || 'default'"
        :draggable="draggable(node.draggable)"
        :selectable="selectable(node.selectable)"
        :connectable="connectable(node.connectable)"
        :focusable="focusable(node.focusable)"
        :node="node"
      />
    </template>
  </div>
</template>
