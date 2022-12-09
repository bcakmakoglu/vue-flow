import type { ToRefs, WatchStopHandle } from 'vue'
import type { WatchPausableReturn } from '@vueuse/core'
import { isFunction } from '@vueuse/core'
import type { Connection, FlowProps, VueFlowStore } from '~/types'

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
        let stopStore: WatchStopHandle

        const immediate = !!(models.modelValue && models.modelValue.value && models.modelValue.value.length)

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [models.modelValue, () => models.modelValue?.value?.length],
          ([elements], _, onCleanup) => {
            if (elements && Array.isArray(elements)) {
              store.setElements(elements)

              stopStore = watch(
                [store.nodes, store.edges, () => store.edges.value.length, () => store.nodes.value.length],
                ([nodes, edges]) => {
                  if (models.modelValue?.value && Array.isArray(models.modelValue.value)) {
                    pauseModel?.pause()

                    models.modelValue.value = [...nodes, ...edges]

                    nextTick(() => {
                      pauseModel?.resume()
                    })
                  }
                },
                { immediate: true },
              )

              onCleanup(stopStore)
            }
          },
          { immediate },
        )

        onScopeDispose(() => {
          pauseModel?.stop()
          stopStore?.()
        })
      })
    }

    const watchNodesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let stopStore: WatchStopHandle

        const immediate = !!(models.nodes && models.nodes.value && models.nodes.value.length)

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [models.nodes, () => models.nodes?.value?.length],
          ([nodes], _, onCleanup) => {
            if (nodes && Array.isArray(nodes)) {
              store.setNodes(nodes)

              stopStore = watch(
                [store.nodes, () => store.nodes.value.length],
                ([nodes]) => {
                  if (models.nodes?.value && Array.isArray(models.nodes.value)) {
                    pauseModel?.pause()

                    models.nodes.value = [...nodes]

                    nextTick(() => {
                      pauseModel?.resume()
                    })
                  }
                },
                { immediate: true },
              )

              onCleanup(stopStore)
            }
          },
          { immediate },
        )

        onScopeDispose(() => {
          pauseModel?.stop()
          stopStore?.()
        })
      })
    }

    const watchEdgesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let stopStore: WatchStopHandle

        const immediate = !!(models.edges && models.edges.value && models.edges.value.length)

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [models.edges, () => models.edges?.value?.length],
          ([edges], _, onCleanup) => {
            if (edges && Array.isArray(edges)) {
              store.setEdges(edges)

              stopStore = watch(
                [store.edges, () => store.edges.value.length],
                ([edges]) => {
                  if (models.edges?.value && Array.isArray(models.edges.value)) {
                    pauseModel?.pause()

                    models.edges.value = [...edges]

                    nextTick(() => {
                      pauseModel?.resume()
                    })
                  }
                },
                { immediate: !immediate },
              )

              onCleanup(stopStore)
            }
          },
          { immediate },
        )

        onScopeDispose(() => {
          pauseModel?.stop()
          stopStore?.()
        })
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
