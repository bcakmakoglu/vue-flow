import { defineComponent, isRef } from 'vue'
import type { FlowProps } from '../../types'
import { isDef } from '../../utils'
import { useVueFlow } from '../../composables'

export const StoreUpdater = defineComponent({
  props: ['opts'],
  setup: (updaterProps: { opts: FlowProps }) => {
    const store = useVueFlow()

    return () => {
      const props = updaterProps.opts

      if (props.maxZoom && isDef(props.maxZoom)) {
        store.setMaxZoom(props.maxZoom)
      }

      if (props.minZoom && isDef(props.minZoom)) {
        store.setMinZoom(props.minZoom)
      }

      if (props.translateExtent && isDef(props.translateExtent)) {
        store.setTranslateExtent(props.translateExtent)
      }

      if (props.nodeExtent && isDef(props.nodeExtent)) {
        store.setNodeExtent(props.nodeExtent)
      }

      if (isDef(props.applyDefault)) {
        store.applyDefault.value = props.applyDefault
      }

      const skip: (keyof typeof props)[] = [
        'id',
        'modelValue',
        'translateExtent',
        'nodeExtent',
        'edges',
        'nodes',
        'maxZoom',
        'minZoom',
        'applyDefault',
        'autoConnect',
      ]

      for (const key of Object.keys(props)) {
        const propKey = key as keyof typeof props
        if (!skip.includes(propKey)) {
          const storeRef = store[propKey as keyof typeof store]

          if (isRef(storeRef)) {
            if (isDef(props[propKey])) {
              ;(storeRef.value as any) = props[propKey]
            }
          }
        }
      }
    }
  },
})
