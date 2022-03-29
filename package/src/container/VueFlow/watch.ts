import { Ref } from 'vue'
import { FlowProps, Store, Node, Edge, Elements } from '~/types'

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
  store: Store,
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
      { immediate: isDef(props.maxZoom) },
    )
    watch(
      () => props.minZoom,
      (v) => isDef(v) && store.setMinZoom(v),
      { immediate: isDef(props.minZoom) },
    )

    const skip = ['modelValue', 'edges', 'nodes', 'maxZoom', 'minZoom']
    Object.keys(props).forEach((p) => {
      if (!skip.includes(p)) {
        const prop = props[p as keyof typeof props]
        watch(
          () => prop,
          (v) => isDef(v) && ((store as any)[p] = v),
          { immediate: isDef(prop) },
        )
      }
    })
  })
}
