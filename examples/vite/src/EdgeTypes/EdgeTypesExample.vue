<script lang="ts" setup>
import { VueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import { getElements } from './utils'

const elements = ref(getElements())
</script>

<template>
  <VueFlow v-model="elements" :min-zoom="0.2" fit-view-on-init>
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
