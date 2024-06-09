import { ref } from 'vue'

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
