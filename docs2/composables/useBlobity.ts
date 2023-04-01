import Blobity from 'blobity'
import type { InjectionKey, Ref } from 'vue'
import { isClient } from '@vueuse/core'

const BlobityInjection: InjectionKey<Ref<Blobity>> = Symbol('blobity')

const defaultOptions = {
  licenseKey: 'opensource',
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
} as const

export const useBlobity = createSharedComposable(() => {
  const blobity = ref(isClient ? new Blobity(defaultOptions) : null)

  provide(BlobityInjection, blobity)

  const { y } = useWindowScroll()

  onBeforeUnmount(() => {
    blobity.value?.destroy()
  })

  function reset() {
    blobity.value?.reset()
    blobity.value?.updateOptions(defaultOptions)
  }

  watch(y, () => {
    blobity.value?.bounce()
  })

  return { blobity, reset }
})
