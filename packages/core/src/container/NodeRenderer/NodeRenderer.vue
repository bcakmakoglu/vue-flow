<script lang="ts" setup>
import { NodeWrapper } from '../../components'
import type { GraphNode, HandleConnectable, NodeComponent } from '../../types'

const slots = inject(Slots)

const {
  nodesDraggable,
  nodesFocusable,
  elementsSelectable,
  nodesConnectable,
  getNodes,
  getNodesInitialized,
  getNodeTypes,
  updateNodeDimensions,
  emits,
} = $(useVueFlow())

let resizeObserver = $ref<ResizeObserver>()

until(() => getNodes.length > 0 && getNodesInitialized.length === getNodes.length)
  .toBe(true)
  .then(() => {
    nextTick(() => {
      emits.nodesInitialized(getNodesInitialized)
    })
  })

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    const updates = entries.map((entry) => {
      const id = entry.target.getAttribute('data-id') as string

      return {
        id,
        nodeElement: entry.target as HTMLDivElement,
        forceUpdate: true,
      }
    })

    updateNodeDimensions(updates)
  })
})

onBeforeUnmount(() => resizeObserver?.disconnect())

function draggable(nodeDraggable?: boolean) {
  return typeof nodeDraggable === 'undefined' ? nodesDraggable : nodeDraggable
}
function selectable(nodeSelectable?: boolean) {
  return typeof nodeSelectable === 'undefined' ? elementsSelectable : nodeSelectable
}
function connectable(nodeConnectable?: HandleConnectable) {
  return typeof nodeConnectable === 'undefined' ? nodesConnectable : nodeConnectable
}
function focusable(nodeFocusable?: boolean) {
  return typeof nodeFocusable === 'undefined' ? nodesFocusable : nodeFocusable
}

function getType(type?: string, template?: GraphNode['template']) {
  const name = type || 'default'
  let nodeType = template ?? getNodeTypes[name]
  const instance = getCurrentInstance()

  if (typeof nodeType === 'string') {
    if (instance) {
      const components = Object.keys(instance.appContext.components)
      if (components && components.includes(name)) {
        nodeType = resolveComponent(name, false) as NodeComponent
      }
    }
  }
  if (typeof nodeType !== 'string') return nodeType

  const slot = slots?.[`node-${name}`]
  if (!slot) {
    emits.error(new VueFlowError(ErrorCode.NODE_TYPE_MISSING, nodeType))
    return false
  }

  return slot
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
