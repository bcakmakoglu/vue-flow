<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
}>();

defineEmits<{
  click: [payload: MouseEvent];
}>();
</script>

<script lang="ts">
export default {
  name: 'ControlButton',
  compatConfig: { MODE: 3 },
};
</script>

<template>
  <button type="button" class="vue-flow__controls-button" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>
