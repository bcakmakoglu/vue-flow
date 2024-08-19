import { onMounted } from 'vue'
import { useVueFlow } from './useVueFlow'

/**
 * Composable that handles the initialization of the viewport.
 *
 * @internal
 */
export function useOnInitHandler() {
  const vfInstance = useVueFlow()

  onMounted(() => {
    setTimeout(() => {
      vfInstance.emits.init(vfInstance)
    }, 1)
  })
}
