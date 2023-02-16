<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useBlobity } from '../utils'
import Intro from './flows/Intro.vue'

const { smaller } = useBreakpoints(breakpointsTailwind)

const isMobile = smaller('md')

const { blobity, reset } = useBlobity()

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
  if (isMobile.value) {
    blobity.value.destroy()
  }
})
</script>

<template>
  <div class="relative h-[calc(100vh-var(--vp-nav-height-mobile))] lg:h-[calc(100vh-var(--vp-nav-height))]">
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
