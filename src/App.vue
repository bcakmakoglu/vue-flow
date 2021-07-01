<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <revue-flow></revue-flow>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Index from './container/RevueFlow';

export default defineComponent({
  name: 'App',
  components: {
    RevueFlow: Index
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
