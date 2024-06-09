<script setup>
defineProps(['name'])
</script>

<template>
  <svg v-if="name === 'save'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6z"
    />
  </svg>

  <svg v-else-if="name === 'restore'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="m12 17l4-4l-1.4-1.4l-1.6 1.55V9h-2v4.15L9.4 11.6L8 13zm-6 5q-.825 0-1.412-.587T4 20V8l6-6h8q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm0-2h12V4h-7.15L6 8.85zm0 0h12z"
    />
  </svg>

  <svg v-else-if="name === 'add'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </svg>
</template>
