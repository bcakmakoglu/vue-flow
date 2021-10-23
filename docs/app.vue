<template>
  <Header />
  <div id="app" class="flex">
    <Sidebar />
    <div id="vue-flow-docs" class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
<style>
@import 'assets/index.css';
@import 'node_modules/@braks/vue-flow/dist/style.css';

#app {
  height: calc(100% - 92px);
}
</style>
