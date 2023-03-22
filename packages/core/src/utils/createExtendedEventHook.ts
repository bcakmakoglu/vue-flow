import type { Ref } from 'vue'
import type { EventHook } from '@vueuse/core'

/**
 * Source code taken from https://github.com/vueuse/vueuse/blob/main/packages/shared/createEventHook/index.ts
 *
 * Modified to be able to check if there are any event listeners
 */
export interface EventHookExtended<T> extends EventHook<T> {
  fns: Ref<Set<(param: T) => void>>
}

export function createExtendedEventHook<T = any>(defaultHandler: (param: T) => void = () => {}): EventHookExtended<T> {
  const fns = ref(new Set<(param: T) => void>())

  if (defaultHandler) {
    fns.value.add(defaultHandler)
  }

  const off = (fn: (param: T) => void) => {
    fns.value.delete(fn)
  }

  const on = (fn: (param: T) => void) => {
    if (fns.value.has(defaultHandler)) {
      fns.value.delete(defaultHandler)
    }

    fns.value.add(fn)
    const offFn = () => off(fn)

    tryOnScopeDispose(offFn)

    return {
      off: offFn,
    }
  }

  const trigger = (param: T) => {
    return Promise.all(Array.from(fns.value).map((fn) => fn(param)))
  }

  return {
    on,
    off,
    trigger,
    fns,
  }
}
