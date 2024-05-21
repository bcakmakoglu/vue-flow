import { onMounted } from 'vue'
import { ErrorCode, VueFlowError, isDev } from '../utils'
import { useVueFlow } from './useVueFlow'

export function useStylesLoadedWarning() {
  const { emits } = useVueFlow()

  onMounted(() => {
    if (isDev()) {
      const pane = document.querySelector('.vue-flow__pane')

      if (pane && !(window.getComputedStyle(pane).zIndex === '1')) {
        emits.error(new VueFlowError(ErrorCode.MISSING_STYLES))
      }
    }
  })
}
