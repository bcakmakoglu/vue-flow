<script lang="ts" setup>
import { Repl, ReplStore } from '@vue/repl'
import { useVueFlow } from '@braks/vue-flow'
import '@vue/repl/style.css'
import { exampleImports } from './examples'

const props = defineProps<{ example: keyof typeof exampleImports; mainFile?: string; dependencies?: Record<string, string> }>()
const { vueFlowVersion } = useVueFlow()
let css = `@import 'https://cdn.jsdelivr.net/npm/@braks/vue-flow@${vueFlowVersion}/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@braks/vue-flow@${vueFlowVersion}/dist/theme-default.css';

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
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
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
const imports = exampleImports[props.example]

for (const example of Object.keys(imports)) {
  if (example.includes('css')) {
    css += `${imports[example as keyof typeof imports]}`
  } else {
    files[example] = imports[example as keyof typeof imports]
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
    '@braks/vue-flow': `${location.origin}/vue-flow.es.js`,
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

.msg.err {
  display: none;
}
</style>
