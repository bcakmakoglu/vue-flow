import { Ref, ToRefs } from 'vue'
import { WatchPausableReturn } from '@vueuse/core'
import { FlowProps, UseVueFlow } from '~/types'

const isDef = <T>(val: T): val is NonNullable<T> => typeof val !== 'undefined'
export default (models: ToRefs<FlowProps>, store: UseVueFlow) => {
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
                [() => store.edges.value.length, () => store.nodes.value.length],
                () => {
                  models.modelValue!.value = [...store.nodes.value, ...store.edges.value]
                },
                { immediate: true },
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
                () => (models.nodes!.value = [...store.nodes.value]),
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
                () => (models.edges!.value = [...store.edges.value]),
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
          [() => models.maxZoom, models.maxZoom],
          () => {
            if (models.maxZoom && isDef(models.maxZoom.value)) {
              store.setMaxZoom(models.maxZoom.value)
            }
          },
          { immediate: isDef(models.maxZoom?.value) },
        )
      })
    }

    const watchMinZoom = () => {
      scope.run(() => {
        watch(
          [() => models.minZoom, models.minZoom],
          () => {
            if (models.minZoom && isDef(models.minZoom.value)) {
              store.setMinZoom(models.minZoom.value)
            }
          },
          { immediate: isDef(models.minZoom?.value) },
        )
      })
    }

    const watchApplyDefault = () => {
      scope.run(() => {
        watch(
          [() => models.applyDefault, models.applyDefault],
          () => {
            if (models.applyDefault && isDef(models.applyDefault.value)) {
              store.applyDefault.value = models.applyDefault.value
            }
          },
          { immediate: isDef(models.applyDefault?.value) },
        )

        watch(
          store.applyDefault,
          () => {
            if (store.applyDefault.value) {
              store.onNodesChange(store.applyNodeChanges)
              store.onEdgesChange(store.applyEdgeChanges)
            }
          },
          { immediate: true },
        )
      })
    }

    watchModelValue()
    watchNodesValue()
    watchEdgesValue()
    watchMaxZoom()
    watchMinZoom()
    watchApplyDefault()

    const skip = ['id', 'modelValue', 'edges', 'nodes', 'maxZoom', 'minZoom', 'applyDefault']
    Object.keys(models).forEach((m) => {
      if (!skip.includes(m)) {
        const model = models[m as keyof typeof models]
        const storedValue = (<any>store)[m] as Ref

        scope.run(() => {
          watch(
            [() => model, model],
            () => {
              if (model && isDef(model.value)) {
                storedValue.value = model.value
              }
            },
            { immediate: isDef(model?.value) },
          )
        })
      }
    })
  })

  return () => scope.stop()
}
