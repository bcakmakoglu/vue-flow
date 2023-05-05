import type { Ref } from 'vue'
import type { KeyFilter, KeyPredicate, MaybeRefOrGetter } from '@vueuse/core'

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

function createKeyPredicate(keyFilter: string[], pressedKeys: Set<string>): KeyPredicate {
  return (event: KeyboardEvent) =>
    keyFilter.some((key) => {
      const keyCombination = key.split('+').map((k) => k.trim().toLowerCase())

      if (keyCombination.length === 1) {
        return event.key === key
      } else {
        pressedKeys.add(event.key.toLowerCase())
        return keyCombination.every((key) => pressedKeys.has(key))
      }
    })
}

/**
 * Reactive key press state
 *
 * @param keyFilter - Can be a boolean, a string or an array of strings. If it's a boolean, it will always return that value. If it's a string, it will return true if the key is pressed. If it's an array of strings, it will return true if any of the keys are pressed, or a combination is pressed (e.g. ['ctrl+a', 'ctrl+b'])
 * @param onChange - Callback function that will be called when the key state changes
 */
export default (keyFilter: MaybeRefOrGetter<KeyFilter | null>, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  const isPressed = ref(resolveUnref(keyFilter) === true)

  let modifierPressed = false

  const pressedKeys = new Set<string>()

  watch(isPressed, () => {
    onChange?.(isPressed.value)
  })

  watch(
    () => resolveUnref(keyFilter),
    (unrefKeyFilter) => {
      if (window && typeof window.addEventListener !== 'undefined') {
        useEventListener(window, 'blur', () => {
          isPressed.value = false
        })
      }

      if (isBoolean(unrefKeyFilter)) {
        isPressed.value = unrefKeyFilter
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

            if (!modifierPressed && isInputDOMNode(e)) {
              return
            }

            e.preventDefault()

            isPressed.value = true
          },
          { eventName: 'keydown' },
        )

        onKeyStroke(
          unrefKeyFilter,
          (e) => {
            if (isPressed.value) {
              if (!modifierPressed && isInputDOMNode(e)) {
                return
              }

              modifierPressed = false

              pressedKeys.clear()

              isPressed.value = false
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
}
