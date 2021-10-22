<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, Connection, Edge, NodeProps } from '@braks/vue-flow'

interface ColorSelectorNodeProps extends NodeProps {
  data: {
    color: string
    onChange: (event: any) => void
  }
  type: string
  selected?: boolean
  connectable?: boolean
  xPos?: number
  yPos?: number
  targetPosition?: Position
  sourcePosition?: Position
  dragging?: boolean
}
const props = defineProps<ColorSelectorNodeProps>()

const targetHandleStyle: CSSProperties = { background: '#555' }
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: '10px' }
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: '10px', top: 'auto' }

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params)
</script>
<template>
  <div class="py-1 px-1 flex flex-col gap-1 justify-center items-center">
    <Handle type="target" :position="Position.Left" :style="targetHandleStyle" :on-connect="onConnect" />
    <div class="text-md font-bold">Custom Color Picker Node</div>
    <div :style="{ color: data.color }" class="text-md font-semibold">
      {{ data.color }}
    </div>
    <input class="nodrag" type="color" :value="data.color" @input="props.data.onChange" />
    <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" />
    <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" />
  </div>
</template>
