import { getCurrentInstance } from 'vue'
import { FlowOptions, UseVueFlow } from '~/types'
import { VueFlow } from '~/context'
import { useStore } from '~/store'

let id = 0
export default (options?: Partial<FlowOptions>): UseVueFlow => {
  const currentInstance: any = getCurrentInstance()
  let vueFlow: UseVueFlow | false | undefined = currentInstance
    ? inject(VueFlow, undefined) ?? (currentInstance.vueFlow as UseVueFlow)
    : false
  if (!vueFlow || (vueFlow && options?.id && options.id !== vueFlow.id)) {
    const name = options?.id ?? `vue-flow-${id++}`
    const store = useStore(options)
    vueFlow = {
      id: name,
      store: reactive(store),
      ...toRefs(store.state),
      ...store.getters,
      ...store.actions,
      ...store.hooksOn,
    }
  }
  if (currentInstance) {
    provide(VueFlow, vueFlow)
    currentInstance.vueFlow = vueFlow
  }

  return vueFlow
}
