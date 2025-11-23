<script setup>
import { ref } from 'vue'
import { Background } from '@vue-flow/background'
import { Panel, Position, VueFlow, useVueFlow } from '@vue-flow/core'
import LoopbackEdge from './LoopbackEdge.vue'

const { updateEdgeData, updateNode } = useVueFlow()

const nodes = ref([
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'I connect to myself' },
  },
])

const pathType = ref('bezier')

const isHorizontal = ref(false)

const edges = ref([{ id: 'e1-1', type: 'loopback', source: '1', target: '1', data: { pathType: pathType.value } }])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
    <template #edge-loopback="customEdgeProps">
      <LoopbackEdge
        :id="customEdgeProps.id"
        :source-x="customEdgeProps.sourceX"
        :source-y="customEdgeProps.sourceY"
        :target-x="customEdgeProps.targetX"
        :target-y="customEdgeProps.targetY"
        :source-position="customEdgeProps.sourcePosition"
        :target-position="customEdgeProps.targetPosition"
        :source-node="customEdgeProps.sourceNode"
        :target-node="customEdgeProps.targetNode"
        :data="customEdgeProps.data"
      />
    </template>

    <Background />

    <Panel>
      <select v-model="pathType" @change="updateEdgeData('e1-1', { pathType })">
        <option value="bezier">Bezier</option>
        <option value="smoothstep">Smoothstep</option>
      </select>

      <label for="is-horizontal"
        >{{ isHorizontal ? 'Vertical' : 'Horizontal' }}
        <input
          id="is-horizontal"
          v-model="isHorizontal"
          type="checkbox"
          @change="
            updateNode('1', {
              sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
              targetPosition: isHorizontal ? Position.Left : Position.Top,
            })
          "
        />
      </label>
    </Panel>
  </VueFlow>
</template>
