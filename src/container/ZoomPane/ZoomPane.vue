<script lang="ts" setup>
import { KeyCode, PanOnScrollMode } from '~/types'
import { useZoom, useResizeHandler, useZoomPanHelper } from '~/composables'
import { Hooks, Store } from '~/context'
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
const store = inject(Store)!
const hooks = inject(Hooks)!

const zoomPaneEl = templateRef<HTMLDivElement>('zoom-pane', null)
const { transform } = useZoom(zoomPaneEl, props)
watch(transform, (val) => (store.transform = val), { flush: 'post' })
const dimensions = useResizeHandler(zoomPaneEl)
watch(dimensions, (val) => (store.dimensions = val), { flush: 'post' })

const { zoomIn, zoomOut, zoomTo, transform: setTransform, fitView } = useZoomPanHelper()
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
</script>
<template>
  <div ref="zoom-pane" class="revue-flow__renderer revue-flow__zoompane">
    <slot :transform="transform" :dimensions="dimensions"></slot>
  </div>
</template>
