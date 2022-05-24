<script lang="ts" setup>
import { Repl, ReplStore } from '@vue/repl'
import Foo from './Foo.vue?raw'
import css from './main.css'
import '@vue/repl/style.css'

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)

const store = new ReplStore({
  // starts on the output pane (mobile only) if the URL has a showOutput query
  showOutput: query.has('showOutput'),
  // starts on a different tab on the output pane if the URL has a outputMode query
  // and default to the "preview" tab
  outputMode: query.get('outputMode') || 'preview',
})

await store.setFiles(
  {
    'App.vue': Foo,
    'main.css': css,
  },
  'App.vue',
)

// pre-set import map
store.setImportMap({
  imports: {
    '@braks/vue-flow': `https://cdn.jsdelivr.net/npm/@braks/vue-flow@0.4.11/dist/vue-flow.es.js`,
  },
})

store.setVueVersion('3.2.25')
</script>

<template>
  <Repl style="height: 90vh; width: 100%" :clear-console="false" :auto-resize="true" :store="store" :show-compile-output="true" />
</template>

<style>
.file-selector {
  min-height: 50px;
}
</style>
