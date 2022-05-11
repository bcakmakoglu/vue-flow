<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Blobity from 'blobity'
import Intro from './flows/Intro.vue'

const dark = useDark({
  selector: 'html',
})

const breakpoints = useBreakpoints(breakpointsTailwind)

onMounted(() => {
  if (!breakpoints.isSmaller('md')) {
    const blobity = new Blobity({
      color: dark.value ? '#ffffff' : '#000000',
      invert: true,
      zIndex: 0,
      magnetic: false,
      dotColor: '#10b981',
      radius: 8,
      focusableElementsOffsetX: 2,
      focusableElementsOffsetY: 2,
      mode: 'bouncy',
    })

    onBeforeUnmount(() => {
      blobity.destroy()
    })
  }
})
</script>

<template>
  <div class="relative h-[90vh] md:h-[75vh]">
    <Intro />
  </div>
</template>

<style>
button:focus {
  outline: none;
}

h1 {
  @apply text-xl lg:text-4xl mb-4 font-bold;
}

h2 {
  @apply text-lg lg:text-2xl mb-4 font-semibold;
}

p {
  @apply text-md lg:text-lg;
}

p ~ h1,
p ~ h2 {
  @apply mt-6;
}
</style>
