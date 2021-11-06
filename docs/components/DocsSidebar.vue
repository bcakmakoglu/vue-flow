<script lang="ts" setup>
const examples = [
  {
    path: '/',
    label: 'Introduction',
  },
]
</script>
<template>
  <aside>
    <div class="flex flex-col text-left items-start">
      <router-link v-for="(e, i) of examples" :key="`docs-link-${i}`" class="docs-link" :to="`/docs${e.path}`">
        {{ e.label }}
      </router-link>
    </div>
  </aside>
</template>
<style scoped>
.docs-link {
  @apply w-full text-lg text-white hover:text-yellow-500 px-3 py-2;
}
.router-link-active {
  @apply rounded-lg bg-white font-semibold text-yellow-500;
}
aside {
  @apply w-[280px] px-[10px] py-[15px];
  background: rgba(0, 0, 0, 0.25) !important;
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>
