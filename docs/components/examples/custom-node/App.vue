<script setup>
import { ConnectionMode, MiniMap, Position, VueFlow, useVueFlow } from '@vue-flow/core'
import { computed, h, onMounted, ref } from 'vue'
import ColorSelectorNode from './CustomNode.vue'
import { presets } from './presets.js'

const { getNode } = useVueFlow()

const outputColorNode = computed(() => getNode.value('3'))

const elements = ref([])

const gradient = ref(false)
const bgColor = ref(presets.ayame)
const bgName = ref('AYAME')

const connectionLineStyle = { stroke: '#fff' }

// minimap stroke color functions
const nodeStroke = (n) => {
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'custom') return presets.sumi
  if (n.type === 'output') return '#ff0072'
  return '#eee'
}

const nodeColor = (n) => {
  if (n.type === 'custom') return bgColor.value
  return '#fff'
}

// output labels
const outputColorLabel = () => h('div', {}, bgColor.value)
const outputNameLabel = () => h('div', {}, bgName.value)

const onChange = (color) => {
  gradient.value = false
  bgColor.value = color.value
  bgName.value = color.name

  outputColorNode.value.hidden = false
}

const onGradient = () => {
  gradient.value = true
  bgColor.value = null
  bgName.value = 'gradient'

  outputColorNode.value.hidden = true
}

onMounted(() => {
  elements.value = [
    {
      id: '1',
      type: 'custom',
      data: { color: bgColor },
      position: { x: 0, y: 50 },
    },
    {
      id: '2',
      type: 'output',
      label: outputNameLabel,
      position: { x: 350, y: 25 },
      targetPosition: Position.Left,
    },
    {
      id: '3',
      type: 'output',
      label: outputColorLabel,
      position: { x: 350, y: 200 },
      targetPosition: Position.Left,
    },
    {
      id: 'e1a-2',
      source: '1',
      sourceHandle: 'a',
      target: '2',
      animated: true,
      style: () => ({
        stroke: bgColor.value,
        filter: 'invert(100%)',
      }),
    },
    {
      id: 'e1b-3',
      source: '1',
      sourceHandle: 'b',
      target: '3',
      animated: true,
      style: () => ({
        stroke: bgColor.value,
        filter: 'invert(100%)',
      }),
    },
  ]
})
</script>

<template>
  <VueFlow
    v-model="elements"
    class="customnodeflow"
    :class="[gradient ? 'animated-bg-gradient' : '']"
    :style="{ backgroundColor: bgColor }"
    :connection-mode="ConnectionMode.Loose"
    :connection-line-style="connectionLineStyle"
    :default-zoom="1.5"
    :fit-view-on-init="true"
  >
    <template #node-custom="props">
      <ColorSelectorNode :data="props.data" @change="onChange" @gradient="onGradient" />
    </template>

    <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
  </VueFlow>
</template>
