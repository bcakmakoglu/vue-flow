import { Ref } from 'vue'
import { onKeyDown, onKeyPressed, onKeyUp } from '@vueuse/core'
import { KeyCode } from '../types'

// todo cancel keypress for input dom nodes
export default (keyCode: KeyCode, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const isPressed = controlledRef<boolean>(false, {
    onBeforeChange(val, oldVal) {
      if (val === oldVal) return false
    },
    onChanged() {
      if (onChange && typeof onChange === 'function') onChange(isPressed.value)
    },
  })

  onKeyPressed(
    (e) => e.key === keyCode || e.keyCode === keyCode,
    (e) => {
      e.preventDefault()
      isPressed.value = true
    },
  )

  onKeyDown(
    (e) => e.key === keyCode || e.keyCode === keyCode,
    (e) => {
      e.preventDefault()
      isPressed.value = true
    },
  )

  onKeyUp(
    (event) => event.key === keyCode || event.keyCode === keyCode,
    (e) => {
      e.preventDefault()
      isPressed.value = false
    },
  )

  if (window && typeof window !== 'undefined') {
    useEventListener(window, 'blur', () => {
      isPressed.value = false
    })
  }

  if (onChange && typeof onChange === 'function') onChange(isPressed.value)

  return isPressed
}
