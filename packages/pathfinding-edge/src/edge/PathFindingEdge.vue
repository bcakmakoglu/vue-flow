<script lang="ts" setup>
import type { Position } from '@vue-flow/core'
import { BezierEdge, EdgeText, getSimpleBezierPath, useVueFlow } from '@vue-flow/core'
import type { PathFindingEdgeProps } from '../types'
import { createGrid, gridRatio } from './createGrid'
import { drawSmoothLinePath } from './drawSvgPath'
import { generatePath } from './generatePath'
import { getBoundingBoxes } from './getBoundingBoxes'
import { gridToGraphPoint } from './pointConversion'

const props = withDefaults(defineProps<PathFindingEdgeProps>(), {
  selected: false,
  sourcePosition: 'bottom' as Position,
  targetPosition: 'top' as Position,
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
const attrs: any = useAttrs()
</script>

<script lang="ts">
export default {
  name: 'PathFindingEdge',
  inheritAttrs: false,
}
</script>

<template>
  <BezierEdge v-if="gridPath && gridPath.length <= 2" v-bind="{ ...props, ...attrs }" />
  <template v-else>
    <path
      :style="{ ...props.style, ...attrs.style }"
      class="vue-flow__edge-path"
      :d="path"
      :marker-end="props.markerEnd"
      :marker-start="props.markerStart"
    />
    <EdgeText
      v-if="props.label"
      :x="centered[1]"
      :y="centered[2]"
      :label="props.label"
      :label-style="props.labelStyle"
      :label-show-bg="props.labelShowBg"
      :label-bg-style="props.labelBgStyle"
      :label-bg-padding="props.labelBgPadding"
      :label-bg-border-radius="props.labelBgBorderRadius"
    />
  </template>
</template>
