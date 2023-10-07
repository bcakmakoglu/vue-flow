<script lang="ts" setup>
import Heart from '~icons/mdi/heart'
</script>

<template>
  <div id="acknowledgement">
    <div class="border-t-1 border-secondary pt-6">
      <div class="max-w-3/4 md:max-w-4xl mx-auto py-4 md:py-12 lg:py-12 text-center">
        <h1 class="md:(!mb-8) flex justify-center items-center gap-2"><Heart class="text-red-500 min-w-8" /> Acknowledgement</h1>

        <p>
          <span class="underline">First and foremost</span>: A huge <span class="font-semibold text-red-400">Thank you</span> to
          the developers of <a href="https://webkid.io" target="_blank" class="text-primary">Webkid</a>.

          <span class="inline-block">
            Without their continuous, amazing, open-source work, this project would not have been possible.
          </span>
        </p>

        <p>
          <span class="font-semibold text-accent">Vue Flow</span> is built on top of existing features and code taken from
          <a href="https://reactflow.dev" target="_blank" class="text-primary">React Flow</a>. It replicates the features found in
          React Flow and brings them to the Vue 3 experience, with all the fun reactivity and features like template slots etc.
          you know and love from Vue. If you're happy with Vue Flow,

          <span class="inline-block text-xl font-medium">
            please consider supporting <a href="https://webkid.io" target="_blank" class="text-primary">Webkid</a> by
            <a href="https://github.com/sponsors/wbkd" target="_blank" class="font-bold text-primary"> donating </a> or
            <a href="https://pro.reactflow.dev/" target="_blank" class="font-bold text-primary">
              subscribing to React Flow Pro.
            </a>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
