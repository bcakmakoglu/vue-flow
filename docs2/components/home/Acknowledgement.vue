<script lang="ts" setup>
import Heart from '~icons/mdi/heart'
</script>

<template>
  <div id="acknowledgement" class="w-full">
    <div class="max-w-11/12 md:max-w-6/12 m-auto py-4 md:(pb-12 pt-6) text-center">
      <div>
        <h1 class="md:mb-8 flex justify-center items-center"><Heart class="text-red-500" /> Acknowledgement</h1>
        <strong>First off</strong>: A big thank you to the developers of
        <a href="https://webkid.io" target="_blank" class="text-green-500">Webkid</a>. Their amazing work made it possible for me
        to create this port to Vue 3 - without them there is no Vue Flow.
      </div>
      <br />
      <div>
        Vue Flow is built on top of existing features and code taken from
        <a href="https://reactflow.dev" target="_blank" class="text-green-500">React Flow</a>. It replicates the basic features
        found in React Flow (zoom, pan, graph, additional components and more) and brings them to the Vue 3 experience, with all
        the fun reactivity and features like template slots etc. you know and love from Vue. If you're happy with Vue Flow,
        <br />
        <a href="https://github.com/sponsors/wbkd" target="_blank" class="text-lg font-bold text-green-500">
          please consider supporting Webkid by donating.
        </a>
      </div>
    </div>
  </div>
</template>
