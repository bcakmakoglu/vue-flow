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
        if (nodes) nodes.value = store.nodes
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
        if (edges) edges.value = store.edges
        await nextTick()
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
  watch(
    () => props.fitViewOnInit,
    (v) => isDef(v) && (store.fitViewOnInit = v),
    { immediate: true },
  )
}
