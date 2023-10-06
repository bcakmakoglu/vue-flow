<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useBlobity } from '../utils'
import Intro from './flows/Intro.vue'

const { smaller } = useBreakpoints(breakpointsTailwind)

const isMobile = smaller('md')

const { blobity } = useBlobity()

onMounted(() => {
  if (isMobile.value) {
    blobity.value.destroy()
  }
})
</script>

<template>
  <div class="relative min-h-250 h-[calc(100vh-var(--vp-nav-height))] lg:min-h-100 lg:h-[calc(100vh-var(--vp-nav-height)-176px)]">
    <Intro />
  </div>
</template>

<style lang="scss">
.is-home {
  h1 {
    @apply text-2xl md:text-3xl xl:text-4xl mb-4 font-bold;
  }

  h2 {
    @apply mb-4;
  }

  p {
    @apply text-md lg:text-lg;
    line-height: inherit;
    margin: revert;
  }

  p ~ h1,
  p ~ h2 {
    @apply mt-6;
  }

  button:focus {
    outline: none;
  }
}
</style>
