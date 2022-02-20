import { Ref } from 'vue'
import { FlowProps, FlowStore, Node, Edge, Elements } from '~/types'

const isDef = <T>(val: T): val is NonNullable<T> => typeof val !== 'undefined'
export default (
  {
    modelValue,
    nodes,
    edges,
  }: {
    modelValue?: Ref<Elements | undefined>
    nodes?: Ref<Node[] | undefined>
    edges?: Ref<Edge[] | undefined>
  },
  props: FlowProps,
  store: FlowStore,
) => {
  const scope = getCurrentScope()
  scope?.run(() => {
    if (isDefined(props.modelValue)) {
      const { pause, resume } = pausableWatch([() => props.modelValue, () => props.modelValue?.length], async ([v]) => {
        if (v && Array.isArray(v)) {
          pause()
          store.setElements(v)
          if (modelValue) modelValue.value = [...store.nodes, ...store.edges]
          await nextTick()
          resume()
        }
      })
    }
    if (isDefined(props.nodes)) {
      const { pause, resume } = pausableWatch([() => props.nodes, () => props.nodes?.length], async ([v]) => {
        if (v && Array.isArray(v)) {
          pause()
          store.setNodes(v)
          if (nodes) nodes = store.nodes
          await nextTick()
          resume()
        }
      })
    }
    if (isDefined(props.edges)) {
      const { pause, resume } = pausableWatch([() => props.edges, () => props.edges?.length], async ([v]) => {
        if (v && Array.isArray(v)) {
          pause()
          store.setEdges(v)
          if (edges) edges = store.edges
          await nextTick()
          resume()
        }
      })
    }

    watch(
      () => props.maxZoom,
      (v) => isDef(v) && store.setMaxZoom(v),
      { immediate: isDef(props.maxZoom) },
    )
    watch(
      () => props.minZoom,
      (v) => isDef(v) && store.setMinZoom(v),
      { immediate: isDef(props.minZoom) },
    )
    watch(
      () => props.edgesUpdatable,
      (v) => isDef(v) && (store.edgesUpdatable = v),
      { immediate: isDef(props.edgesUpdatable) },
    )
    watch(
      () => props.elementsSelectable,
      (v) => isDef(v) && (store.elementsSelectable = v),
      { immediate: isDef(props.elementsSelectable) },
    )
    watch(
      () => props.nodesDraggable,
      (v) => isDef(v) && (store.nodesDraggable = v),
      { immediate: isDef(props.nodesDraggable) },
    )
    watch(
      () => props.nodesConnectable,
      (v) => isDef(v) && (store.nodesConnectable = v),
      { immediate: isDef(props.nodesConnectable) },
    )
    watch(
      () => props.onlyRenderVisibleElements,
      (v) => isDef(v) && (store.onlyRenderVisibleElements = v),
      { immediate: isDef(props.onlyRenderVisibleElements) },
    )
    watch(
      () => props.snapToGrid,
      (v) => isDef(v) && (store.snapToGrid = v),
      { immediate: isDef(props.snapToGrid) },
    )
    watch(
      () => props.snapGrid,
      (v) => isDef(v) && (store.snapGrid = v),
      { immediate: isDef(props.snapGrid) },
    )
    watch(
      () => props.paneMoveable,
      (v) => isDef(v) && (store.paneMoveable = v),
      { immediate: isDef(props.paneMoveable) },
    )
    watch(
      () => props.panOnScroll,
      (v) => isDef(v) && (store.panOnScroll = v),
      { immediate: isDef(props.panOnScroll) },
    )
    watch(
      () => props.panOnScrollMode,
      (v) => isDef(v) && (store.panOnScrollMode = v),
      { immediate: isDef(props.panOnScrollMode) },
    )
    watch(
      () => props.panOnScrollSpeed,
      (v) => isDef(v) && (store.panOnScrollSpeed = v),
      { immediate: isDef(props.panOnScrollSpeed) },
    )
    watch(
      () => props.zoomOnPinch,
      (v) => isDef(v) && (store.zoomOnPinch = v),
      { immediate: isDef(props.zoomOnPinch) },
    )
    watch(
      () => props.zoomOnDoubleClick,
      (v) => isDef(v) && (store.zoomOnDoubleClick = v),
      { immediate: isDef(props.zoomOnDoubleClick) },
    )
    watch(
      () => props.zoomOnScroll,
      (v) => isDef(v) && (store.zoomOnScroll = v),
      { immediate: isDef(props.zoomOnScroll) },
    )
    watch(
      () => props.deleteKeyCode,
      (v) => isDef(v) && (store.deleteKeyCode = v),
      { immediate: isDef(props.deleteKeyCode) },
    )
    watch(
      () => props.zoomActivationKeyCode,
      (v) => isDef(v) && (store.zoomActivationKeyCode = v),
      { immediate: isDef(props.zoomActivationKeyCode) },
    )
    watch(
      () => props.selectionKeyCode,
      (v) => isDef(v) && (store.selectionKeyCode = v),
      { immediate: isDef(props.selectionKeyCode) },
    )
    watch(
      () => props.multiSelectionKeyCode,
      (v) => isDef(v) && (store.multiSelectionKeyCode = v),
      { immediate: isDef(props.multiSelectionKeyCode) },
    )
    watch(
      () => props.connectionLineStyle,
      (v) => isDef(v) && (store.connectionLineStyle = v),
      { immediate: isDef(props.connectionLineStyle) },
    )
    watch(
      () => props.connectionMode,
      (v) => isDef(v) && (store.connectionMode = v),
      { immediate: isDef(props.connectionMode) },
    )
    watch(
      () => props.connectionLineType,
      (v) => isDef(v) && (store.connectionLineType = v),
      { immediate: isDef(props.connectionLineType) },
    )
    watch(
      () => props.defaultMarkerColor,
      (v) => isDef(v) && (store.defaultMarkerColor = v),
      { immediate: isDef(props.defaultMarkerColor) },
    )
    watch(
      () => props.defaultPosition,
      (v) => isDef(v) && (store.defaultPosition = v),
      { immediate: isDef(props.defaultPosition) },
    )
    watch(
      () => props.defaultZoom,
      (v) => isDef(v) && (store.defaultZoom = v),
      { immediate: isDef(props.defaultZoom) },
    )
    watch(
      () => props.translateExtent,
      (v) => isDef(v) && (store.translateExtent = v),
      { immediate: isDef(props.translateExtent) },
    )
    watch(
      () => props.nodeExtent,
      (v) => isDef(v) && (store.nodeExtent = v),
      { immediate: isDef(props.nodeExtent) },
    )
    watch(
      () => props.selectNodesOnDrag,
      (v) => isDef(v) && (store.selectNodesOnDrag = v),
      { immediate: isDef(props.selectNodesOnDrag) },
    )
    watch(
      () => props.edgeUpdaterRadius,
      (v) => isDef(v) && (store.edgeUpdaterRadius = v),
      { immediate: isDef(props.edgeUpdaterRadius) },
    )
    watch(
      () => props.applyDefault,
      (v) => isDef(v) && (store.applyDefault = v),
      { immediate: isDef(props.applyDefault) },
    )
  })
}
