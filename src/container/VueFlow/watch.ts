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
    { immediate: true },
  )
  watch(
    () => props.minZoom,
    (v) => isDef(v) && store.setMinZoom(v),
    { immediate: true },
  )
  watch(
    () => props.edgesUpdatable,
    (v) => isDef(v) && (store.edgesUpdatable = v),
    { immediate: true },
  )
  watch(
    () => props.elementsSelectable,
    (v) => isDef(v) && (store.elementsSelectable = v),
    { immediate: true },
  )
  watch(
    () => props.nodesDraggable,
    (v) => isDef(v) && (store.nodesDraggable = v),
    { immediate: true },
  )
  watch(
    () => props.nodesConnectable,
    (v) => isDef(v) && (store.nodesConnectable = v),
    { immediate: true },
  )
  watch(
    () => props.onlyRenderVisibleElements,
    (v) => isDef(v) && (store.onlyRenderVisibleElements = v),
    { immediate: true },
  )
  watch(
    () => props.snapToGrid,
    (v) => isDef(v) && (store.snapToGrid = v),
    { immediate: true },
  )
  watch(
    () => props.snapGrid,
    (v) => isDef(v) && (store.snapGrid = v),
    { immediate: true },
  )
  watch(
    () => props.paneMoveable,
    (v) => isDef(v) && (store.paneMoveable = v),
    { immediate: true },
  )
  watch(
    () => props.panOnScroll,
    (v) => isDef(v) && (store.panOnScroll = v),
    { immediate: true },
  )
  watch(
    () => props.panOnScrollMode,
    (v) => isDef(v) && (store.panOnScrollMode = v),
    { immediate: true },
  )
  watch(
    () => props.panOnScrollSpeed,
    (v) => isDef(v) && (store.panOnScrollSpeed = v),
    { immediate: true },
  )
  watch(
    () => props.zoomOnPinch,
    (v) => isDef(v) && (store.zoomOnPinch = v),
    { immediate: true },
  )
  watch(
    () => props.zoomOnDoubleClick,
    (v) => isDef(v) && (store.zoomOnDoubleClick = v),
    { immediate: true },
  )
  watch(
    () => props.zoomOnScroll,
    (v) => isDef(v) && (store.zoomOnScroll = v),
    { immediate: true },
  )
  watch(
    () => props.deleteKeyCode,
    (v) => isDef(v) && (store.deleteKeyCode = v),
    { immediate: true },
  )
  watch(
    () => props.zoomActivationKeyCode,
    (v) => isDef(v) && (store.zoomActivationKeyCode = v),
    { immediate: true },
  )
  watch(
    () => props.selectionKeyCode,
    (v) => isDef(v) && (store.selectionKeyCode = v),
    { immediate: true },
  )
  watch(
    () => props.multiSelectionKeyCode,
    (v) => isDef(v) && (store.multiSelectionKeyCode = v),
    { immediate: true },
  )
  watch(
    () => props.connectionLineStyle,
    (v) => isDef(v) && (store.connectionLineStyle = v),
    { immediate: true },
  )
  watch(
    () => props.connectionMode,
    (v) => isDef(v) && (store.connectionMode = v),
    { immediate: true },
  )
  watch(
    () => props.connectionLineType,
    (v) => isDef(v) && (store.connectionLineType = v),
    { immediate: true },
  )
  watch(
    () => props.defaultMarkerColor,
    (v) => isDef(v) && (store.defaultMarkerColor = v),
    { immediate: true },
  )
  watch(
    () => props.defaultPosition,
    (v) => isDef(v) && (store.defaultPosition = v),
    { immediate: true },
  )
  watch(
    () => props.defaultZoom,
    (v) => isDef(v) && (store.defaultZoom = v),
    { immediate: true },
  )
  watch(
    () => props.translateExtent,
    (v) => isDef(v) && (store.translateExtent = v),
    { immediate: true },
  )
  watch(
    () => props.nodeExtent,
    (v) => isDef(v) && (store.nodeExtent = v),
    { immediate: true },
  )
  watch(
    () => props.selectNodesOnDrag,
    (v) => isDef(v) && (store.selectNodesOnDrag = v),
    { immediate: true },
  )
  watch(
    () => props.edgeUpdaterRadius,
    (v) => isDef(v) && (store.edgeUpdaterRadius = v),
    { immediate: true },
  )
  watch(
    () => props.applyDefault,
    (v) => isDef(v) && (store.applyDefault = v),
    { immediate: true },
  )
}
