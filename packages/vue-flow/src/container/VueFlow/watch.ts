import type { Ref, ToRefs } from 'vue'
import type { WatchPausableReturn } from '@vueuse/core'
import { isFunction } from '@vueuse/core'
import type { Connection, FlowProps, GraphEdge, GraphNode, VueFlowStore } from '~/types'

const isDef = <T>(val: T): val is NonNullable<T> => typeof val !== 'undefined'
export default (models: ToRefs<Pick<FlowProps, 'nodes' | 'edges' | 'modelValue'>>, props: FlowProps, store: VueFlowStore) => {
  const scope = effectScope()

  scope.run(() => {
    const watchModelValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [models.modelValue, () => models.modelValue?.value?.length],
          ([v]) => {
            if (v && Array.isArray(v)) {
              if (pauseStore) pauseStore.pause()
              if (pauseModel) pauseModel.pause()

              store.setElements(v)

              pauseStore = watchPausable(
                [store.edges, store.nodes, () => store.edges.value.length, () => store.nodes.value.length],
                ([e, n]) => {
                  if (pauseModel) pauseModel.pause()
                  const val = [...(n as GraphNode[]), ...(e as GraphEdge[])]
                  if (val.length) models.modelValue!.value = val

                  nextTick(() => {
                    if (pauseModel) pauseModel.resume()
                  })
                },
                { immediate: true, flush: 'post' },
              )

              nextTick(() => {
                if (pauseStore) pauseStore.resume()
                if (pauseModel) pauseModel.resume()
              })
            }
          },
          { immediate: !!(models.modelValue && models.modelValue.value), flush: 'post' },
        )
      })
    }

    const watchNodesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [models.nodes, () => models.nodes?.value?.length],
          async ([v]) => {
            if (v && Array.isArray(v)) {
              if (pauseStore) pauseStore.pause()
              if (pauseModel) pauseModel.pause()

              store.setNodes(v)

              pauseStore = watchPausable(
                () => store.nodes.value.length,
                () => {
                  if (store.nodes.value.length) models.nodes!.value = [...store.nodes.value]
                },
                { immediate: true },
              )

              nextTick(() => {
                if (pauseStore) pauseStore.resume()
                if (pauseModel) pauseModel.resume()
              })
            }
          },
          { immediate: !!(models.nodes && models.nodes.value), flush: 'post' },
        )
      })
    }

    const watchEdgesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [models.edges, () => models.edges?.value?.length],
          async ([v]) => {
            if (v && Array.isArray(v)) {
              if (pauseStore) pauseStore.pause()
              if (pauseModel) pauseModel.pause()

              store.setEdges(v)

              pauseStore = watchPausable(
                () => store.edges.value.length,
                () => {
                  if (store.edges.value.length) models.edges!.value = [...store.edges.value]
                },
                { immediate: true },
              )

              nextTick(() => {
                if (pauseStore) pauseStore.resume()
                if (pauseModel) pauseModel.resume()
              })
            }
          },
          { immediate: !!(models.edges && models.edges.value), flush: 'post' },
        )
      })
    }

    const watchMaxZoom = () => {
      scope.run(() => {
        watch(
          () => props.maxZoom,
          () => {
            if (props.maxZoom && isDef(props.maxZoom)) {
              store.setMaxZoom(props.maxZoom)
            }
          },
          { immediate: isDef(props.maxZoom) },
        )
      })
    }

    const watchMinZoom = () => {
      scope.run(() => {
        watch(
          () => props.minZoom,
          () => {
            if (props.minZoom && isDef(props.minZoom)) {
              store.setMinZoom(props.minZoom)
            }
          },
          { immediate: isDef(props.minZoom) },
        )
      })
    }

    const watchApplyDefault = () => {
      scope.run(() => {
        watch(
          () => props.applyDefault,
          () => {
            if (isDef(props.applyDefault)) {
              store.applyDefault.value = props.applyDefault
            }
          },
          { immediate: isDef(props.applyDefault) },
        )

        watch(
          store.applyDefault,
          () => {
            if (store.applyDefault.value) {
              store.onNodesChange(store.applyNodeChanges)
              store.onEdgesChange(store.applyEdgeChanges)
            } else {
              store.hooks.value.nodesChange.off(store.applyNodeChanges)
              store.hooks.value.edgesChange.off(store.applyEdgeChanges)
            }
          },
          { immediate: true },
        )
      })
    }

    const watchAutoConnect = () => {
      scope.run(() => {
        const autoConnector = async (params: Connection) => {
          let connection: boolean | Connection = params

          if (isFunction(props.autoConnect)) {
            connection = await props.autoConnect(params)
          }

          if (connection !== false) {
            store.addEdges([connection])
          }
        }

        watch(
          () => props.autoConnect,
          () => {
            if (isDef(props.autoConnect)) {
              store.autoConnect.value = props.autoConnect
            }
          },
          { immediate: isDef(props.autoConnect) },
        )

        watch(
          store.autoConnect,
          (autoConnectEnabled) => {
            if (autoConnectEnabled) {
              store.onConnect(autoConnector)
            } else {
              store.hooks.value.connect.off(autoConnector)
            }
          },
          { immediate: true },
        )
      })
    }

    const watchRest = () => {
      const skip = ['id', 'modelValue', 'edges', 'nodes', 'maxZoom', 'minZoom', 'applyDefault', 'autoConnect']
      Object.keys(props).forEach((prop) => {
        if (!skip.includes(prop)) {
          const model = props[prop as keyof typeof props]
          const storedValue = (<any>store)[prop] as Ref

          scope.run(() => {
            watch(
              () => model,
              () => {
                if (model && isDef(model)) {
                  storedValue.value = model
                }
              },
              { immediate: isDef(model) },
            )
          })
        }
      })
    }

    ;[
      watchModelValue,
      watchNodesValue,
      watchEdgesValue,
      watchMinZoom,
      watchMaxZoom,
      watchApplyDefault,
      watchAutoConnect,
      watchRest,
    ].forEach((watch) => watch())
  })

  return () => scope.stop()
}
