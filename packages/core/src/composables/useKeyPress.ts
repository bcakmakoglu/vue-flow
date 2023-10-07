import { ref, watch } from 'vue'
import type { KeyFilter, KeyPredicate, MaybeRefOrGetter } from '@vueuse/core'
import { onKeyStroke, toValue, useEventListener } from '@vueuse/core'
import { isInputDOMNode } from '@xyflow/system'
import { useWindow } from './useWindow'

// we want to be able to do a multi selection event if we are in an input field
function wasModifierPressed(event: KeyboardEvent) {
  return event.ctrlKey || event.metaKey || event.shiftKey
}

function isKeyMatch(pressedKey: string, keyToMatch: string, pressedKeys: Set<string>, isKeyUp: boolean) {
  const keyCombination = keyToMatch.split('+').map((k) => k.trim().toLowerCase())

  if (keyCombination.length === 1) {
    return pressedKey.toLowerCase() === keyToMatch.toLowerCase()
  }

  if (isKeyUp) {
    pressedKeys.delete(pressedKey.toLowerCase())
  } else {
    pressedKeys.add(pressedKey.toLowerCase())
  }

  return keyCombination.every(
    (key, index) => pressedKeys.has(key) && Array.from(pressedKeys.values())[index] === keyCombination[index],
  )
}

function createKeyPredicate(keyFilter: string | string[], pressedKeys: Set<string>): KeyPredicate {
  return (event: KeyboardEvent) => {
    const keyOrCode = useKeyOrCode(event.code, keyFilter)

    // if the keyFilter is an array of multiple keys, we need to check each possible key combination
    if (Array.isArray(keyFilter)) {
      return keyFilter.some((key) => isKeyMatch(event[keyOrCode], key, pressedKeys, event.type === 'keyup'))
    }

    // if the keyFilter is a string, we need to check if the key matches the string
    return isKeyMatch(event[keyOrCode], keyFilter, pressedKeys, event.type === 'keyup')
  }
}

function useKeyOrCode(code: string, keysToWatch: string | string[]) {
  if (typeof keysToWatch === 'string') {
    return code === keysToWatch ? 'code' : 'key'
  }

  return keysToWatch.includes(code) ? 'code' : 'key'
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

  let currentFilter = createKeyFilterFn(toValue(keyFilter))

  watch(isPressed, (isKeyPressed, wasPressed) => {
    if (isKeyPressed !== wasPressed) {
      onChange?.(isKeyPressed)
    }
  })

  watch(
    () => toValue(keyFilter),
    (nextKeyFilter, previousKeyFilter) => {
      // if the previous keyFilter was a boolean but is now something else, we need to reset the isPressed value
      if (typeof previousKeyFilter === 'boolean' && typeof nextKeyFilter !== 'boolean') {
        reset()
      }

      currentFilter = createKeyFilterFn(nextKeyFilter)
    },
    {
      immediate: true,
    },
  )

  useEventListener(window, 'blur', () => {
    if (toValue(keyFilter) !== true) {
      isPressed.value = false
    }
  })

  onKeyStroke(
    (...args) => currentFilter(...args),
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
    (...args) => currentFilter(...args),
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

  return isPressed

  function reset() {
    modifierPressed = false

    pressedKeys.clear()

    isPressed.value = false
  }

  function createKeyFilterFn(keyFilter: KeyFilter | null) {
    // if the keyFilter is null, we just set the isPressed value to false
    if (keyFilter === null) {
      reset()
      return () => false
    }

    // if the keyFilter is a boolean, we just set the isPressed value to that boolean
    if (typeof keyFilter === 'boolean') {
      if (keyFilter) {
        isPressed.value = keyFilter
        return () => true
      } else {
        reset()
        return () => false
      }
    }

    if (Array.isArray(keyFilter) || typeof keyFilter === 'string') {
      return createKeyPredicate(keyFilter, pressedKeys)
    }

    return keyFilter
  }
}
