<script>
import 'virtual:windi.css'
import '@animxyz/core'
import '@vue-flow/renderer/dist/style.css'
import '@vue-flow/renderer/dist/theme-default.css'
import '../../assets/index.css'
</script>
<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>
<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="page-footer">MIT Licensed | Copyright © 2021-present Burak Cakmakoglu</div>
    </template>
  </ParentLayout>
</template>
<style>
.page-footer {
  @apply dark:(text-white bg-black) pt-[2rem] text-center;
  border-top: 1px solid var(--c-border);
  transition: border-color var(--t-color);
}

.theme-default-content:not(.custom) h1:first-of-type {
  margin-top: var(--navbar-height);
}
</style>
