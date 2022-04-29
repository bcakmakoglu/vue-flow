import { Ref } from 'vue'
import { onKeyDown, onKeyPressed, onKeyUp } from '@vueuse/core'
import useWindow from './useWindow'
import { KeyCode } from '~/types'
import { isInputDOMNode } from '~/utils'

export default (keyCode: Ref<KeyCode>, onChange?: (keyPressed: boolean) => void): Ref<boolean> => {
  const window = useWindow()

  let isPressed = $ref(false)

  watchEffect(
    () => {
      if (onChange && typeof onChange === 'function') onChange(isPressed)
    },
    { flush: 'post' },
  )

  onKeyPressed(
    (e) => !isInputDOMNode(e) && (e.key === keyCode.value || e.keyCode === keyCode.value),
    (e) => {
      e.preventDefault()
      isPressed = true
    },
  )

  onKeyDown(
    (e) => !isInputDOMNode(e) && (e.key === keyCode.value || e.keyCode === keyCode.value),
    (e) => {
      e.preventDefault()
      isPressed = true
    },
  )

  onKeyUp(
    (e) => !isInputDOMNode(e) && (e.key === keyCode.value || e.keyCode === keyCode.value),
    (e) => {
      e.preventDefault()
      isPressed = false
    },
  )

  if (typeof window.addEventListener !== 'undefined') {
    useEventListener(window, 'blur', () => {
      isPressed = false
    })
  }

  if (onChange && typeof onChange === 'function') onChange(isPressed)

  return $$(isPressed)
}
