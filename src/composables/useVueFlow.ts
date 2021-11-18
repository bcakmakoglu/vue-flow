import useHooks from './useHooks'
import useStore from './useStore'
import { FlowInstance } from '~/types'

export default () => {
  const store = useStore()
  const hooks = useHooks()
  const isReady = ref(false)
  const instance = ref<FlowInstance>()
  hooks.load.on((flow) => {
    isReady.value = true
    instance.value = flow
    if (import.meta.env.DEV) console.log(`vue flow ${store.$id} ready.`)
  })

  return {
    isReady,
    instance,
    store,
    hooks,
  }
}
