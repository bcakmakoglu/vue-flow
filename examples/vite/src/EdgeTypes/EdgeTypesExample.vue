<script lang="ts" setup>
import { Controls, MiniMap, VueFlow } from '@vue-flow/core'

import { getElements } from './utils'

const elements = ref(getElements())
</script>

<template>
  <VueFlow v-model="elements" :min-zoom="0.2" fit-view-on-init>
    <MiniMap />
    <Controls />
  </VueFlow>
</template>
