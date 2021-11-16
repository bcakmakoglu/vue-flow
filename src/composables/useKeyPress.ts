import { Ref } from 'vue'
import { onKeyDown, onKeyPressed, onKeyUp } from '@vueuse/core'
import useWindow from './useWindow'
import { KeyCode } from '~/types'
import { isInputDOMNode } from '~/utils'

export default (keyCode: KeyCode, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()
  const isPressed = controlledRef<boolean>(false, {
    onBeforeChange(val, oldVal) {
      if (val === oldVal) return false
    },
    onChanged() {
      if (onChange && typeof onChange === 'function') onChange(isPressed.value)
    },
  })

  onKeyPressed(
    (e) => !isInputDOMNode(e) && (e.key === keyCode || e.keyCode === keyCode),
    (e) => {
      e.preventDefault()
      isPressed.value = true
    },
  )

  onKeyDown(
    (e) => !isInputDOMNode(e) && (e.key === keyCode || e.keyCode === keyCode),
    (e) => {
      e.preventDefault()
      isPressed.value = true
    },
  )

  onKeyUp(
    (e) => !isInputDOMNode(e) && (e.key === keyCode || e.keyCode === keyCode),
    (e) => {
      e.preventDefault()
      isPressed.value = false
    },
  )

  useEventListener(window, 'blur', () => {
    isPressed.value = false
  })

  if (onChange && typeof onChange === 'function') onChange(isPressed.value)

  return isPressed
}
