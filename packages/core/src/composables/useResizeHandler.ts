import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { ErrorCode, VueFlowError, getDimensions } from '../utils'
import { useVueFlow } from './useVueFlow'
import { useWindow } from './useWindow'

export function useResizeHandler(viewportEl: Ref<HTMLDivElement | null>): void {
  const window = useWindow()

  const { emits, dimensions } = useVueFlow()

  let resizeObserver: ResizeObserver

  onMounted(() => {
    const rendererNode = viewportEl.value

    const updateDimensions = () => {
      if (!rendererNode) {
        return
      }

      const size = getDimensions(rendererNode)

      if (size.width === 0 || size.height === 0) {
        emits.error(new VueFlowError(ErrorCode.MISSING_VIEWPORT_DIMENSIONS))
      }

      dimensions.value = { width: size.width || 500, height: size.height || 500 }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    if (rendererNode) {
      resizeObserver = new ResizeObserver(() => updateDimensions())
      resizeObserver.observe(rendererNode)
    }

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateDimensions)

      if (resizeObserver && rendererNode) {
        resizeObserver.unobserve(rendererNode!)
      }
    })
  })
}
