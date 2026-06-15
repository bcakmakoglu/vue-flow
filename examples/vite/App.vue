<script lang="ts" setup>
import { VueFlowProvider } from '@vue-flow/core';
import Header from './Header.vue';
</script>

<template>
  <Header />
  <VueFlowProvider>
    <router-view />
  </VueFlowProvider>
</template>
