<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout: ParentLayout } = DefaultTheme
</script>

<template>
  <ParentLayout>
    <template #layout-bottom>
      <div class="page-footer">MIT Licensed | Copyright © 2021-present Burak Cakmakoglu</div>
    </template>
  </ParentLayout>
</template>

<style>
.page-footer {
  @apply py-4 text-center;
}
</style>
