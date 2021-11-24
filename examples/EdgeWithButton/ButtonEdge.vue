<script lang="ts" setup>
import { getEdgeCenter, getBezierPath, getMarkerEnd, ArrowHeadType, ElementId, Position, useVueFlow, EdgeProps } from '~/index'

interface CustomEdgeProps<T = any> extends EdgeProps<T> {
  id: ElementId
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition: Position
  targetPosition: Position
  arrowHeadType?: ArrowHeadType
  markerEndId?: string
  data?: T
}

const props = defineProps<CustomEdgeProps>()
const store = useVueFlow()
const onEdgeClick = (evt: Event, id: string) => {
  const edge = store.getEdges.find((edge) => edge.id === id)
  if (edge) {
    store.hooks.elementsRemove.trigger([edge])
  }
  evt.stopPropagation()
  alert(`remove ${id}`)
}

const foreignObjectSize = 40

const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  }),
)
const markerEnd = computed(() => getMarkerEnd(props.arrowHeadType, props.markerEndId))
const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  }),
)
</script>
<template>
  <path :id="props.id" :style="props.style" class="vue-flow__edge-path" :d="edgePath" :marker-end="markerEnd" />
  <foreignObject
    :width="foreignObjectSize"
    :height="foreignObjectSize"
    :x="center[0] - foreignObjectSize / 2"
    :y="center[1] - foreignObjectSize / 2"
    class="edgebutton-foreignobject"
    requiredExtensions="http://www.w3.org/1999/xhtml"
  >
    <body>
      <button class="edgebutton" @click="(event) => onEdgeClick(event, props.id)">×</button>
    </body>
  </foreignObject>
</template>
<style>
.edgebutton {
  border-radius: 999px;
  cursor: pointer;
}
.edgebutton:hover {
  box-shadow: 0 0 0 2px pink, 0 0 0 4px #f05f75;
}
</style>
