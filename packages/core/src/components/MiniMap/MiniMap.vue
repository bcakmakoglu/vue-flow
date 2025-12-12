<script lang="ts" setup>
import { zoom, zoomIdentity } from 'd3-zoom'
import type { D3ZoomEvent } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import { computed, provide, ref, toRef, useAttrs, watchEffect } from 'vue'
import type { CoordinateExtent, GraphNode } from '../../types'
import { useVueFlow } from '../../composables'
import { getBoundsofRects, getConnectedEdges, getRectOfNodes, isMacOs, wheelDelta } from '../../utils'
import Panel from '../Panel/Panel.vue'
import type { MiniMapEmits, MiniMapNodeFunc, MiniMapProps, MiniMapSlots, ShapeRendering } from './types'
import MiniMapNode from './MiniMapNode.vue'
import { Slots } from './types'

const {
  width,
  height,
  nodeStrokeColor = 'transparent',
  nodeColor = '#e2e2e2',
  nodeClassName,
  nodeBorderRadius = 5,
  nodeStrokeWidth = 2,
  maskColor = 'rgb(240, 240, 240, 0.6)',
  position = 'bottom-right',
  maskStrokeColor = 'none',
  maskStrokeWidth = 1,
  maskBorderRadius = 0,
  pannable = false,
  zoomable = false,
  ariaLabel = 'Vue Flow mini map',
  inversePan = false,
  zoomStep = 1,
  offsetScale = 5,
} = defineProps<MiniMapProps>()

const emit = defineEmits<MiniMapEmits>()

const slots = defineSlots<MiniMapSlots>()

const attrs: Record<string, any> = useAttrs()

const defaultWidth = 200
const defaultHeight = 150

const { id, edges, viewport, translateExtent, dimensions, emits, d3Selection, d3Zoom, getNodesInitialized } = useVueFlow()

const el = ref<SVGElement>()

provide(Slots, slots)

const elementWidth = toRef(() => width ?? attrs.style?.width ?? defaultWidth)

const elementHeight = toRef(() => height ?? attrs.style?.height ?? defaultHeight)

const shapeRendering: ShapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const nodeColorFunc = computed<MiniMapNodeFunc>(() => (typeof nodeColor === 'string' ? () => nodeColor : nodeColor))

const nodeStrokeColorFunc = computed<MiniMapNodeFunc>(() =>
  typeof nodeStrokeColor === 'string' ? () => nodeStrokeColor : nodeStrokeColor,
)

const nodeClassNameFunc = computed<MiniMapNodeFunc>(() =>
  typeof nodeClassName === 'string' ? () => nodeClassName : typeof nodeClassName === 'function' ? nodeClassName : () => '',
)

const bb = computed(() => getRectOfNodes(getNodesInitialized.value.filter((node) => !node.hidden)))

const viewBB = computed(() => ({
  x: -viewport.value.x / viewport.value.zoom,
  y: -viewport.value.y / viewport.value.zoom,
  width: dimensions.value.width / viewport.value.zoom,
  height: dimensions.value.height / viewport.value.zoom,
}))

const boundingRect = computed(() =>
  getNodesInitialized.value && getNodesInitialized.value.length ? getBoundsofRects(bb.value, viewBB.value) : viewBB.value,
)

const viewScale = computed(() => {
  const scaledWidth = boundingRect.value.width / elementWidth.value
  const scaledHeight = boundingRect.value.height / elementHeight.value

  return Math.max(scaledWidth, scaledHeight)
})

const viewBox = computed(() => {
  const viewWidth = viewScale.value * elementWidth.value
  const viewHeight = viewScale.value * elementHeight.value
  const offset = offsetScale * viewScale.value

  return {
    offset,
    x: boundingRect.value.x - (viewWidth - boundingRect.value.width) / 2 - offset,
    y: boundingRect.value.y - (viewHeight - boundingRect.value.height) / 2 - offset,
    width: viewWidth + offset * 2,
    height: viewHeight + offset * 2,
  }
})

const d = computed(() => {
  if (!viewBox.value.x || !viewBox.value.y) {
    return ''
  }

  return `
    M${viewBox.value.x - viewBox.value.offset},${viewBox.value.y - viewBox.value.offset}
    h${viewBox.value.width + viewBox.value.offset * 2}
    v${viewBox.value.height + viewBox.value.offset * 2}
    h${-viewBox.value.width - viewBox.value.offset * 2}z
    M${viewBB.value.x + maskBorderRadius},${viewBB.value.y}
    h${viewBB.value.width - 2 * maskBorderRadius}
    a${maskBorderRadius},${maskBorderRadius} 0 0 1 ${maskBorderRadius},${maskBorderRadius}
    v${viewBB.value.height - 2 * maskBorderRadius}
    a${maskBorderRadius},${maskBorderRadius} 0 0 1 -${maskBorderRadius},${maskBorderRadius}
    h${-(viewBB.value.width - 2 * maskBorderRadius)}
    a${maskBorderRadius},${maskBorderRadius} 0 0 1 -${maskBorderRadius},-${maskBorderRadius}
    v${-(viewBB.value.height - 2 * maskBorderRadius)}
    a${maskBorderRadius},${maskBorderRadius} 0 0 1 ${maskBorderRadius},-${maskBorderRadius}z`
})

watchEffect(
  (onCleanup) => {
    if (el.value) {
      const selection = select(el.value as Element)

      const zoomHandler = (event: D3ZoomEvent<SVGSVGElement, any>) => {
        if (event.sourceEvent.type !== 'wheel' || !d3Selection.value || !d3Zoom.value) {
          return
        }

        const factor = event.sourceEvent.ctrlKey && isMacOs() ? 10 : 1
        const pinchDelta =
          -event.sourceEvent.deltaY *
          (event.sourceEvent.deltaMode === 1 ? 0.05 : event.sourceEvent.deltaMode ? 1 : 0.002) *
          zoomStep
        const nextZoom = viewport.value.zoom * 2 ** (pinchDelta * factor)

        d3Zoom.value.scaleTo(d3Selection.value, nextZoom)
      }

      const panHandler = (event: D3ZoomEvent<HTMLDivElement, any>) => {
        if (event.sourceEvent.type !== 'mousemove' || !d3Selection.value || !d3Zoom.value) {
          return
        }

        const moveScale = viewScale.value * Math.max(1, viewport.value.zoom) * (inversePan ? -1 : 1)

        const position = {
          x: viewport.value.x - event.sourceEvent.movementX * moveScale,
          y: viewport.value.y - event.sourceEvent.movementY * moveScale,
        }

        const extent: CoordinateExtent = [
          [0, 0],
          [dimensions.value.width, dimensions.value.height],
        ]

        const nextTransform = zoomIdentity.translate(position.x, position.y).scale(viewport.value.zoom)
        const constrainedTransform = d3Zoom.value.constrain()(nextTransform, extent, translateExtent.value)

        d3Zoom.value.transform(d3Selection.value, constrainedTransform)
      }

      const zoomAndPanHandler = zoom()
        .wheelDelta((event) => wheelDelta(event) * (zoomStep / 10))
        .on('zoom', pannable ? panHandler : () => {})
        .on('zoom.wheel', zoomable ? zoomHandler : () => {})

      selection.call(zoomAndPanHandler)

      onCleanup(() => {
        selection.on('zoom', null)
      })
    }
  },
  { flush: 'post' },
)

function onSvgClick(event: MouseEvent) {
  const [x, y] = pointer(event)
  emit('click', { event, position: { x, y } })
}

function onNodeClick(event: MouseEvent, node: GraphNode) {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeClick(param)
  emit('nodeClick', param)
}

function onNodeDblClick(event: MouseEvent, node: GraphNode) {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeDoubleClick(param)
  emit('nodeDblclick', param)
}

function onNodeMouseEnter(event: MouseEvent, node: GraphNode) {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseEnter(param)
  emit('nodeMouseenter', param)
}

function onNodeMouseMove(event: MouseEvent, node: GraphNode) {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseMove(param)
  emit('nodeMousemove', param)
}

function onNodeMouseLeave(event: MouseEvent, node: GraphNode) {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseLeave(param)
  emit('nodeMouseleave', param)
}
</script>

<script lang="ts">
export default {
  name: 'MiniMap',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <Panel :class="{ pannable, zoomable }" :position="position" class="vue-flow__minimap">
    <svg
      ref="el"
      :width="elementWidth"
      :height="elementHeight"
      :viewBox="[viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(' ')"
      :aria-labelledby="`vue-flow__minimap-${id}`"
      role="img"
      @click="onSvgClick"
    >
      <title v-if="ariaLabel" :id="`vue-flow__minimap-${id}`">{{ ariaLabel }}</title>

      <MiniMapNode
        v-for="node of getNodesInitialized"
        :id="node.id"
        :key="node.id"
        :position="node.computedPosition"
        :dimensions="node.dimensions"
        :selected="node.selected"
        :dragging="node.dragging"
        :style="node.style"
        :class="nodeClassNameFunc(node)"
        :color="nodeColorFunc(node)"
        :border-radius="nodeBorderRadius"
        :stroke-color="nodeStrokeColorFunc(node)"
        :stroke-width="nodeStrokeWidth"
        :shape-rendering="shapeRendering"
        :type="node.type"
        :hidden="node.hidden"
        @click="onNodeClick($event, node)"
        @dblclick="onNodeDblClick($event, node)"
        @mouseenter="onNodeMouseEnter($event, node)"
        @mousemove="onNodeMouseMove($event, node)"
        @mouseleave="onNodeMouseLeave($event, node)"
      />

      <path
        :d="d"
        :fill="maskColor"
        :stroke="maskStrokeColor"
        :stroke-width="maskStrokeWidth"
        class="vue-flow__minimap-mask"
        fill-rule="evenodd"
      />
    </svg>
  </Panel>
</template>
