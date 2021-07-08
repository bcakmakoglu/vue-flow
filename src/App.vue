<template>
  <RevueFlow style="height: 1000px" :elements="elements"> Let's flow! </RevueFlow>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RevueFlow from './container/RevueFlow';

export default defineComponent({
  name: 'App',
  components: {
    RevueFlow
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
