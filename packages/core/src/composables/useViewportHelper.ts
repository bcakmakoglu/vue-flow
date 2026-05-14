import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { fitViewport, rendererPointToPoint } from '@xyflow/system'
import type { Node, NodeLookup, Project, State, ViewportFunctions } from '../types'
import { getViewportForBounds, pointToRendererPoint, warn } from '../utils'

export interface ViewportHelper extends ViewportFunctions {
  viewportInitialized: boolean
  screenToFlowCoordinate: Project
  flowToScreenCoordinate: Project
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
  project: (position) => position,
  screenToFlowCoordinate: (position) => position,
  flowToScreenCoordinate: (position) => position,
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
export function useViewportHelper<NodeType extends Node = Node>(
  state: State<NodeType>,
  nodeLookup: ComputedRef<NodeLookup<NodeType>>,
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
            x: viewport.x ?? state.viewport.x,
            y: viewport.y ?? state.viewport.y,
            zoom: viewport.zoom ?? state.viewport.zoom,
          },
          options,
        )

        return true
      },
      getViewport: () => ({
        x: state.viewport.x,
        y: state.viewport.y,
        zoom: state.viewport.zoom,
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
            nodes: nodeLookup.value,
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
          const current = state.viewport
          await panZoom.setViewport(
            {
              x: current.x + (options.offset.x ?? 0),
              y: current.y + (options.offset.y ?? 0),
              zoom: current.zoom,
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
      project: (position) =>
        pointToRendererPoint(
          position,
          [state.viewport.x, state.viewport.y, state.viewport.zoom],
          state.snapToGrid,
          state.snapGrid,
        ),
      screenToFlowCoordinate: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect()

          const correctedPosition = {
            x: position.x - domX,
            y: position.y - domY,
          }

          return pointToRendererPoint(
            correctedPosition,
            [state.viewport.x, state.viewport.y, state.viewport.zoom],
            state.snapToGrid,
            state.snapGrid,
          )
        }

        return { x: 0, y: 0 }
      },
      flowToScreenCoordinate: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect()

          const correctedPosition = {
            x: position.x + domX,
            y: position.y + domY,
          }

          return rendererPointToPoint(correctedPosition, [state.viewport.x, state.viewport.y, state.viewport.zoom])
        }

        return { x: 0, y: 0 }
      },
    }
  })
}
