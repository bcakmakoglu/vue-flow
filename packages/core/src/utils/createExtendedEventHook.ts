import type { EventHook } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * Source code taken from https://github.com/vueuse/vueuse/blob/main/packages/shared/createEventHook/index.ts
 *
 * Modified to be able to check if there are any event listeners
 */
export interface EventHookExtended<T> extends EventHook<T> {
  hasListeners: () => boolean
  fns: Set<(param: T) => void>
}

export function createExtendedEventHook<T = any>(defaultHandler?: (param: T) => void): EventHookExtended<T> {
  const fns = new Set<(param: T) => void>()

  let hasDefaultHandler = false

  const hasListeners = () => fns.size > 0

  if (defaultHandler) {
    hasDefaultHandler = true
    fns.add(defaultHandler)
  }

  const off = (fn: (param: T) => void) => {
    fns.delete(fn)
  }

  const on = (fn: (param: T) => void) => {
    if (defaultHandler && hasDefaultHandler) {
      fns.delete(defaultHandler)
    }

    fns.add(fn)

    const offFn = () => {
      off(fn)

      if (defaultHandler && hasDefaultHandler) {
        fns.add(defaultHandler)
      }
    }

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
    fns,
  }
}
