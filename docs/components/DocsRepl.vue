<script lang="ts" setup>
import type { SFCOptions } from '@vue/repl'
import { ReplStore, Repl as VueRepl } from '@vue/repl'
import { useVueFlow } from '@vue-flow/core'
import '@vue/repl/style.css'
import { isClient } from '@vueuse/core'
import { exampleImports } from './examples'

const props = defineProps<{ example: keyof typeof exampleImports; mainFile?: string; dependencies?: Record<string, string> }>()

const { vueFlowVersion } = useVueFlow()

let css = `@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@${vueFlowVersion.value}/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@${vueFlowVersion.value}/dist/theme-default.css';

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

const vh = useCssVar('--vh')

watchEffect(() => {
  vh.value = `${window.innerHeight}px`
})

const files: any = {}
const imports = exampleImports[props.example]
const additionalImports = 'additionalImports' in imports ? imports.additionalImports : {}

for (const example of Object.keys(imports).filter((i) => i !== 'additionalImports')) {
  if (example.includes('css')) {
    css += `${imports[example as keyof typeof imports]}`
  } else {
    files[example] = imports[example as keyof typeof imports]
  }
}

onMounted(async () => {
  await store.setVueVersion('3.2.37')

  await store.setFiles(
    {
      ...files,
      'main.css': css,
    },
    props.mainFile ?? 'App.vue',
  )

  // pre-set import map
  await store.setImportMap({
    imports: {
      '@vue-flow/additional-components': `${location.origin}/vue-flow-additional-components.mjs`,
      '@vue-flow/core': `${location.origin}/vue-flow-core.mjs`,
      ...additionalImports,
    },
  })

  if (isClient) {
    document.body.className = 'examples'
  }
})

const sfcOptions = {
  script: {
    reactivityTransform: true,
  },
} as SFCOptions
</script>

<template>
  <VueRepl
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
  --vh: 100vh;

  @apply rounded-lg border-1 border-solid dark:border-gray-200/10 border-gray-200;

  height: calc(var(--vh) - 72px);
}

.msg.err {
  @apply hidden;
}
</style>
