import { zoomIdentity } from 'd3-zoom'
import { computed } from 'vue'
import type { D3Selection, GraphNode, Project, State, ViewportFunctions } from '../types'
import { clampPosition, getRectOfNodes, getTransformForBounds, pointToRendererPoint, rendererPointToPoint, warn } from '../utils'

export interface ViewportHelper extends ViewportFunctions {
  viewportInitialized: boolean
  screenToFlowCoordinate: Project
  flowToScreenCoordinate: Project
}

const DEFAULT_PADDING = 0.1

function noop() {
  warn('Viewport not initialized yet.')

  return Promise.resolve(false)
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
export function useViewportHelper(state: State) {
  function zoom(scale: number, duration?: number) {
    return new Promise<boolean>((resolve) => {
      if (state.d3Selection && state.d3Zoom) {
        state.d3Zoom.scaleBy(
          transition(state.d3Selection, duration, () => {
            resolve(true)
          }),
          scale,
        )
      } else {
        resolve(false)
      }
    })
  }

  function transformViewport(x: number, y: number, zoom: number, duration?: number) {
    return new Promise<boolean>((resolve) => {
      // enforce translate extent
      const { x: clampedX, y: clampedY } = clampPosition({ x: -x, y: -y }, state.translateExtent)

      const nextTransform = zoomIdentity.translate(-clampedX, -clampedY).scale(zoom)

      if (state.d3Selection && state.d3Zoom) {
        state.d3Zoom.transform(
          transition(state.d3Selection, duration, () => {
            resolve(true)
          }),
          nextTransform,
        )
      } else {
        resolve(false)
      }
    })
  }

  return computed<ViewportHelper>(() => {
    const isInitialized = state.d3Zoom && state.d3Selection && state.dimensions.width && state.dimensions.height

    if (!isInitialized) {
      return initialViewportHelper
    }

    return {
      viewportInitialized: true,
      // todo: allow passing scale as option
      zoomIn: (options) => {
        return zoom(1.2, options?.duration)
      },
      zoomOut: (options) => {
        return zoom(1 / 1.2, options?.duration)
      },
      zoomTo: (zoomLevel, options) => {
        return new Promise<boolean>((resolve) => {
          if (state.d3Selection && state.d3Zoom) {
            state.d3Zoom.scaleTo(
              transition(state.d3Selection, options?.duration, () => {
                resolve(true)
              }),
              zoomLevel,
            )
          } else {
            resolve(false)
          }
        })
      },
      setViewport: (transform, options) => {
        return transformViewport(transform.x, transform.y, transform.zoom, options?.duration)
      },
      getViewport: () => ({
        x: state.viewport.x,
        y: state.viewport.y,
        zoom: state.viewport.zoom,
      }),
      fitView: (
        options = {
          padding: DEFAULT_PADDING,
          includeHiddenNodes: false,
          duration: 0,
        },
      ) => {
        const nodesToFit: GraphNode[] = []
        for (const node of state.nodes) {
          const isVisible = node.dimensions.width && node.dimensions.height && (options?.includeHiddenNodes || !node.hidden)

          if (isVisible) {
            if (!options.nodes?.length || (options.nodes?.length && options.nodes.includes(node.id))) {
              nodesToFit.push(node)
            }
          }
        }

        if (!nodesToFit.length) {
          return Promise.resolve(false)
        }

        const bounds = getRectOfNodes(nodesToFit)

        const { x, y, zoom } = getTransformForBounds(
          bounds,
          state.dimensions.width,
          state.dimensions.height,
          options.minZoom ?? state.minZoom,
          options.maxZoom ?? state.maxZoom,
          options.padding ?? DEFAULT_PADDING,
          options.offset,
        )

        return transformViewport(x, y, zoom, options?.duration)
      },
      setCenter: (x, y, options) => {
        const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : state.maxZoom
        const centerX = state.dimensions.width / 2 - x * nextZoom
        const centerY = state.dimensions.height / 2 - y * nextZoom

        return transformViewport(centerX, centerY, nextZoom, options?.duration)
      },
      fitBounds: (bounds, options = { padding: DEFAULT_PADDING }) => {
        const { x, y, zoom } = getTransformForBounds(
          bounds,
          state.dimensions.width,
          state.dimensions.height,
          state.minZoom,
          state.maxZoom,
          options.padding,
        )

        return transformViewport(x, y, zoom, options?.duration)
      },
      project: (position) => pointToRendererPoint(position, state.viewport, state.snapToGrid, state.snapGrid),
      screenToFlowCoordinate: (position) => {
        if (state.vueFlowRef) {
          const { x: domX, y: domY } = state.vueFlowRef.getBoundingClientRect()

          const correctedPosition = {
            x: position.x - domX,
            y: position.y - domY,
          }

          return pointToRendererPoint(correctedPosition, state.viewport, state.snapToGrid, state.snapGrid)
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

          return rendererPointToPoint(correctedPosition, state.viewport)
        }

        return { x: 0, y: 0 }
      },
    }
  })
}

function transition(selection: D3Selection, ms = 0, onEnd: () => void) {
  return (selection as any).transition().duration(ms).on('end', onEnd)
}
