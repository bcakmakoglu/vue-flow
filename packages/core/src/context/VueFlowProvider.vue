<script lang="ts" setup>
import { inject } from 'vue'
import { useVueFlow } from '../composables'
import { VueFlow } from './'

const hasInjection = inject(VueFlow, null)

if (!hasInjection) {
  useVueFlow()
}
</script>

<template>
  <slot />
</template>
