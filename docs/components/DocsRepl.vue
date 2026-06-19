<script lang="ts" setup>
import type { SFCOptions } from '@vue/repl';
import { useStore, useVueImportMap, Repl as VueRepl } from '@vue/repl';
import CodeMirror from '@vue/repl/codemirror-editor';
import { computed } from 'vue';
import { exampleImports } from '../examples';

const props = defineProps<{ example: keyof typeof exampleImports; mainFile?: string }>();

// load the in-repo 2.0 core styles served from /public (see .vitepress/plugins/copy.ts) rather than
// the CDN — the CDN only has the last published 1.x release, which mismatches the local 2.0 runtime
let css = `@import '${location.origin}/vue-flow-core.css';

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
\n`;

const imports = exampleImports[props.example];
const additionalImports = 'additionalImports' in imports ? imports.additionalImports : {};
const files: Record<string, (typeof imports)[keyof typeof imports]> = {};

for (const example of Object.keys(imports).filter(i => i !== 'additionalImports')) {
  if (example.includes('css')) {
    css += formatCSS(imports[example as keyof typeof imports]);
  }
  else {
    files[example] = imports[example as keyof typeof imports];
  }
}

// `useVueImportMap` builds the sandbox's Vue runtime import map (matched to the repl's bundled
// compiler). Merge the vue-flow runtime modules into the built-in map so they resolve in the
// sandbox without surfacing as an editable `import-map.json`.
const { importMap: vueImportMap, vueVersion } = useVueImportMap();

const builtinImportMap = computed(() => ({
  imports: {
    ...vueImportMap.value.imports,
    '@vue-flow/core': `${location.origin}/vue-flow-core.mjs`,
    ...additionalImports,
  },
}));

const sfcOptions: SFCOptions = {
  script: {
    propsDestructure: true,
  },
};

const store = useStore({ builtinImportMap, vueVersion });
store.showOutput = true;
store.outputMode = 'preview';
store.sfcOptions = sfcOptions;

await store.setFiles(
  {
    ...files,
    'main.css': css,
  },
  props.mainFile ?? 'App.vue',
);

function onKeydown(event: KeyboardEvent) {
  // prevent the browser's save dialog on both Ctrl+S and Cmd+S
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
  }
}

function formatCSS(cssString: string) {
  let formattedString = cssString;

  formattedString = formattedString.replace(/\}/g, '\n}\n\n');
  formattedString = formattedString.replace(/;/g, ';\n    ');

  formattedString = formattedString.replace(/\{/g, ' {\n    ');

  return formattedString.trim();
}
</script>

<template>
  <!-- wrapper owns the keydown guard: v4's <Repl> no longer forwards a `keydown` listener, so we
       catch the bubbled event here (`display: contents` keeps it layout-neutral) -->
  <div class="docs-repl" @keydown="onKeydown">
    <VueRepl
      :editor="CodeMirror"
      :store="store"
      :show-compile-output="false"
      :ssr="false"
    />
  </div>
</template>

<style>
.docs-repl {
  display: contents;
}

.file-selector {
  @apply scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-green-500 scrollbar-track-black;
}

.vue-repl {
  @apply border-1 border-solid dark:border-gray-200/10 border-gray-200;
  height: calc(100vh - var(--vp-nav-height) - 0.5rem);
}
</style>
