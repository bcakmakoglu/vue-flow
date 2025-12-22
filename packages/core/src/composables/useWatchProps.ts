import type { ToRefs } from 'vue'
import { effectScope, isRef, nextTick, onScopeDispose, toRef, watch } from 'vue'
import type { WatchPausableReturn } from '@vueuse/core'
import { watchPausable } from '@vueuse/core'
import type { Connection, FlowProps, VueFlowStore } from '../types'
import { isDef } from '../utils'

/**
 * Watches props and updates the store accordingly
 *
 * @internal
 * @param models
 * @param props
 * @param store
 */
export function useWatchProps(
  models: ToRefs<Pick<FlowProps, 'nodes' | 'edges' | 'modelValue'>>,
  props: FlowProps,
  store: VueFlowStore,
) {
  const scope = effectScope(true)

  scope.run(() => {
    const watchModelValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        let immediateStore = !!(store.nodes.value.length || store.edges.value.length)

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable(
          [() => models.modelValue?.value, () => models.modelValue?.value?.length] as const,
          ([elements]) => {
            if (elements && Array.isArray(elements)) {
              pauseStore?.pause()

              store.setElements(elements)

              // only trigger store watcher immediately if we actually set any elements to the store
              if (!pauseStore && !immediateStore && elements.length) {
                immediateStore = true
              } else {
                pauseStore?.resume()
              }
            }
          },
        )

        pauseStore = watchPausable(
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
          { immediate: immediateStore },
        )

        onScopeDispose(() => {
          pauseModel?.stop()
          pauseStore?.stop()
        })
      })
    }

    const watchNodesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        let immediateStore = !!store.nodes.value.length

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable([() => models.nodes?.value, () => models.nodes?.value?.length] as const, ([nodes]) => {
          if (nodes && Array.isArray(nodes)) {
            pauseStore?.pause()

            store.setNodes(nodes)

            // only trigger store watcher immediately if we actually set any elements to the store
            if (!pauseStore && !immediateStore && nodes.length) {
              immediateStore = true
            } else {
              pauseStore?.resume()
            }
          }
        })

        pauseStore = watchPausable(
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
          { immediate: immediateStore },
        )

        onScopeDispose(() => {
          pauseModel?.stop()
          pauseStore?.stop()
        })
      })
    }

    const watchEdgesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        let immediateStore = !!store.edges.value.length

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable([() => models.edges?.value, () => models.edges?.value?.length] as const, ([edges]) => {
          if (edges && Array.isArray(edges)) {
            pauseStore?.pause()

            store.setEdges(edges)

            // only trigger store watcher immediately if we actually set any elements to the store
            if (!pauseStore && !immediateStore && edges.length) {
              immediateStore = true
            } else {
              pauseStore?.resume()
            }
          }
        })

        pauseStore = watchPausable(
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
          { immediate: immediateStore },
        )

        onScopeDispose(() => {
          pauseModel?.stop()
          pauseStore?.stop()
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
          {
            immediate: true,
          },
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
          { immediate: true },
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
          {
            immediate: true,
          },
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
          {
            immediate: true,
          },
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
          {
            immediate: true,
          },
        )
      })
    }

    const watchAutoConnect = () => {
      scope.run(() => {
        const autoConnector = async (params: Connection) => {
          let connection: boolean | Connection = params

          if (typeof props.autoConnect === 'function') {
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
          { immediate: true },
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

      for (const key of Object.keys(props)) {
        const propKey = key as keyof typeof props
        if (!skip.includes(propKey)) {
          const propValue = toRef(() => props[propKey])

          const storeRef = store[propKey as keyof typeof store]

          if (isRef(storeRef)) {
            scope.run(() => {
              watch(
                propValue,
                (nextValue) => {
                  if (isDef(nextValue)) {
                    ;(storeRef.value as any) = nextValue
                  }
                },
                { immediate: true },
              )
            })
          }
        }
      }
    }

    const runAll = () => {
      watchModelValue()
      watchNodesValue()
      watchEdgesValue()
      watchMinZoom()
      watchMaxZoom()
      watchTranslateExtent()
      watchNodeExtent()
      watchApplyDefault()
      watchAutoConnect()
      watchRest()
    }

    runAll()
  })

  return () => scope.stop()
}
