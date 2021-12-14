<script lang="ts" setup>
import { VueFlow, MiniMap, Controls, Elements } from '~/index'

const initialElements: Elements = [
  { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 100 } },
  { id: '4', label: 'Node 4', position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
]

const elements = ref<Elements>(initialElements)
const isHidden = ref(false)

watchEffect(() => {
  elements.value.forEach((e) => {
    e.hidden = isHidden.value
    return e
  })
})
</script>
<template>
  <VueFlow v-model="elements">
    <MiniMap />
    <Controls />

    <div :style="{ position: 'absolute', left: '10px', top: '10px', zIndex: 4 }">
      <div>
        <label for="ishidden">
          isHidden
          <input id="ishidden" v-model="isHidden" type="checkbox" class="vue-flow__ishidden" />
        </label>
      </div>
    </div>
  </VueFlow>
</template>
