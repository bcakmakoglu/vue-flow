<script setup>
import { h, ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { useDialog } from './useDialog'
import Dialog from './Dialog.vue'

const { onConnect, addEdges, onNodesChange, onEdgesChange, applyNodeChanges, applyEdgeChanges } = useVueFlow()

const dialog = useDialog()

const nodes = ref([
  { id: '1', type: 'input', data: { label: 'Click me and' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: `press 'Backspace' to delete me` }, position: { x: 0, y: 100 } },
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2' }])

function dialogMsg(id) {
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
    [`Are you sure?`, h('br'), h('span', `[ELEMENT_ID: ${id}]`)],
  )
}

onConnect(addEdges)

onNodesChange(async (changes) => {
  const nextChanges = []

  for (const change of changes) {
    if (change.type === 'remove') {
      const isConfirmed = await dialog.confirm(dialogMsg(change.id))

      if (isConfirmed) {
        nextChanges.push(change)
      }
    } else {
      nextChanges.push(change)
    }
  }

  applyNodeChanges(nextChanges)
})

onEdgesChange(async (changes) => {
  const nextChanges = []

  for (const change of changes) {
    if (change.type === 'remove') {
      const isConfirmed = await dialog.confirm(dialogMsg(change.id))

      if (isConfirmed) {
        nextChanges.push(change)
      }
    } else {
      nextChanges.push(change)
    }
  }

  applyEdgeChanges(nextChanges)
})
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :apply-default="false" fit-view-on-init class="confirm-flow">
    <Background />

    <Dialog />
  </VueFlow>
</template>
