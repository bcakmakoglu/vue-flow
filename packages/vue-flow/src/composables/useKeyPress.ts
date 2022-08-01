import type { Ref } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import useWindow from './useWindow'

function isInputDOMNode(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement

  return (
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(target?.nodeName) ||
    target?.hasAttribute('contenteditable') ||
    !!target?.closest('.nokey')
  )
}

export default (keyFilter: KeyFilter, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  let isPressed = $ref(false)

  watch($$(isPressed), () => {
    if (onChange && typeof onChange === 'function') onChange(isPressed)
  })

  onKeyStroke(
    keyFilter,
    (e) => {
      if (isInputDOMNode(e)) return

      e.preventDefault()
      isPressed = true
    },
    { eventName: 'keydown' },
  )

  onKeyStroke(
    keyFilter,
    (e) => {
      if (isInputDOMNode(e)) return

      e.preventDefault()
      isPressed = false
    },
    { eventName: 'keyup' },
  )

  if (typeof window.addEventListener !== 'undefined') {
    useEventListener(window, 'blur', () => {
      isPressed = false
    })
  }

  if (onChange && typeof onChange === 'function') onChange(isPressed)

  return $$(isPressed)
}
