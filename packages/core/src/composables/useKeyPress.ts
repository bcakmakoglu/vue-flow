import { ref, watch } from 'vue'
import type { KeyFilter, KeyPredicate, MaybeRefOrGetter } from '@vueuse/core'
import { onKeyStroke, toValue, useEventListener } from '@vueuse/core'
import { useWindow } from './useWindow'
import { isBoolean, isFunction, isString } from '~/utils'

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

function isKeyMatch(pressedKey: string, keyToMatch: string, pressedKeys: Set<string>, isKeyUp: boolean) {
  const keyCombination = keyToMatch.split('+').map((k) => k.trim().toLowerCase())

  if (keyCombination.length === 1) {
    return pressedKey === keyToMatch
  } else {
    if (isKeyUp) {
      pressedKeys.delete(pressedKey.toLowerCase())
    } else {
      pressedKeys.add(pressedKey.toLowerCase())
    }

    return keyCombination.every(
      (key, index) => pressedKeys.has(key) && Array.from(pressedKeys.values())[index] === keyCombination[index],
    )
  }
}

function createKeyPredicate(keyFilter: string | string[], pressedKeys: Set<string>): KeyPredicate {
  return (event: KeyboardEvent) => {
    // if the keyFilter is an array of multiple keys, we need to check each possible key combination
    if (Array.isArray(keyFilter)) {
      return keyFilter.some((key) => isKeyMatch(event.key, key, pressedKeys, event.type === 'keyup'))
    }

    // if the keyFilter is a string, we need to check if the key matches the string
    return isKeyMatch(event.key, keyFilter, pressedKeys, event.type === 'keyup')
  }
}

/**
 * Reactive key press state
 *
 * @param keyFilter - Can be a boolean, a string or an array of strings. If it's a boolean, it will always return that value. If it's a string, it will return true if the key is pressed. If it's an array of strings, it will return true if any of the keys are pressed, or a combination is pressed (e.g. ['ctrl+a', 'ctrl+b'])
 * @param onChange - Callback function that will be called when the key state changes
 */
export function useKeyPress(keyFilter: MaybeRefOrGetter<KeyFilter | null>, onChange?: (keyPressed: boolean) => void) {
  const window = useWindow()

  const isPressed = ref(toValue(keyFilter) === true)

  let modifierPressed = false

  const pressedKeys = new Set<string>()

  watch(isPressed, () => {
    onChange?.(isPressed.value)
  })

  watch(
    () => toValue(keyFilter),
    (nextKeyFilter, previousKeyFilter) => {
      if (window && typeof window.addEventListener !== 'undefined') {
        useEventListener(window, 'blur', () => {
          isPressed.value = false
        })
      }

      // if the previous keyFilter was a boolean but is now something else, we need to reset the isPressed value
      if (isBoolean(previousKeyFilter) && !isBoolean(nextKeyFilter)) {
        reset()
      }

      // if the keyFilter is null, we just set the isPressed value to false
      if (nextKeyFilter === null) {
        reset()
        return
      }

      // if the keyFilter is a boolean, we just set the isPressed value to that boolean
      if (isBoolean(nextKeyFilter)) {
        isPressed.value = nextKeyFilter
        return
      }

      if (Array.isArray(nextKeyFilter) || (isString(nextKeyFilter) && nextKeyFilter.includes('+'))) {
        nextKeyFilter = createKeyPredicate(nextKeyFilter, pressedKeys)
      }

      if (nextKeyFilter) {
        onKeyStroke(
          nextKeyFilter,
          (e) => {
            modifierPressed = wasModifierPressed(e)

            if (!modifierPressed && isInputDOMNode(e)) {
              return
            }

            e.preventDefault()

            isPressed.value = true
          },
          { eventName: 'keydown' },
        )

        onKeyStroke(
          nextKeyFilter,
          (e) => {
            if (isPressed.value) {
              if (!modifierPressed && isInputDOMNode(e)) {
                return
              }

              reset()
            }
          },
          { eventName: 'keyup' },
        )
      }
    },
    {
      immediate: true,
    },
  )

  return isPressed

  function reset() {
    modifierPressed = false

    pressedKeys.clear()

    isPressed.value = false
  }
}
