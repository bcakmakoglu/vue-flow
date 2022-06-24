<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Blobity from 'blobity'
import Intro from './flows/Intro.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const usesDark = useDark({
  storageKey: 'vuepress-color-scheme',
  selector: 'html',
})

const dark = ref(false)

onMounted(() => {
  const html = document.getElementsByTagName('html')![0]

  usesDark.value = html.classList.contains('dark')

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      dark.value = html.classList.contains('dark')
    }
  })

  observer.observe(html, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  })
})

onMounted(() => {
  if (!breakpoints.isSmaller('md')) {
    const blobity = new Blobity({
      color: dark.value ? '#ffffff' : '#000000',
      invert: true,
      zIndex: 0,
      magnetic: false,
      dotColor: '#10b981',
      radius: 8,
      focusableElementsOffsetX: 5,
      focusableElementsOffsetY: 4,
      mode: 'normal',
      focusableElements:
        '[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip], .back-to-top, .intro',
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
