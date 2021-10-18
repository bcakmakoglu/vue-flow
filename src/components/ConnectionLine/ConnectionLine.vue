<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { ConnectionLineType, CustomConnectionLine, HandleElement, Position, RevueFlowStore, Node } from '~/types'
import { RevueFlowHooks } from '~/hooks/RevueFlowHooks'
import { getBezierPath, getSmoothStepPath } from '~/components/Edges/utils'

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

const store = inject<RevueFlowStore>('store')!
const hooks = inject<RevueFlowHooks>('hooks')!

const sourceHandle = computed(() =>
  store.connectionHandleId && store.connectionHandleType
    ? props.sourceNode.__rf.handleBounds[store.connectionHandleType].find((d: HandleElement) => d.id === store.connectionHandleId)
    : store.connectionHandleType && props.sourceNode.__rf.handleBounds[store.connectionHandleType][0],
)
const sourceHandleX = computed(() =>
  sourceHandle.value ? sourceHandle.value.x + sourceHandle.value.width / 2 : (props.sourceNode.__rf.width as number) / 2,
)
const sourceHandleY = computed(() =>
  sourceHandle.value ? sourceHandle.value.y + sourceHandle.value.height / 2 : props.sourceNode.__rf.height,
)
const sourceX = computed(() => props.sourceNode.__rf.position.x + sourceHandleX.value)
const sourceY = computed(() => props.sourceNode.__rf.position.y + sourceHandleY.value)

const targetX = computed(() => (store.connectionPosition?.x - store.transform[0]) / store.transform[2])
const targetY = computed(() => (store.connectionPosition?.y - store.transform[1]) / store.transform[2])

const isRightOrLeft = computed(
  () => sourceHandle.value?.position === Position.Left || sourceHandle.value?.position === Position.Right,
)
const targetPosition = computed(() => (isRightOrLeft.value ? Position.Left : Position.Top))

let dAttr = computed(() => `M${sourceX.value},${sourceY.value} ${targetX.value},${targetY.value}`)

if (props.connectionLineType === ConnectionLineType.Bezier) {
  dAttr = computed(() =>
    getBezierPath({
      sourceX: sourceX.value,
      sourceY: sourceY.value,
      sourcePosition: sourceHandle.value?.position,
      targetX: targetX.value,
      targetY: targetY.value,
      targetPosition: targetPosition.value,
    }),
  )
} else if (props.connectionLineType === ConnectionLineType.Step) {
  dAttr = computed(() =>
    getSmoothStepPath({
      sourceX: sourceX.value,
      sourceY: sourceY.value,
      sourcePosition: sourceHandle.value?.position,
      targetX: targetX.value,
      targetY: targetY.value,
      targetPosition: targetPosition.value,
      borderRadius: 0,
    }),
  )
} else if (props.connectionLineType === ConnectionLineType.SmoothStep) {
  dAttr = computed(() =>
    getSmoothStepPath({
      sourceX: sourceX.value,
      sourceY: sourceY.value,
      sourcePosition: sourceHandle.value?.position,
      targetX: targetX.value,
      targetY: targetY.value,
      targetPosition: targetPosition.value,
    }),
  )
}
watch(dAttr, () => console.log(dAttr.value))
</script>
<template>
  <g>
    <component
      :is="props.customConnectionLine"
      v-if="props.customConnectionLine"
      class="revue-flow__connection"
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
