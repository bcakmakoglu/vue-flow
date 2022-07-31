import type { Ref } from 'vue'
import type { KeyFilter } from '@vueuse/core'
import useWindow from './useWindow'

export default (keyFilter: KeyFilter, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  let isPressed = $ref(false)

  watch($$(isPressed), () => {
    if (onChange && typeof onChange === 'function') onChange(isPressed)
  })

  onKeyStroke(
    keyFilter,
    (e) => {
      e.preventDefault()
      isPressed = true
    },
    { eventName: 'keydown' },
  )

  onKeyStroke(
    keyFilter,
    (e) => {
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
