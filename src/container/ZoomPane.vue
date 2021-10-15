<script lang="ts" setup>
import { RevueFlowOptions, ConnectionLineType, ConnectionMode, Elements, PanOnScrollMode } from '~/types'
import useZoom from '~/composables/useZoom'
import useResizeHandler from '~/hooks/useResizeHandler'

interface RevueFlowProps extends RevueFlowOptions {
  modelValue: Elements
}

const props = withDefaults(defineProps<RevueFlowProps>(), {
  modelValue: () => [] as Elements,
  connectionMode: ConnectionMode.Strict,
  connectionLineType: ConnectionLineType.Bezier,
  selectionKeyCode: 'Shift',
  multiSelectionKeyCode: 'Meta',
  zoomActivationKeyCode: 'Meta',
  deleteKeyCode: 'Backspace',
  snapToGrid: false,
  snapGrid: () => [15, 15],
  onlyRenderVisibleElements: false,
  nodesConnectable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  minZoom: 0.5,
  maxZoom: 2,
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  translateExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  nodeExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  arrowHeadColor: '#b1b1b7',
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,
})
const zoomPane = templateRef<HTMLDivElement>('zoom-pane', null)
const transform = useZoom(zoomPane, props)
const dimensions = useResizeHandler(zoomPane)
</script>
<template>
  <div ref="zoom-pane" class="revue-flow__renderer revue-flow__zoompane">
    <slot :transform="transform" :dimensions="dimensions"></slot>
  </div>
</template>
