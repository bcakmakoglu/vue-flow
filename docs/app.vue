<template>
  <NuxtLayout name="default">
    <Header />
    <div class="h-full flex flex-row">
      <Sidebar />
      <div id="vue-flow-docs" class="flex-1">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>
<style>
@import 'assets/index.css';
@import 'node_modules/@braks/vue-flow/dist/style.css';
</style>
