import { useVueFlow } from './useVueFlow'
import { useViewport } from './useViewport'
import type { ComputedGetters, State, ViewportFunctions } from '~/types'

/**
 * @deprecated use {@link useVueFlow} instead (all viewport functions are also available in {@link useVueFlow})
 */
export function useZoomPanHelper(vueFlowId?: string): ViewportFunctions {
  const state = $(useVueFlow({ id: vueFlowId }))

  const viewportHelper = useViewport(state as State, state as unknown as ComputedGetters)

  return {
    fitView: (params) => viewportHelper.value.fitView(params),
    zoomIn: (transitionOpts) => viewportHelper.value.zoomIn(transitionOpts),
    zoomOut: (transitionOpts) => viewportHelper.value.zoomOut(transitionOpts),
    zoomTo: (zoomLevel, transitionOpts) => viewportHelper.value.zoomTo(zoomLevel, transitionOpts),
    setViewport: (params, transitionOpts) => viewportHelper.value.setViewport(params, transitionOpts),
    setTransform: (params, transitionOpts) => viewportHelper.value.setTransform(params, transitionOpts),
    getViewport: () => viewportHelper.value.getViewport(),
    getTransform: () => viewportHelper.value.getTransform(),
    setCenter: (x, y, opts) => viewportHelper.value.setCenter(x, y, opts),
    fitBounds: (params, opts) => viewportHelper.value.fitBounds(params, opts),
    project: (params) => viewportHelper.value.project(params),
  }
}
