<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { ConnectionLineType, CustomConnectionLine, HandleElement, Node, Position } from '~/types'
import { getBezierPath, getSmoothStepPath } from '~/components/Edges/utils'
import { Hooks, Store } from '~/context/symbols'

interface ConnectionLineProps {
  sourceNode: Node
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  customConnectionLine?: CustomConnectionLine
}

const props = withDefaults(defineProps<ConnectionLineProps>(), {
  connectionLineType: ConnectionLineType.Bezier,
  connectionLineStyle: () => ({}),
})

const hooks = inject(Hooks)!
const store = inject(Store)!

const sourceHandle =
  store.connectionHandleId && store.connectionHandleType
    ? props.sourceNode.__rf.handleBounds[store.connectionHandleType].find((d: HandleElement) => d.id === store.connectionHandleId)
    : store.connectionHandleType && props.sourceNode.__rf.handleBounds[store.connectionHandleType][0]
const sourceHandleX = sourceHandle ? sourceHandle.x + sourceHandle.width / 2 : (props.sourceNode.__rf.width as number) / 2
const sourceHandleY = sourceHandle ? sourceHandle.y + sourceHandle.height / 2 : props.sourceNode.__rf.height
const sourceX = props.sourceNode.__rf.position.x + sourceHandleX
const sourceY = props.sourceNode.__rf.position.y + sourceHandleY

const isRightOrLeft = sourceHandle.position === Position.Left || sourceHandle.position === Position.Right
const targetPosition = isRightOrLeft ? Position.Left : Position.Top

const targetX = computed(() => (store.connectionPosition.x - store.transform[0]) / store.transform[2])
const targetY = computed(() => (store.connectionPosition.y - store.transform[1]) / store.transform[2])

const dAttr = computed(() => {
  let path = `M${sourceX.value},${sourceY.value} ${targetX.value},${targetY.value}`
  switch (props.connectionLineType) {
    case ConnectionLineType.Bezier:
      path = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle.position,
        targetX: targetX.value,
        targetY: targetY.value,
        targetPosition,
      })
      break
    case ConnectionLineType.Step:
      path = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle.position,
        targetX: targetX.value,
        targetY: targetY.value,
        targetPosition,
        borderRadius: 0,
      })
      break
    case ConnectionLineType.SmoothStep:
      path = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: sourceHandle.position,
        targetX: targetX.value,
        targetY: targetY.value,
        targetPosition,
      })
      break
  }
  return path
})
</script>
<template>
  <g class="revue-flow__connection">
    <component
      :is="props.customConnectionLine"
      v-if="props.customConnectionLine"
      v-bind="{
        sourceX: sourceX,
        sourceY: sourceY,
        sourcePosition: sourceHandle.position,
        targetX: targetX,
        targetY: targetY,
        targetPosition: targetPosition,
        connectionLineType: props.connectionLineType,
        connectionLineStyle: props.connectionLineStyle,
      }"
    />
    <path v-else :d="dAttr" class="revue-flow__connection-path" :style="props.connectionLineStyle" />
  </g>
</template>
