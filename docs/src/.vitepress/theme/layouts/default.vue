<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout: ParentLayout } = DefaultTheme
</script>

<template>
  <ParentLayout></ParentLayout>
</template>

<style>
.page-footer {
  @apply py-4 text-center;
}
</style>
