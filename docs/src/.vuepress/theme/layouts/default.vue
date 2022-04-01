<script>
import 'virtual:windi.css'
import '@braks/vue-flow/dist/style.css'
import '@braks/vue-flow/dist/theme-default.css'
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
  @apply dark:(text-white bg-black) pt-[2rem];
  border-top: 1px solid var(--c-border);
  text-align: center;
  transition: border-color var(--t-color);
}
</style>
