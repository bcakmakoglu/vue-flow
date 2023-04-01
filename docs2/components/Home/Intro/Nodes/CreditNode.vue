<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

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
    <button class="intro-link group bg-sky-500">Acknowledgement</button>
  </div>
  <Handle type="target" :position="Position.Top" />
</template>
