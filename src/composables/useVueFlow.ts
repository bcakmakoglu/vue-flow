import { EffectScope } from 'vue'
import { FlowOptions, UseVueFlow, Store } from '~/types'
import { VueFlow } from '~/context'
import { useStore } from '~/store'

let id = 0

type Scope = EffectScope & { vueFlow: UseVueFlow }
export default <N = any, E = N>(options?: Partial<FlowOptions<N, E>>): UseVueFlow<N, E> => {
  const scope = getCurrentScope() as Scope
  let vueFlow: UseVueFlow | null = scope ? inject(VueFlow, null) ?? (scope.vueFlow as UseVueFlow) : null
  if (!vueFlow || (vueFlow && options?.id && options.id !== vueFlow.id)) {
    const name = options?.id ?? `vue-flow-${id++}`
    const store: Store = useStore(options)
    vueFlow = {
      id: name,
      store: reactive(store),
      ...toRefs(store.state),
      ...store.getters,
      ...store.actions,
      ...store.hooksOn,
    } as unknown as UseVueFlow

    if (scope) {
      provide(VueFlow, vueFlow)
      scope.vueFlow = vueFlow
    }
  }
  if (!vueFlow) throw new Error('VueFlow instance not found.')

  return <UseVueFlow<N, E>>vueFlow
}
