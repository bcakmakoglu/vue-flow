<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, Connection, Edge, NodeProps } from '~/index'

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
  <div class="revue-flow__node-color-selector">
    <Handle type="target" :position="Position.Left" :style="targetHandleStyle" :on-connect="onConnect" />
    <div>
      Custom Color Picker Node: <strong>{{ data.color }}</strong>
    </div>
    <input class="nodrag" type="color" :value="data.color" @input="props.data.onChange" />
    <Handle id="a" type="source" :position="Position.Right" :style="sourceHandleStyleA" />
    <Handle id="b" type="source" :position="Position.Right" :style="sourceHandleStyleB" />
  </div>
</template>
