import { watch } from 'vue'
import { useVueFlow } from './useVueFlow'

export function useOnInitHandler() {
  const vfInstance = useVueFlow()

  watch(
    () => vfInstance.viewportHelper.value.viewportInitialized,
    (isInitialized) => {
      if (isInitialized) {
        setTimeout(() => {
          // todo: call these when *nodes* are initialized instead of the viewport
          // currently doesn't work quite right because the viewport dimensions are not yet available when the nodes are initialized
          if (!vfInstance.fitViewOnInitDone.value && vfInstance.fitViewOnInit.value) {
            vfInstance.fitView()
          }

          vfInstance.fitViewOnInitDone.value = true

          // Here, we are making all nodes visible once we have the dimensions.
          if (!document.querySelector('#vue-flow__initialized-styles')) {
            const style = document.createElement('style')
            style.id = 'vue-flow__initialized-styles'
            document.head.appendChild(style)

            const css = `.vue-flow__node { visibility: visible !important; }`
            style.appendChild(document.createTextNode(css))
          }

          vfInstance.emits.init(vfInstance)
          vfInstance.emits.paneReady(vfInstance)
        }, 1)
      }
    },
  )
}
