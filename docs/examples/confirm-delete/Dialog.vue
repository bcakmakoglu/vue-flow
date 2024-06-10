<script setup>
import { useDialogState } from './useDialog.js'

const { isVisible, message, resolve } = useDialogState()

function confirm() {
  resolve(true)
  isVisible.value = false
}

function cancel() {
  resolve(false)
  isVisible.value = false
}
</script>

<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="dialog">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="#e53e3e"
          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
        />
      </svg>

      <p v-if="typeof message === 'string'">{{ message }}</p>
      <component :is="message" v-else />

      <div class="actions">
        <button @click="confirm">Confirm</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog {
  background: #2d3748;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  color: white;
}

.dialog .actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dialog .actions button {
  background: #4a5568;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.dialog .actions button:first-of-type:hover {
  background: #2563eb;
}

.dialog .actions button:last-of-type:hover {
  background: #e53e3e;
}
</style>
