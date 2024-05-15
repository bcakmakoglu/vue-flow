import type { ToRefs } from 'vue'
import { effectScope, nextTick, onScopeDispose, watch } from 'vue'
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
        pauseModel = watchPausable([models.modelValue, () => models.modelValue?.value?.length], ([elements]) => {
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
        })

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

    const watchEdgesValue = () => {
      scope.run(() => {
        let pauseModel: WatchPausableReturn
        let pauseStore: WatchPausableReturn

        let immediateStore = !!store.edges.value.length

        // eslint-disable-next-line prefer-const
        pauseModel = watchPausable([models.edges, () => models.edges?.value?.length], ([edges]) => {
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

    const runAll = () => {
      watchModelValue()
      watchEdgesValue()
      watchAutoConnect()
    }

    runAll()
  })

  return () => scope.stop()
}
