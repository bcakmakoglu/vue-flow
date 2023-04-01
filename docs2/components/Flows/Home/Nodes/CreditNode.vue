<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

import Heart from '~icons/mdi/heart'

function scrollTo() {
  const el = document.getElementById('acknowledgement')

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="flex" @click="scrollTo">
    <button class="intro-link group bg-sky-500"><Heart class="text-red-500" />Acknowledgement</button>
  </div>
  <Handle type="target" :position="Position.Top" />
</template>
