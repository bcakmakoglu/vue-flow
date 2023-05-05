<script lang="ts" setup>
import { BezierEdge, EdgeText, Position, getSimpleBezierPath, useVueFlow } from '@vue-flow/core'
import { computed, useAttrs } from 'vue'
import type { PathFindingEdgeProps } from '../types'
import { createGrid, gridRatio } from './createGrid'
import { drawSmoothLinePath } from './drawSvgPath'
import { generatePath } from './generatePath'
import { getBoundingBoxes } from './getBoundingBoxes'
import { gridToGraphPoint } from './pointConversion'

const props = withDefaults(defineProps<PathFindingEdgeProps>(), {
  selected: false,
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  labelStyle: () => ({}),
  labelShowBg: true,
  labelBgStyle: () => ({}),
})

const nodePadding = 10
const graphPadding = 20
const roundCoordinatesTo = gridRatio

const { getNodes } = useVueFlow()

const centered = computed(() =>
  getSimpleBezierPath({
    ...props,
  }),
)
const source = computed(() => ({
  x: props.sourceX,
  y: props.sourceY,
  position: props.sourcePosition,
}))

const target = computed(() => ({
  x: props.targetX,
  y: props.targetY,
  position: props.targetPosition,
}))

// We use the nodes' information to generate bounding boxes for them
// and the graph
const bb = computed(() => getBoundingBoxes(getNodes.value, nodePadding, graphPadding, roundCoordinatesTo))

const gridPath = computed(() => {
  let path: number[][] = []

  if (target.value.x && source.value.x && getNodes.value.length) {
    // We then can use the grid representation to do pathfinding
    // With this information, we can create a 2D grid representation of
    // our graph, that tells us where in the graph there is a "free" space or not
    const { grid, start, end } = createGrid(bb.value.graph, bb.value.nodes, source.value, target.value)
    path = generatePath(grid, start, end)
  }

  return path
})

const path = computed(() => {
  let svgPath = ''
  if (gridPath.value?.length) {
    // Here we convert the grid path to a sequence of graph coordinates.
    const graphPath = gridPath.value.map((gridPoint) => {
      const [x, y] = gridPoint
      const graphPoint = gridToGraphPoint({ x, y }, bb.value.graph.xMin, bb.value.graph.yMin)
      return [graphPoint.x, graphPoint.y]
    })

    // Finally, we can use the graph path to draw the edge
    svgPath = drawSmoothLinePath(source.value, target.value, graphPath)
  }

  return svgPath
})
const attrs: Record<string, any> = useAttrs()
</script>

<script lang="ts">
export default {
  name: 'PathFindingEdge',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
}
</script>

<template>
  <BezierEdge v-if="gridPath && gridPath.length <= 2" v-bind="{ ...props, ...attrs }" />
  <template v-else>
    <path
      :style="{ ...style, ...attrs.style }"
      class="vue-flow__edge-path"
      :d="path"
      :marker-end="markerEnd"
      :marker-start="markerStart"
    />
    <EdgeText
      v-if="label"
      :x="centered[1]"
      :y="centered[2]"
      :label="label as any"
      :label-style="labelStyle"
      :label-show-bg="labelShowBg"
      :label-bg-style="labelBgStyle"
      :label-bg-padding="labelBgPadding"
      :label-bg-border-radius="labelBgBorderRadius"
    />
  </template>
</template>
