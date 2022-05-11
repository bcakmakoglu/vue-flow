<script lang="ts">
import type { Elements, FlowEvents, FlowInstance } from '@braks/vue-flow'
import { Background, Controls, MiniMap, VueFlow, addEdge, isNode } from '@braks/vue-flow'

export default defineComponent({
  name: 'BasicOptionsAPI',
  components: { VueFlow, Background, MiniMap, Controls },
  data() {
    return {
      instance: null as FlowInstance | null,
      elements: [
        { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
        { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
        { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
        { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3' },
      ] as Elements,
    }
  },
  methods: {
    logToObject() {
      console.log(this.instance?.toObject())
    },
    resetTransform() {
      this.instance?.setTransform({ x: 0, y: 0, zoom: 1 })
    },
    toggleclass() {
      this.elements.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
    },
    updatePos() {
      this.elements.forEach((el) => {
        if (isNode(el)) {
          el.position = {
            x: Math.random() * 400,
            y: Math.random() * 400,
          }
        }
      })
    },
    onNodeDragStop(e: FlowEvents['nodeDragStop']) {
      console.log('drag stop', e)
    },
    onPaneReady(instance: FlowEvents['paneReady']) {
      instance.fitView()
      this.instance = instance
    },
    onConnect(params: FlowEvents['connect']) {
      addEdge(params, this.elements)
    },
  },
})
</script>

<template>
  <VueFlow
    v-model="elements"
    class="vue-flow-basic-example"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    :zoom-on-scroll="false"
    @connect="onConnect"
    @pane-ready="onPaneReady"
    @node-drag-stop="onNodeDragStop"
  >
    <Background />
    <MiniMap />
    <Controls />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="resetTransform">reset transform</button>
      <button style="margin-right: 5px" @click="updatePos">change pos</button>
      <button style="margin-right: 5px" @click="toggleclass">toggle class</button>
      <button @click="logToObject">toObject</button>
    </div>
  </VueFlow>
</template>
