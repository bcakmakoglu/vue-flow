import type { Ref } from 'vue'
import type { KeyFilter, MaybeRef } from '@vueuse/core'
import { isBoolean, isFunction } from '@vueuse/core'

export function isInputDOMNode(event: KeyboardEvent): boolean {
  const target = (event.composedPath?.()?.[0] || event.target) as HTMLElement

  // we want to be able to do a multi selection event if we are in an input field
  if (event.ctrlKey || event.metaKey || event.shiftKey) return false

  const hasAttribute = isFunction(target.hasAttribute) ? target.hasAttribute('contenteditable') : false

  const closest = isFunction(target.closest) ? target.closest('.nokey') : null

  // when an input field is focused we don't want to trigger deletion or movement of nodes
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(target?.nodeName) || hasAttribute || !!closest
}

export default (keyFilter: MaybeRef<KeyFilter | null>, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  let isPressed = $ref(unref(keyFilter) === true)

  watch($$(isPressed), () => {
    if (onChange && typeof onChange === 'function') onChange(isPressed)
  })

  watchEffect(() => {
    const unrefKeyFilter = unref(keyFilter)

    if (typeof window.addEventListener !== 'undefined') {
      useEventListener(window, 'blur', () => {
        isPressed = false
      })
    }

    if (isBoolean(unrefKeyFilter)) {
      isPressed = unrefKeyFilter
      return
    }

    if (unrefKeyFilter) {
      onKeyStroke(
        unrefKeyFilter,
        (e) => {
          if (isInputDOMNode(e)) return

          e.preventDefault()

          isPressed = true
        },
        { eventName: 'keydown' },
      )

      onKeyStroke(
        unrefKeyFilter,
        () => {
          isPressed = false
        },
        { eventName: 'keyup' },
      )
    }
  })

  return $$(isPressed)
}
