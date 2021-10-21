<script lang="ts" setup>
import { onMounted } from 'vue'
import { KeyCode, PanOnScrollMode } from '~/types'
import { useHooks, useStore, useZoom, useZoomPanHelper } from '~/composables'
import { onLoadGetElements, onLoadProject, onLoadToObject } from '~/utils/graph'

interface ZoomPaneProps {
  selectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  paneMoveable?: boolean
  defaultZoom?: number
  defaultPosition?: [number, number]
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
}

const props = withDefaults(defineProps<ZoomPaneProps>(), {
  selectionKeyCode: 'Shift',
  zoomActivationKeyCode: 'Meta',
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
})
const store = useStore()
const hooks = useHooks()

const zoomPaneEl = templateRef<HTMLDivElement>('zoom-pane', null)

const { width, height } = useElementBounding(zoomPaneEl)
store.dimensions = {
  width: width.value,
  height: height.value,
}

const { transform } = useZoom(zoomPaneEl, props)
store.transform = [transform.value.x, transform.value.y, transform.value.zoom]

watch(width, (val) => (store.dimensions.width = val))
watch(height, (val) => (store.dimensions.height = val))
watch(transform, (val) => (store.transform = [val.x, val.y, val.zoom]))

onMounted(() => {
  const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper()

  watchOnce(
    () => width.value && height.value,
    () => {
      hooks.load.trigger({
        fitView: (params = { padding: 0.1 }) => fitView(params),
        zoomIn,
        zoomOut,
        zoomTo,
        setTransform,
        project: onLoadProject(store),
        getElements: onLoadGetElements(store),
        toObject: onLoadToObject(store),
      })
    },
  )
})
</script>
<template>
  <div ref="zoom-pane" class="vue-flow__renderer vue-flow__zoompane">
    <slot v-bind="{ transform, dimensions: { width, height } }"></slot>
  </div>
</template>
