<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>
<template>
  <Header />
  <div id="app" class="flex">
    <Sidebar />
    <div id="vue-flow-docs" class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<style>
@import 'assets/index.css';
@import '@braks/vue-flow/dist/style.css';

#app {
  height: calc(100% - 92px);
}
</style>
