<script lang="ts" setup>
import { Repl, ReplStore } from '@vue/repl'
import pkg from '../package.json'
import Foo from './Foo.vue?raw'
import css from './main.css'
import '@vue/repl/style.css'

const store = new ReplStore({
  showOutput: true,
  outputMode: 'preview',
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
    '@braks/vue-flow': `https://cdn.jsdelivr.net/npm/@braks/vue-flow@${pkg.dependencies['@braks/vue-flow']}/dist/vue-flow.es.js`,
  },
})

store.setVueVersion('3.2.25')

const sfcOptions = {
  script: {
    reactivityTransform: true,
  },
}
</script>

<template>
  <Repl
    style="height: 90vh; width: 100%"
    :clear-console="true"
    :auto-resize="true"
    :store="store"
    :show-compile-output="true"
    :sfc-options="sfcOptions"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
.file-selector {
  min-height: 50px;
}
</style>
