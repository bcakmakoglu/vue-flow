<script lang="ts" setup>
import { KeyCode, PanOnScrollMode, RevueFlowStore } from '~/types'
import useZoom from '~/composables/useZoom'
import useResizeHandler from '~/hooks/useResizeHandler'
import useZoomPanHelper from '~/hooks/useZoomPanHelper'

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
const store = inject<RevueFlowStore>('store')!
const zoomPaneEl = templateRef<HTMLDivElement>('zoom-pane', null)
const { transform, d3Selection, d3Zoom } = useZoom(zoomPaneEl, props, (initD3ZoomPayload) => store.initD3Zoom(initD3ZoomPayload))

watch(transform, (val) => (store.transform = val), { flush: 'post' })
const dimensions = useResizeHandler(zoomPaneEl)
watch(dimensions, (val) => (store.dimensions = val), { flush: 'post' })

const getZoomPanHelper = reactify(useZoomPanHelper)
const zoomPanHelper = getZoomPanHelper(
  d3Zoom,
  d3Selection,
  store.nodes,
  transform,
  dimensions,
  store.minZoom,
  store.maxZoom,
  store.snapToGrid,
  store.snapGrid,
)
</script>
<template>
  <div ref="zoom-pane" class="revue-flow__renderer revue-flow__zoompane">
    <slot :transform="transform" :dimensions="dimensions"></slot>
  </div>
</template>
