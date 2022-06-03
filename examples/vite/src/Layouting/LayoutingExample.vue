<script lang="ts" setup>
import dagre from 'dagre'
import type { CoordinateExtent, Elements } from '@braks/vue-flow'
import { ConnectionMode, Controls, Position, VueFlow, isNode } from '@braks/vue-flow'
import initialElements from './initial-elements'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeExtent: CoordinateExtent = [
  [0, -100],
  [1000, 500],
]

const elements = ref<Elements>(initialElements)

const onLayout = (direction: string) => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  elements.value.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: 150, height: 50 })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)

  elements.value.forEach((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)
      el.targetPosition = isHorizontal ? Position.Left : Position.Top
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom
      el.position = { x: nodeWithPosition.x, y: nodeWithPosition.y }
    }
  })
}
</script>

<template>
  <div class="layoutflow">
    <VueFlow v-model="elements" :node-extent="nodeExtent" :connection-mode="ConnectionMode.Loose" @pane-ready="onLayout('TB')">
      <Controls />
    </VueFlow>
    <div class="controls">
      <button :style="{ marginRight: 10 }" @click="onLayout('TB')">vertical layout</button>
      <button @click="onLayout('LR')">horizontal layout</button>
    </div>
  </div>
</template>

<style>
@import 'layouting.css';
</style>
