import type { EventHook } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * Source code taken from https://github.com/vueuse/vueuse/blob/main/packages/shared/createEventHook/index.ts
 *
 * Modified to be able to check if there are any event listeners
 */
export interface EventHookExtended<T> extends EventHook<T> {
  hasListeners: () => boolean
}

export function createExtendedEventHook<T = any>(defaultHandler: (param: T) => void = () => {}): EventHookExtended<T> {
  const fns = new Set<(param: T) => void>()

  const hasListeners = () => fns.size > 0

  if (defaultHandler) {
    fns.add(defaultHandler)
  }

  const off = (fn: (param: T) => void) => {
    fns.delete(fn)
  }

  const on = (fn: (param: T) => void) => {
    if (fns.has(defaultHandler)) {
      fns.delete(defaultHandler)
    }

    fns.add(fn)
    const offFn = () => off(fn)

    tryOnScopeDispose(offFn)

    return {
      off: offFn,
    }
  }

  const trigger = (param: T) => {
    return Promise.all(Array.from(fns).map((fn) => fn(param)))
  }

  return {
    on,
    off,
    trigger,
    hasListeners,
  }
}
