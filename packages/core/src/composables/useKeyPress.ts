import type { Ref } from 'vue'
import type { KeyFilter, KeyPredicate, MaybeRef } from '@vueuse/core'
import { isBoolean, isFunction } from '@vueuse/core'

export function isInputDOMNode(event: KeyboardEvent): boolean {
  const target = (event.composedPath?.()?.[0] || event.target) as HTMLElement

  const hasAttribute = isFunction(target.hasAttribute) ? target.hasAttribute('contenteditable') : false

  const closest = isFunction(target.closest) ? target.closest('.nokey') : null

  // when an input field is focused we don't want to trigger deletion or movement of nodes
  return ['INPUT', 'SELECT', 'TEXTAREA'].includes(target?.nodeName) || hasAttribute || !!closest
}

// we want to be able to do a multi selection event if we are in an input field
function wasModifierPressed(event: KeyboardEvent) {
  return event.ctrlKey || event.metaKey || event.shiftKey
}

function createKeyPredicate(keyFilter: KeyFilter, pressedKeys: Set<string>): KeyPredicate {
  return (event: KeyboardEvent) =>
    (keyFilter as string[]).some((key) => {
      const keyCombination = key.split('+').map((k) => k.trim().toLowerCase())

      if (keyCombination.length === 1) {
        return event.key === key
      } else {
        pressedKeys.add(event.key.toLowerCase())
        return keyCombination.every((key) => pressedKeys.has(key))
      }
    })
}

export default (keyFilter: MaybeRef<KeyFilter | null>, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  let isPressed = $ref(unref(keyFilter) === true)

  let modifierPressed = $ref(false)

  const pressedKeys = $ref<Set<string>>(new Set())

  watch($$(isPressed), () => {
    if (onChange && typeof onChange === 'function') onChange(isPressed)
  })

  watchEffect(() => {
    let unrefKeyFilter = unref(keyFilter)

    if (typeof window.addEventListener !== 'undefined') {
      useEventListener(window, 'blur', () => {
        isPressed = false
      })
    }

    if (isBoolean(unrefKeyFilter)) {
      isPressed = unrefKeyFilter
      return
    }

    if (Array.isArray(unrefKeyFilter)) {
      unrefKeyFilter = createKeyPredicate(unrefKeyFilter, pressedKeys)
    }

    if (unrefKeyFilter) {
      onKeyStroke(
        unrefKeyFilter,
        (e) => {
          modifierPressed = wasModifierPressed(e)

          if (!modifierPressed && isInputDOMNode(e)) return

          e.preventDefault()

          isPressed = true
        },
        { eventName: 'keydown' },
      )

      onKeyStroke(
        unrefKeyFilter,
        (e) => {
          if (isPressed) {
            if (!modifierPressed && isInputDOMNode(e)) return

            modifierPressed = false

            pressedKeys.clear()

            isPressed = false
          }
        },
        { eventName: 'keyup' },
      )
    }
  })

  return $$(isPressed)
}
