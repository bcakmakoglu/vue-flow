import { Ref } from 'vue'
import { onKeyDown, onKeyPressed, onKeyUp } from '@vueuse/core'
import { KeyCode } from '~/types'

export default (keyCode: KeyCode, cb?: (keyPress: boolean) => void): Ref<boolean> => {
  const keyPressed = controlledRef<boolean>(false, {
    onBeforeChange(val, oldVal) {
      if (val === oldVal) return false
    },
    onChanged() {
      if (cb && typeof cb === 'function') cb(keyPressed.value)
    },
  })

  onKeyPressed(
    (e) => e.key === keyCode || e.keyCode === keyCode,
    (e) => {
      e.preventDefault()
      keyPressed.value = true
    },
  )

  onKeyDown(
    (e) => e.key === keyCode || e.keyCode === keyCode,
    (e) => {
      e.preventDefault()
      keyPressed.value = true
    },
  )

  onKeyUp(
    (event) => event.key === keyCode || event.keyCode === keyCode,
    (e) => {
      e.preventDefault()
      keyPressed.value = false
    },
  )

  useEventListener(window, 'blur', () => {
    keyPressed.value = false
  })

  if (cb && typeof cb === 'function') cb(keyPressed.value)

  return keyPressed
}
