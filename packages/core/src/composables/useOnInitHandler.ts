import { watch } from 'vue'
import { useVueFlow } from './useVueFlow'

/**
 * Composable that handles the initialization of the viewport.
 *
 * @internal
 */
export function useOnInitHandler() {
  const vfInstance = useVueFlow()

  watch(
    () => vfInstance.viewportHelper.value.viewportInitialized,
    (isInitialized) => {
      if (isInitialized) {
        setTimeout(() => {
          vfInstance.emits.init(vfInstance)
          vfInstance.emits.paneReady(vfInstance)
        }, 1)
      }
    },
  )
}
