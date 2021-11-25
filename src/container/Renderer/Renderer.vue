<script lang="ts" setup>
import { useStore, useWindow, useZoomPanHelper } from '~/composables'
import { Elements, FlowInstance } from '~/types'
import { onLoadGetElements, onLoadProject, onLoadToObject } from '~/utils'

interface RendererProps {
  elements: Elements
}

const props = defineProps<RendererProps>()
const store = useStore()

// if there are preloaded elements we overwrite the current elements with the stored ones and reset the stored elements (so we can properly parse them)
const hasInitialElements = store.elements.length
const initialElements = hasInitialElements ? store.elements : props.elements
if (hasInitialElements) store.elements = []

await store.setElements(initialElements)
store.isReady = true

nextTick(async () => {
  // if ssr we can't wait for dimensions, they'll never really exist
  const window = useWindow()
  if ('screen' in window)
    await until(store.dimensions).toMatch(({ height, width }) => !isNaN(width) && width > 0 && !isNaN(height) && height > 0)

  const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper(store)
  const instance: FlowInstance = {
    fitView: (params = { padding: 0.1 }) => fitView(params),
    zoomIn,
    zoomOut,
    zoomTo,
    setTransform,
    project: onLoadProject(store),
    getElements: onLoadGetElements(store),
    toObject: onLoadToObject(store),
  }
  store.hooks.load.trigger(instance)
  store.instance = instance
})
</script>
<script lang="ts">
export default {
  name: 'Renderer',
}
</script>
<template>
  <slot />
</template>
