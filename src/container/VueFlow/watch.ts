import { Ref } from 'vue'
import { FlowProps, FlowStore } from '~/types'

const isDef = <T>(val: T): val is NonNullable<T> => typeof val !== 'undefined'
export default (
  modelValue: Ref<any[] | undefined> | undefined,
  nodes: Ref<any[] | undefined> | undefined,
  edges: Ref<any[] | undefined> | undefined,
  props: FlowProps,
  store: FlowStore,
) => {
  if (isDefined(modelValue)) {
    const { pause, resume } = pausableWatch(modelValue, (v) => {
      if (v) {
        pause()
        store.setElements(v)
        resume()
      }
    })
  }
  if (isDefined(nodes)) {
    const { pause, resume } = pausableWatch(nodes, (v) => {
      if (v) {
        pause()
        store.setNodes(v)
        resume()
      }
    })
  }
  if (isDefined(edges)) {
    const { pause, resume } = pausableWatch(edges, (v) => {
      if (v) {
        pause()
        store.setEdges(v)
        resume()
      }
    })
  }

  watch(
    () => props.maxZoom,
    (v) => isDef(v) && store.setMaxZoom(v),
  )
  watch(
    () => props.minZoom,
    (v) => isDef(v) && store.setMinZoom(v),
  )
  watch(
    () => props.edgesUpdatable,
    (v) => isDef(v) && (store.edgesUpdatable = v),
  )
  watch(
    () => props.elementsSelectable,
    (v) => isDef(v) && (store.elementsSelectable = v),
  )
  watch(
    () => props.nodesDraggable,
    (v) => isDef(v) && (store.nodesDraggable = v),
  )
  watch(
    () => props.nodesConnectable,
    (v) => isDef(v) && (store.nodesConnectable = v),
  )
  watch(
    () => props.onlyRenderVisibleElements,
    (v) => isDef(v) && (store.onlyRenderVisibleElements = v),
  )
  watch(
    () => props.snapToGrid,
    (v) => isDef(v) && (store.snapToGrid = v),
  )
  watch(
    () => props.snapGrid,
    (v) => isDef(v) && (store.snapGrid = v),
  )
  watch(
    () => props.paneMoveable,
    (v) => isDef(v) && (store.paneMoveable = v),
  )
  watch(
    () => props.panOnScroll,
    (v) => isDef(v) && (store.panOnScroll = v),
  )
  watch(
    () => props.panOnScrollMode,
    (v) => isDef(v) && (store.panOnScrollMode = v),
  )
  watch(
    () => props.panOnScrollSpeed,
    (v) => isDef(v) && (store.panOnScrollSpeed = v),
  )
  watch(
    () => props.zoomOnPinch,
    (v) => isDef(v) && (store.zoomOnPinch = v),
  )
  watch(
    () => props.zoomOnDoubleClick,
    (v) => isDef(v) && (store.zoomOnDoubleClick = v),
  )
  watch(
    () => props.zoomOnScroll,
    (v) => isDef(v) && (store.zoomOnScroll = v),
  )
  watch(
    () => props.deleteKeyCode,
    (v) => isDef(v) && (store.deleteKeyCode = v),
  )
  watch(
    () => props.zoomActivationKeyCode,
    (v) => isDef(v) && (store.zoomActivationKeyCode = v),
  )
  watch(
    () => props.selectionKeyCode,
    (v) => isDef(v) && (store.selectionKeyCode = v),
  )
  watch(
    () => props.multiSelectionKeyCode,
    (v) => isDef(v) && (store.multiSelectionKeyCode = v),
  )
  watch(
    () => props.connectionLineStyle,
    (v) => isDef(v) && (store.connectionLineStyle = v),
  )
  watch(
    () => props.connectionMode,
    (v) => isDef(v) && (store.connectionMode = v),
  )
  watch(
    () => props.connectionLineType,
    (v) => isDef(v) && (store.connectionLineType = v),
  )
  watch(
    () => props.defaultMarkerColor,
    (v) => isDef(v) && (store.defaultMarkerColor = v),
  )
  watch(
    () => props.defaultPosition,
    (v) => isDef(v) && (store.defaultPosition = v),
  )
  watch(
    () => props.defaultZoom,
    (v) => isDef(v) && (store.defaultZoom = v),
  )
  watch(
    () => props.translateExtent,
    (v) => isDef(v) && (store.translateExtent = v),
  )
  watch(
    () => props.nodeExtent,
    (v) => isDef(v) && (store.nodeExtent = v),
  )
  watch(
    () => props.selectNodesOnDrag,
    (v) => isDef(v) && (store.selectNodesOnDrag = v),
  )
  watch(
    () => props.edgeUpdaterRadius,
    (v) => isDef(v) && (store.edgeUpdaterRadius = v),
  )
}
