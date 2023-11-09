import { getDimensions } from '@xyflow/system'

import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { useVueFlow } from './useVueFlow'
import { ErrorCode, VueFlowError } from '~/utils'

export function useResizeHandler(domNode: Ref<HTMLDivElement | null>) {
  const { emits, dimensions } = useVueFlow()

  onMounted(() => {
    const updateDimensions = () => {
      if (!domNode.value) {
        return false
      }

      const size = getDimensions(domNode.value)

      if (size.height === 0 || size.width === 0) {
        emits.error(new VueFlowError(ErrorCode.MISSING_VIEWPORT_DIMENSIONS))
      }

      dimensions.value = { width: size.width || 500, height: size.height || 500 }
    }

    if (domNode.value) {
      updateDimensions()

      window.addEventListener('resize', updateDimensions)

      const resizeObserver = new ResizeObserver(() => updateDimensions())
      resizeObserver.observe(domNode.value)

      onUnmounted(() => {
        window.removeEventListener('resize', updateDimensions)

        if (resizeObserver && domNode.value) {
          resizeObserver.unobserve(domNode.value)
        }
      })
    }
  })
}
