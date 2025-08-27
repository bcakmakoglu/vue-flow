import type { EventHook } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

export interface EventHookExtended<T> extends EventHook<T> {
  /** true if any user listeners are registered (emitter ignored) */
  hasListeners: () => boolean
  /** current user listeners (read-only; do not mutate externally) */
  listeners: ReadonlySet<(param: T) => void>
  /** wire a single external emitter (e.g., for `emit`) */
  setEmitter: (fn: (param: T) => void) => void
  /** remove the external emitter */
  removeEmitter: () => void
  /** wire a function to detect if any emit listeners exist (e.g., for `$listeners` in Vue 2) */
  setHasEmitListeners: (fn: () => boolean) => void
  /** remove the emit listeners detector */
  removeHasEmitListeners: () => void
}

type Handler<T = any> = (param: T) => any | Promise<any>

const noop: Handler = () => {}

export function createExtendedEventHook<T = any>(defaultHandler?: (param: T) => void): EventHookExtended<T> {
  const listeners = new Set<Handler>()
  let emitter: Handler = noop
  let hasEmitListeners = () => false

  const hasListeners = () => listeners.size > 0 || hasEmitListeners()

  const setEmitter = (fn: Handler) => {
    emitter = fn
  }

  const removeEmitter = () => {
    emitter = noop
  }

  const setHasEmitListeners = (fn: () => boolean) => {
    hasEmitListeners = fn
  }

  const removeHasEmitListeners = () => {
    hasEmitListeners = () => false
  }

  const off = (fn: Handler) => {
    listeners.delete(fn)
  }

  const on = (fn: Handler) => {
    listeners.add(fn)

    const offFn = () => off(fn)
    tryOnScopeDispose(offFn)

    return { off: offFn }
  }

  /**
   * Trigger order:
   * 1) If any user listeners OR an emitter exist -> call all of those (defaultHandler is skipped)
   * 2) Else (no listeners and no emitter) -> call defaultHandler (if provided)
   *
   * Errors are isolated via allSettled so one failing handler doesn't break others.
   */
  const trigger = (param: T) => {
    const queue: Handler[] = [emitter]

    if (hasListeners()) {
      queue.push(...listeners)
    } else if (defaultHandler) {
      queue.push(defaultHandler)
    }

    return Promise.allSettled(queue.map((fn) => fn(param)))
  }

  return {
    on,
    off,
    trigger,
    hasListeners,
    listeners,
    setEmitter,
    removeEmitter,
    setHasEmitListeners,
    removeHasEmitListeners,
  }
}
