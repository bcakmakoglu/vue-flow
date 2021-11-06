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
/* these are necessary styles for vue flow */
@import 'node_modules/@braks/vue-flow/dist/style.css';

/* this contains the default theme, you can skip it if you want to */
@import 'node_modules/@braks/vue-flow/dist/theme-default.css';

#app {
  height: calc(100% - 92px);
}
</style>
