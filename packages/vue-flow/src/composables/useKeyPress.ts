import type { Ref } from 'vue'
import type { KeyFilter, MaybeRef } from '@vueuse/core'
import { isBoolean } from '@vueuse/core'
import useWindow from './useWindow'

function isInputDOMNode(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement

  return (
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(target?.nodeName) ||
    target?.hasAttribute('contenteditable') ||
    !!target?.closest('.nokey')
  )
}

export default (keyFilter: MaybeRef<KeyFilter>, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  let isPressed = $ref(unref(keyFilter) === true)

  watch($$(isPressed), () => {
    if (onChange && typeof onChange === 'function') onChange(isPressed)
  })

  watchEffect(() => {
    const unrefKeyFilter = unref(keyFilter)

    if (isBoolean(unrefKeyFilter)) {
      isPressed = unrefKeyFilter
      return
    }

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
      (e) => {
        if (isInputDOMNode(e)) return

        e.preventDefault()
        isPressed = false
      },
      { eventName: 'keyup' },
    )
  })

  if (typeof window.addEventListener !== 'undefined') {
    useEventListener(window, 'blur', () => {
      isPressed = false
    })
  }

  return $$(isPressed)
}
