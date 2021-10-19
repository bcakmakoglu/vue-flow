<script lang="ts" setup>
import Flow, { MiniMap, Controls, Connection, Edge, Elements, addEdge } from '~/index'

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
] as Elements

const elements = ref<Elements>(initialElements)
const isHidden = ref<boolean>(false)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

watchEffect(() => {
  console.log(isHidden.value)
  elements.value = elements.value.map((e) => {
    e.isHidden = isHidden.value
    return e
  })
})

const toggle = (event: any) => {
  console.log(event.target)
  isHidden.value = event.target?.checked
}
</script>
<template>
  <Flow :elements="elements" :on-connect="onConnect">
    <MiniMap />
    <Controls />

    <div :style="{ position: 'absolute', left: '10px', top: '10px', zIndex: 4 }">
      <div>
        <label for="ishidden">
          isHidden
          <input id="ishidden" v-model="isHidden" type="checkbox" class="revue-flow__ishidden" />
        </label>
      </div>
    </div>
  </Flow>
</template>
