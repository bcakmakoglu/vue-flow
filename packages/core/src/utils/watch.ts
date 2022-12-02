import type { ToRefs } from 'vue'
import type { WatchPausableReturn } from '@vueuse/core'
import { isFunction } from '@vueuse/core'
import type { Connection, FlowProps, GraphEdge, GraphNode, VueFlowStore } from '~/types'

const isDef = <T>(val: T): val is NonNullable<T> => typeof unref(val) !== 'undefined'

export const useWatch = (
  models: ToRefs<Pick<FlowProps, 'nodes' | 'edges' | 'modelValue'>>,
  props: FlowProps,
  store: VueFlowStore,
) => {
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
                  models.modelValue!.value = [...(n as GraphNode[]), ...(e as GraphEdge[])]

                  nextTick(() => {
                    if (pauseModel) pauseModel.resume()
                  })
                },
                { immediate: true },
              )

              nextTick(() => {
                if (pauseStore) pauseStore.resume()
                if (pauseModel) pauseModel.resume()
              })
            }
          },
          { immediate: !!(models.modelValue && models.modelValue.value && models.modelValue.value.length) },
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
                  models.nodes!.value = [...store.nodes.value]
                },
                { immediate: true, flush: 'post' },
              )

              nextTick(() => {
                if (pauseStore) pauseStore.resume()
                if (pauseModel) pauseModel.resume()
              })
            }
          },
          { immediate: !!(models.nodes && models.nodes.value && models.nodes.value.length) },
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
                  models.edges!.value = [...store.edges.value]
                },
                { immediate: true, flush: 'post' },
              )

              nextTick(() => {
                if (pauseStore) pauseStore.resume()
                if (pauseModel) pauseModel.resume()
              })
            }
          },
          { immediate: !!(models.edges && models.edges.value && models.edges.value.length) },
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

    const watchTranslateExtent = () => {
      scope.run(() => {
        watch(
          () => props.translateExtent,
          () => {
            if (props.translateExtent && isDef(props.translateExtent)) {
              store.setTranslateExtent(props.translateExtent)
            }
          },
          { immediate: isDef(props.translateExtent) },
        )
      })
    }

    const watchNodeExtent = () => {
      scope.run(() => {
        watch(
          () => props.nodeExtent,
          () => {
            if (props.nodeExtent && isDef(props.nodeExtent)) {
              store.setNodeExtent(props.nodeExtent)
            }
          },
          { immediate: isDef(props.nodeExtent) },
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
          (_, __, onCleanup) => {
            if (store.applyDefault.value) {
              store.onNodesChange(store.applyNodeChanges)
              store.onEdgesChange(store.applyEdgeChanges)
            } else {
              store.hooks.value.nodesChange.off(store.applyNodeChanges)
              store.hooks.value.edgesChange.off(store.applyEdgeChanges)
            }

            onCleanup(() => {
              store.hooks.value.nodesChange.off(store.applyNodeChanges)
              store.hooks.value.edgesChange.off(store.applyEdgeChanges)
            })
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
          (autoConnectEnabled, _, onCleanup) => {
            if (autoConnectEnabled) {
              store.onConnect(autoConnector)
            } else {
              store.hooks.value.connect.off(autoConnector)
            }

            onCleanup(() => {
              store.hooks.value.connect.off(autoConnector)
            })
          },
          { immediate: true },
        )
      })
    }

    const watchRest = () => {
      const skip: (keyof typeof props)[] = [
        'id',
        'modelValue',
        'translateExtent',
        'nodeExtent',
        'edges',
        'nodes',
        'maxZoom',
        'minZoom',
        'applyDefault',
        'autoConnect',
      ]

      Object.keys(props).forEach((prop) => {
        if (!skip.includes(prop as keyof typeof props)) {
          const model = toRef(props, prop as keyof typeof props)
          const storedValue = store[prop as keyof typeof store] as typeof model

          scope.run(() => {
            watch(
              model,
              () => {
                if (isDef(model)) {
                  storedValue.value = model.value
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
      watchTranslateExtent,
      watchNodeExtent,
      watchApplyDefault,
      watchAutoConnect,
      watchRest,
    ].forEach((watch) => watch())
  })

  return () => scope.stop()
}
