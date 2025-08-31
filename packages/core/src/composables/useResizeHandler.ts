import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { ErrorCode, VueFlowError, getDimensions } from '../utils'
import { useVueFlow } from './useVueFlow'

/**
 * Composable that handles the resize of the viewport.
 *
 * @internal
 * @param viewportEl
 */
export function useResizeHandler(viewportEl: Ref<HTMLDivElement | null>): void {
  const { emits, dimensions } = useVueFlow()

  let resizeObserver: ResizeObserver

  onMounted(() => {
    const updateDimensions = () => {
      if (!viewportEl.value || !(viewportEl.value.checkVisibility() ?? true)) {
        return
      }

      const size = getDimensions(viewportEl.value)

      if (size.width === 0 || size.height === 0) {
        emits.error(new VueFlowError(ErrorCode.MISSING_VIEWPORT_DIMENSIONS))
      }

      dimensions.value = { width: size.width || 500, height: size.height || 500 }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    if (viewportEl.value) {
      resizeObserver = new ResizeObserver(() => updateDimensions())
      resizeObserver.observe(viewportEl.value)
    }

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateDimensions)

      if (resizeObserver && viewportEl.value) {
        resizeObserver.unobserve(viewportEl.value!)
      }
    })
  })
}
