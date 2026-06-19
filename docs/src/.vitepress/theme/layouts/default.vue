<script setup>
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { watch } from 'vue';

const { Layout: ParentLayout } = DefaultTheme;

const route = useRoute();

onMounted(() => {
  watch(
    route,
    (nextRoute) => {
      if (nextRoute.path.includes('/examples')) {
        document.body.className = 'examples';
      }
      else {
        document.body.className = '';
      }
    },
    { immediate: true },
  );
});
</script>

<template>
  <ParentLayout />
</template>
