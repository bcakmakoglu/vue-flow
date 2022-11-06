<script lang="ts" setup>
import type { GraphNode } from '@vue-flow/core'
import { getBoundsofRects, getConnectedEdges, getRectOfNodes, useVueFlow } from '@vue-flow/core'
import { zoom, zoomIdentity } from 'd3-zoom'
import type { D3ZoomEvent } from 'd3-zoom'
import { pointer, select } from 'd3-selection'
import type { PanelPosition } from '../panel'
import { Panel } from '../panel'
import type { MiniMapNodeFunc, MiniMapProps, ShapeRendering } from './types'
import MiniMapNode from './MiniMapNode'

const {
  width,
  height,
  nodeStrokeColor = 'transparent',
  nodeColor = '#e2e2e2',
  nodeClassName,
  nodeBorderRadius = 5,
  nodeStrokeWidth = 2,
  maskColor = 'rgb(240, 240, 240, 0.6)',
  position = 'bottom-right' as PanelPosition,
  pannable = false,
  zoomable = false,
} = defineProps<MiniMapProps>()

const emit = defineEmits(['click', 'nodeClick', 'nodeDblclick', 'nodeMouseenter', 'nodeMousemove', 'nodeMouseleave'])

const attrs: Record<string, any> = useAttrs()

const defaultWidth = 200
const defaultHeight = 150

const { id, edges, viewport, dimensions, emits, getNodes, d3Selection, d3Zoom } = useVueFlow()

const el = ref<SVGElement>()

const elementWidth = computed(() => width ?? attrs.style?.width ?? defaultWidth)

const elementHeight = computed(() => height ?? attrs.style?.height ?? defaultHeight)

const shapeRendering: ShapeRendering = typeof window === 'undefined' || !!window.chrome ? 'crispEdges' : 'geometricPrecision'

const nodeColorFunc = computed<MiniMapNodeFunc>(() => (nodeColor instanceof Function ? nodeColor : () => nodeColor as string))

const nodeStrokeColorFunc = computed<MiniMapNodeFunc>(() =>
  nodeStrokeColor instanceof Function ? nodeStrokeColor : () => nodeStrokeColor as string,
)

const nodeClassNameFunc = computed<MiniMapNodeFunc>(() =>
  nodeClassName instanceof Function ? nodeClassName : ((() => nodeClassName) as MiniMapNodeFunc),
)

const bb = computed(() => getRectOfNodes(getNodes.value))

const viewBB = computed(() => ({
  x: -viewport.value.x / viewport.value.zoom,
  y: -viewport.value.y / viewport.value.zoom,
  width: dimensions.value.width / viewport.value.zoom,
  height: dimensions.value.height / viewport.value.zoom,
}))

const boundingRect = computed(() => (getNodes && getNodes.value.length ? getBoundsofRects(bb.value, viewBB.value) : viewBB.value))

const viewScale = computed(() => {
  const scaledWidth = boundingRect.value.width / elementWidth.value
  const scaledHeight = boundingRect.value.height / elementHeight.value

  return Math.max(scaledWidth, scaledHeight)
})

const viewBox = computed(() => {
  const viewWidth = viewScale.value * elementWidth.value
  const viewHeight = viewScale.value * elementHeight.value
  const offset = 5 * viewScale.value

  return {
    offset,
    x: boundingRect.value.x - (viewWidth - boundingRect.value.width) / 2 - offset,
    y: boundingRect.value.y - (viewHeight - boundingRect.value.height) / 2 - offset,
    width: viewWidth + offset * 2,
    height: viewHeight + offset * 2,
  }
})

const d = computed(() => {
  if (!viewBox.value.x || !viewBox.value.y) return ''

  return `
    M${viewBox.value.x - viewBox.value.offset},${viewBox.value.y - viewBox.value.offset}
    h${viewBox.value.width + viewBox.value.offset * 2}
    v${viewBox.value.height + viewBox.value.offset * 2}
    h${-viewBox.value.width - viewBox.value.offset * 2}z
    M${viewBB.value.x},${viewBB.value.y}
    h${viewBB.value.width}
    v${viewBB.value.height}
    h${-viewBB.value.width}z`
})

watchEffect(
  (onCleanup) => {
    if (el.value) {
      const selection = select(el.value as Element)

      const zoomHandler = (event: D3ZoomEvent<SVGSVGElement, any>) => {
        if (event.sourceEvent.type !== 'wheel' || !d3Selection.value || !d3Zoom.value) {
          return
        }

        const pinchDelta =
          -event.sourceEvent.deltaY * (event.sourceEvent.deltaMode === 1 ? 0.05 : event.sourceEvent.deltaMode ? 1 : 0.002) * 10
        const zoom = viewport.value.zoom * 2 ** pinchDelta

        d3Zoom.value.scaleTo(d3Selection.value, zoom)
      }

      const panHandler = (event: D3ZoomEvent<HTMLDivElement, any>) => {
        if (event.sourceEvent.type !== 'mousemove' || !d3Selection.value || !d3Zoom.value) {
          return
        }

        const position = {
          x: viewport.value.x - event.sourceEvent.movementX * viewScale.value * Math.max(1, viewport.value.zoom),
          y: viewport.value.y - event.sourceEvent.movementY * viewScale.value * Math.max(1, viewport.value.zoom),
        }

        const nextTransform = zoomIdentity.translate(position.x, position.y).scale(viewport.value.zoom)

        d3Zoom.value.transform(d3Selection.value, nextTransform)
      }

      const zoomAndPanHandler = zoom()
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

const onSvgClick = (event: MouseEvent) => {
  const [x, y] = pointer(event)
  emit('click', { event, position: { x, y } })
}

const onNodeClick = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeClick(param)
  emit('nodeClick', param)
}

const onNodeDblClick = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeDoubleClick(param)
  emit('nodeDblclick', param)
}

const onNodeMouseEnter = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseEnter(param)
  emit('nodeMouseenter', param)
}

const onNodeMouseMove = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseMove(param)
  emit('nodeMousemove', param)
}

const onNodeMouseLeave = (event: MouseEvent, node: GraphNode) => {
  const param = { event, node, connectedEdges: getConnectedEdges([node], edges.value) }
  emits.miniMapNodeMouseLeave(param)
  emit('nodeMouseleave', param)
}
</script>

<script lang="ts">
export default {
  name: 'MiniMap',
}
</script>

<template>
  <Panel :position="position" class="vue-flow__minimap" :class="{ pannable, zoomable }">
    <svg
      ref="el"
      :width="elementWidth"
      :height="elementHeight"
      :viewBox="[viewBox.x, viewBox.y, viewBox.width, viewBox.height].join(' ')"
      role="img"
      :aria-labelledby="`vue-flow__minimap-${id}`"
      @click="onSvgClick"
    >
      <title :id="`vue-flow__minimap-${id}`">Vue Flow mini map {{ id }}</title>
      <MiniMapNode
        v-for="node of getNodes"
        :id="node.id"
        :key="node.id"
        :position="node.computedPosition"
        :dimensions="node.dimensions"
        :style="node.style"
        :class="nodeClassNameFunc(node)"
        :color="nodeColorFunc(node)"
        :border-radius="nodeBorderRadius"
        :stroke-color="nodeStrokeColorFunc(node)"
        :stroke-width="nodeStrokeWidth"
        :shape-rendering="shapeRendering"
        @click="onNodeClick($event, node)"
        @dblclick="onNodeDblClick($event, node)"
        @mouseenter="onNodeMouseEnter($event, node)"
        @mousemove="onNodeMouseMove($event, node)"
        @mouseleave="onNodeMouseLeave($event, node)"
      >
        <slot
          :id="node.id"
          :name="`node-${node.type}`"
          :parent-node="node.parentNode"
          :selected="node.selected"
          :position="node.computedPosition"
          :dimensions="node.dimensions"
          :style="node.style"
          :class="nodeClassNameFunc(node)"
          :color="nodeColorFunc(node)"
          :border-radius="nodeBorderRadius"
          :stroke-color="nodeStrokeColorFunc(node)"
          :stroke-width="nodeStrokeWidth"
          :shape-rendering="shapeRendering"
        />
      </MiniMapNode>

      <path class="vue-flow__minimap-mask" :style="pannable ? 'cursor: grab' : ''" :d="d" :fill="maskColor" fill-rule="evenodd" />
    </svg>
  </Panel>
</template>
