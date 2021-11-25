<script lang="ts" setup>
import { VueFlow, Elements } from '~/index'

import './updatenode.css'

const initialElements: Elements = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref<Elements>(initialElements)
const opts = ref({
  bg: '#eee',
  name: 'Node 1',
  hidden: false,
})

const updateNode = () => {
  elements.value = elements.value.map((el) => {
    if (el.id === '1') {
      // it's important that you create a new object here in order to notify react flow about the change
      el.data = {
        ...el.data,
        label: opts.value.name,
      }
      el.style = { backgroundColor: opts.value.bg }
      el.isHidden = opts.value.hidden
    }

    return el
  })
}

onMounted(updateNode)
</script>
<template>
  <VueFlow v-model="elements" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
    <div class="updatenode__controls">
      <label>label:</label>
      <input v-model="opts.name" @input="updateNode" />

      <label class="updatenode__bglabel">background:</label>
      <input v-model="opts.bg" type="color" @input="updateNode" />

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input v-model="opts.hidden" type="checkbox" @change="updateNode" />
      </div>
    </div>
  </VueFlow>
</template>
