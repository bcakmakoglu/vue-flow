<script lang="ts" setup>
import type { SFCOptions } from '@vue/repl'
import { ReplStore, Repl as VueRepl } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import { useVueFlow } from '@vue-flow/core'
import { exampleImports } from '../examples'

const props = defineProps<{ example: keyof typeof exampleImports; mainFile?: string }>()

const { vueFlowVersion } = useVueFlow()

let css = `@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@${vueFlowVersion}/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@${vueFlowVersion}/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';

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
}
\n`

const store = new ReplStore({
  showOutput: true,
  outputMode: 'preview',
})

const files: Record<string, (typeof imports)[keyof typeof imports]> = {}
const imports = exampleImports[props.example]
const additionalImports = 'additionalImports' in imports ? imports.additionalImports : {}

for (const example of Object.keys(imports).filter((i) => i !== 'additionalImports')) {
  if (example.includes('css')) {
    css += `${imports[example as keyof typeof imports]}`
  } else {
    files[example] = imports[example as keyof typeof imports]
  }
}

await store.setVueVersion('3.3.11')

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
    '@vue-flow/background': `${location.origin}/vue-flow-background.mjs`,
    '@vue-flow/controls': `${location.origin}/vue-flow-controls.mjs`,
    '@vue-flow/minimap': `${location.origin}/vue-flow-minimap.mjs`,
    '@vue-flow/core': `${location.origin}/vue-flow-core.mjs`,
    '@vue-flow/node-resizer': `${location.origin}/vue-flow-node-resizer.mjs`,
    '@vue-flow/node-toolbar': `${location.origin}/vue-flow-node-toolbar.mjs`,
    ...additionalImports,
  },
})

const sfcOptions = {
  script: {
    propsDestructure: true,
  },
} as SFCOptions
</script>

<template>
  <VueRepl
    :editor="CodeMirror"
    :store="store"
    :show-compile-output="false"
    :sfc-options="sfcOptions"
    :ssr="false"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
.file-selector {
  @apply scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-green-500 scrollbar-track-black;
}

.vue-repl {
  @apply border-1 border-solid dark:border-gray-200/10 border-gray-200;
  height: calc(100vh - var(--vp-nav-height) - 0.5rem);
}
</style>
