import { watch } from 'vue'
import { useVueFlow } from './useVueFlow'

export function useOnInitHandler() {
  const vfInstance = useVueFlow()

  watch(vfInstance.viewportInitialized, (isInitialized) => {
    if (isInitialized) {
      setTimeout(() => {
        vfInstance.emits.paneReady(vfInstance)
      }, 1)
    }
  })
}
