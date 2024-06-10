import { ref } from 'vue'

/**
 * In a real world example you would want to avoid creating refs in a global scope like this
 */
const isVisible = ref(false)
const message = ref('')
let resolveCallback

export function useDialogState() {
  return {
    isVisible,
    message,
    resolve: (value) => {
      if (resolveCallback) {
        resolveCallback(value)
      }
    },
  }
}

export function useDialog() {
  return {
    confirm(msg) {
      isVisible.value = true
      message.value = msg
      return new Promise((resolve) => {
        resolveCallback = resolve
      })
    },
  }
}
