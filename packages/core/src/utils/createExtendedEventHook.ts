import type { EventHook, EventHookOn, EventHookTrigger } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'

// Extract VueUse's actual callback type for T (includes tuple/void/any behavior)
type HookCallback<T> = Parameters<EventHookOn<T>>[0]
type HookArgs<T> = Parameters<HookCallback<T>>

export interface EventHookExtended<T> extends EventHook<T> {
  /** true if any user listeners are registered (emitter ignored) */
  hasListeners: () => boolean
  /** current user listeners (read-only; do not mutate externally) */
  listeners: ReadonlySet<HookCallback<T>>
  /** wire a single external emitter (e.g., for `emit`) */
  setEmitter: (fn: HookCallback<T>) => void
  /** remove the external emitter */
  removeEmitter: () => void
  /** wire a function to detect if any emit listeners exist (e.g., for `$listeners` in Vue 2) */
  setHasEmitListeners: (fn: () => boolean) => void
  /** remove the emit listeners detector */
  removeHasEmitListeners: () => void
}

function noop(..._args: any[]) {}

export function createExtendedEventHook<T = any>(defaultHandler?: HookCallback<T>): EventHookExtended<T> {
  const listeners = new Set<HookCallback<T>>()
  let emitter: HookCallback<T> = noop as HookCallback<T>
  let hasEmitListeners = () => false

  const hasListeners = () => listeners.size > 0 || hasEmitListeners()

  const setEmitter = (fn: HookCallback<T>) => {
    emitter = fn
  }

  const removeEmitter = () => {
    emitter = noop as HookCallback<T>
  }

  const setHasEmitListeners = (fn: () => boolean) => {
    hasEmitListeners = fn
  }

  const removeHasEmitListeners = () => {
    hasEmitListeners = () => false
  }

  const off = (fn: HookCallback<T>) => {
    listeners.delete(fn)
  }

  const on: EventHookOn<T> = (fn) => {
    listeners.add(fn)

    const offFn = () => off(fn)
    tryOnScopeDispose(offFn)

    return { off: offFn }
  }

  const clear = () => {
    listeners.clear()
  }

  const trigger: EventHookTrigger<T> = async (...args: HookArgs<T>) => {
    const queue: HookCallback<T>[] = [emitter]

    if (hasListeners()) {
      queue.push(...listeners)
    } else if (defaultHandler) {
      queue.push(defaultHandler)
    }

    return Promise.all(queue.map((fn) => fn(...args)))
  }

  return {
    on,
    off,
    trigger,
    clear,
    hasListeners,
    listeners,
    setEmitter,
    removeEmitter,
    setHasEmitListeners,
    removeHasEmitListeners,
  }
}
