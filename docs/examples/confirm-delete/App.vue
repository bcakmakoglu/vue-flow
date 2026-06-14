<script setup>
import { h, ref } from 'vue'
import { Background, VueFlow, useVueFlow } from '@vue-flow/core'
import { useDialog } from './useDialog'
import Dialog from './Dialog.vue'

const { onConnect, addEdges } = useVueFlow()

const dialog = useDialog()

const nodes = ref([
  { id: '1', type: 'input', data: { label: 'Click me and' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: `press 'Backspace' to delete me` }, position: { x: 0, y: 100 } },
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2' }])

function dialogMsg(ids) {
  return h(
    'span',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      },
    },
    [`Are you sure?`, h('br'), h('span', `[ELEMENTS: ${ids.join(', ')}]`)],
  )
}

onConnect(addEdges)

// `onBeforeDelete` is consulted once for the whole deletion (the node plus its connected edges) — return
// `false` to cancel or `true` to proceed, instead of intercepting individual change events.
async function onBeforeDelete({ nodes, edges }) {
  const ids = [...nodes.map((node) => node.id), ...edges.map((edge) => edge.id)]

  return dialog.confirm(dialogMsg(ids))
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :on-before-delete="onBeforeDelete" fit-view class="confirm-flow">
    <Background />

    <Dialog />
  </VueFlow>
</template>
