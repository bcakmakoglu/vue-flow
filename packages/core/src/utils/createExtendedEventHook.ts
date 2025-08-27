import type { EventHook } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * Source code taken from https://github.com/vueuse/vueuse/blob/main/packages/shared/createEventHook/index.ts
 *
 * Modified to be able to check if there are any event listeners
 */
export interface EventHookExtended<T> extends EventHook<T> {
  hasListeners: () => boolean
  listeners: Set<(param: T) => void>
  setEmitter: (fn: (param: T) => void) => void
  removeEmitter: () => void
}

export function createExtendedEventHook<T = any>(defaultHandler?: (param: T) => void): EventHookExtended<T> {
  const listeners = new Set<(param: T) => void>()

  // this is just a binding for `@emit` usage
  let emitter: ((param: T) => void) | null = null

  let hasDefaultHandler = false

  const hasListeners = () => listeners.size > 0

  if (defaultHandler) {
    hasDefaultHandler = true
    listeners.add(defaultHandler)
  }

  const setEmitter = (fn: (param: T) => void) => {
    emitter = fn
  }

  const removeEmitter = () => {
    emitter = null
  }

  const off = (fn: (param: T) => void) => {
    listeners.delete(fn)
  }

  const on = (fn: (param: T) => void) => {
    if (defaultHandler && hasDefaultHandler) {
      listeners.delete(defaultHandler)
    }

    listeners.add(fn)

    const offFn = () => {
      off(fn)

      if (defaultHandler && hasDefaultHandler) {
        listeners.add(defaultHandler)
      }
    }

    tryOnScopeDispose(offFn)

    return {
      off: offFn,
    }
  }

  const trigger = (param: T) => {
    return Promise.all(Array.from([...listeners, emitter]).map((fn) => fn?.(param)))
  }

  return {
    on,
    off,
    trigger,
    hasListeners,
    listeners,
    setEmitter,
    removeEmitter,
  }
}
