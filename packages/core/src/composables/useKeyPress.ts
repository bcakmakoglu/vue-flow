import type { MaybeRefOrGetter } from 'vue'
import { onMounted, ref, toValue, watch } from 'vue'
import type { KeyFilter, KeyPredicate } from '@vueuse/core'
import { onKeyStroke, useEventListener } from '@vueuse/core'
import { useWindow } from './useWindow'

export interface UseKeyPressOptions {
  actInsideInputWithModifier?: MaybeRefOrGetter<boolean>
  target?: MaybeRefOrGetter<EventTarget>
}

export function isInputDOMNode(event: KeyboardEvent): boolean {
  const target = (event.composedPath?.()?.[0] || event.target) as HTMLElement

  const hasAttribute = typeof target?.hasAttribute === 'function' ? target.hasAttribute('contenteditable') : false

  const closest = typeof target?.closest === 'function' ? target.closest('.nokey') : null

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
    if (!event.code && !event.key) {
      return false
    }

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

const window = useWindow()

/**
 * Composable that returns a boolean value if a key is pressed
 *
 * @public
 * @param keyFilter - Can be a boolean, a string, an array of strings or a function that returns a boolean. If it's a boolean, it will act as if the key is always pressed. If it's a string, it will return true if a key matching that string is pressed. If it's an array of strings, it will return true if any of the strings match a key being pressed, or a combination (e.g. ['ctrl+a', 'ctrl+b'])
 * @param options - Options object
 */
export function useKeyPress(
  keyFilter: MaybeRefOrGetter<KeyFilter | null>,
  options: UseKeyPressOptions = { actInsideInputWithModifier: true, target: window },
) {
  const isPressed = ref(toValue(keyFilter) === true)

  let modifierPressed = false

  const pressedKeys = new Set<string>()

  let currentFilter = createKeyFilterFn(toValue(keyFilter))

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

  onMounted(() => {
    useEventListener(window, ['blur', 'contextmenu'], reset)
  })

  onKeyStroke(
    (...args) => currentFilter(...args),
    (e) => {
      modifierPressed = wasModifierPressed(e)

      const preventAction = (!modifierPressed || (modifierPressed && !options.actInsideInputWithModifier)) && isInputDOMNode(e)

      if (preventAction) {
        return
      }

      e.preventDefault()

      isPressed.value = true
    },
    { eventName: 'keydown', target: options.target },
  )

  onKeyStroke(
    (...args) => currentFilter(...args),
    (e) => {
      if (isPressed.value) {
        const preventAction = (!modifierPressed || (modifierPressed && !options.actInsideInputWithModifier)) && isInputDOMNode(e)

        if (preventAction) {
          return
        }

        reset()
      }
    },
    { eventName: 'keyup', target: options.target },
  )

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
      reset()
      isPressed.value = keyFilter

      return () => false
    }

    if (Array.isArray(keyFilter) || typeof keyFilter === 'string') {
      return createKeyPredicate(keyFilter, pressedKeys)
    }

    return keyFilter
  }

  return isPressed
}
