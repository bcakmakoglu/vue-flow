<script lang="ts" setup>
import { Repl, ReplStore } from '@vue/repl'
import pkg from '../package.json'
import '@vue/repl/style.css'

const props = defineProps<{ mainFile?: string; files: { filename: string; file: string }[] }>()

let css = `@import 'https://cdn.jsdelivr.net/npm/@braks/vue-flow@${pkg.dependencies['@braks/vue-flow']}/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@braks/vue-flow@${pkg.dependencies['@braks/vue-flow']}/dist/theme-default.css';

html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}`

const store = new ReplStore({
  showOutput: true,
  outputMode: 'preview',
})

watchEffect(
  () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
  },
  { flush: 'post' },
)

const files: any = {}

for (const curr of props.files) {
  if (curr.file.includes('.css')) {
    css += `${(await import(`./examples/${curr.file}`)).default}`
  } else {
    files[curr.filename] = (await import(`./examples/${curr.file}?raw`)).default
  }
}

await store.setFiles(
  {
    ...files,
    'main.css': css,
  },
  props.mainFile ?? 'App.vue',
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
    :clear-console="true"
    :auto-resize="true"
    :store="store"
    :show-compile-output="false"
    :show-import-map="false"
    :sfc-options="sfcOptions"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
.file-selector {
  @apply scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-green-500 scrollbar-track-black;
}

.vue-repl {
  @apply rounded-lg border-1 border-solid dark:border-gray-200/10 border-gray-200;

  height: calc(var(--vh) - var(--navbar-height));
}
</style>
