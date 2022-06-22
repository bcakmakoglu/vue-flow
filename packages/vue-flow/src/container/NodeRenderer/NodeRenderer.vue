<script lang="ts" setup>
import { NodeWrapper } from '../../components'
import type { GraphNode, NodeComponent, SnapGrid } from '../../types'
import { useVueFlow } from '../../composables'
import { Slots } from '../../context'

const slots = inject(Slots)

const {
  nodesDraggable,
  elementsSelectable,
  nodesConnectable,
  noPanClassName,
  snapToGrid,
  snapGrid,
  getNode,
  getNodes,
  getNodeTypes,
} = $(useVueFlow())

const draggable = (d?: boolean) => (typeof d === 'undefined' ? nodesDraggable : d)
const selectable = (s?: boolean) => (typeof s === 'undefined' ? elementsSelectable : s)
const connectable = (c?: boolean) => (typeof c === 'undefined' ? nodesConnectable : c)

const getType = (type?: string, template?: GraphNode['template']) => {
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
  if (!slot?.({})) {
    console.warn(`[vueflow]: Node type "${type}" not found and no node-slot detected. Using fallback type "default".`)
    return false
  }

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
      v-for="node of getNodes"
      :id="node.id"
      :key="node.id"
      :type="getType(node.type, node.template)"
      :name="node.type || 'default'"
      :draggable="draggable(node.draggable)"
      :selectable="selectable(node.selectable)"
      :connectable="connectable(node.connectable)"
    />
  </div>
</template>
