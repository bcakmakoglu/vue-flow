import { computed } from 'vue'
import { fitViewport, getViewportForBounds, pointToRendererPoint, rendererPointToPoint } from '@xyflow/system'
import type { Edge, Node, NodeLookup, State, ViewportFunctions, ViewportPositionFunc } from '../types'
import { warn } from '../utils'

export interface ViewportHelper extends ViewportFunctions {
  viewportInitialized: boolean
  screenToFlowPosition: ViewportPositionFunc
  flowToScreenPosition: ViewportPositionFunc
}

const DEFAULT_PADDING = 0.1

async function noop() {
  warn('Viewport not initialized yet.')

  return false
}

const initialViewportHelper: ViewportHelper = {
  zoomIn: noop,
  zoomOut: noop,
  zoomTo: noop,
  fitView: noop,
  setCenter: noop,
  fitBounds: noop,
  screenToFlowPosition: (position) => position,
  flowToScreenPosition: (position) => position,
  setViewport: noop,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: false,
}

/**
 * Composable that provides viewport helper functions.
 *
 * @internal
 * @param state
 */
export function useViewportHelper<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  state: State<NodeType, EdgeType>,
  nodeLookup: NodeLookup<NodeType>,
) {
  return computed<ViewportHelper>(() => {
    const panZoom = state.panZoom
    const isInitialized = state.panZoom && state.dimensions.width && state.dimensions.height

    if (!isInitialized) {
      return initialViewportHelper
    }

    return {
      viewportInitialized: true,
      // todo: allow passing scale as option
      zoomIn: async (options) => (panZoom ? panZoom.scaleBy(1.2, options) : false),
      zoomOut: async (options) => (panZoom ? panZoom.scaleBy(1 / 1.2, options) : false),
      zoomTo: async (zoomLevel, options) => (panZoom ? panZoom.scaleTo(zoomLevel, options) : false),
      setViewport: async (viewport, options) => {
        if (!panZoom) {
          return false
        }

        await panZoom.setViewport(
          {
            x: viewport.x ?? state.transform[0],
            y: viewport.y ?? state.transform[1],
            zoom: viewport.zoom ?? state.transform[2],
          },
          options,
        )

        return true
      },
      getViewport: () => ({
        x: state.transform[0],
        y: state.transform[1],
        zoom: state.transform[2],
      }),
      fitView: async (
        options = {
          padding: DEFAULT_PADDING,
          includeHiddenNodes: false,
          duration: 0,
        },
      ) => {
        if (!panZoom) {
          return false
        }

        const ok = await fitViewport(
          {
            nodes: nodeLookup,
            width: state.dimensions.width,
            height: state.dimensions.height,
            panZoom,
            minZoom: state.minZoom,
            maxZoom: state.maxZoom,
          },
          {
            padding: options.padding ?? DEFAULT_PADDING,
            duration: options.duration,
            minZoom: options.minZoom,
            maxZoom: options.maxZoom,
            // system expects `(NodeType | { id })[]`; we accept `string[]` for ergonomics.
            ...(options.nodes?.length ? { nodes: options.nodes.map((id) => ({ id })) } : {}),
          },
        )

        // vue-flow-only `offset` extension — apply on top of fitViewport's result.
        if (ok && options.offset && (options.offset.x || options.offset.y)) {
          const [currentX, currentY, currentZoom] = state.transform
          await panZoom.setViewport(
            {
              x: currentX + (options.offset.x ?? 0),
              y: currentY + (options.offset.y ?? 0),
              zoom: currentZoom,
            },
            { duration: 0 },
          )
        }

        return ok
      },
      setCenter: async (x, y, options) => {
        if (!panZoom) {
          return false
        }

        const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : state.maxZoom
        const centerX = state.dimensions.width / 2 - x * nextZoom
        const centerY = state.dimensions.height / 2 - y * nextZoom

        await panZoom.setViewport({ x: centerX, y: centerY, zoom: nextZoom }, options)

        return true
      },
      fitBounds: async (bounds, options = { padding: DEFAULT_PADDING }) => {
        if (!panZoom) {
          return false
        }

        const { x, y, zoom } = getViewportForBounds(
          bounds,
          state.dimensions.width,
          state.dimensions.height,
          state.minZoom,
          state.maxZoom,
          options.padding ?? DEFAULT_PADDING,
        )

        await panZoom.setViewport({ x, y, zoom }, options)

        return true
      },
      screenToFlowPosition: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect()

          const correctedPosition = {
            x: position.x - domX,
            y: position.y - domY,
          }

          return pointToRendererPoint(correctedPosition, state.transform, state.snapToGrid, state.snapGrid)
        }

        return { x: 0, y: 0 }
      },
      flowToScreenPosition: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect()

          const correctedPosition = {
            x: position.x + domX,
            y: position.y + domY,
          }

          return rendererPointToPoint(correctedPosition, state.transform)
        }

        return { x: 0, y: 0 }
      },
    }
  })
}
