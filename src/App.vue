<template>
  <div id="app">
    <h1>Revue Flow</h1>
    <Basic style="height: 75vh; background: #1a192b" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import Basic from './Basic';

export default defineComponent({
  name: 'App',
  components: {
    Basic
  },
  data() {
    return {
      elements: [
        { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
        { id: 'e1-2', source: '1', target: '2', animated: true }
      ]
    };
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
