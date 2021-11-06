<script lang="ts" setup>
const examples = [
  {
    path: '/',
    label: 'Overview',
  },
  {
    path: '/basic',
    label: 'Basic',
  },
  {
    path: '/custom-connectionline',
    label: 'Custom Connectionline',
  },
  {
    path: '/custom-node',
    label: 'Custom Node',
  },
  {
    path: '/drag-n-drop',
    label: 'Drag and Drop',
  },
  {
    path: '/edges',
    label: 'Edges',
  },
  {
    path: '/button-edge',
    label: 'Edge with Button',
  },
  {
    path: '/edge-types',
    label: 'Edge Types',
  },
  {
    path: '/empty',
    label: 'Empty',
  },
  {
    path: '/hidden',
    label: 'Hidden',
  },
  {
    path: '/interaction',
    label: 'Interaction',
  },
  /*
  todo: layouting example not working with dagre for some reason so it's disabled for now
  {
    path: '/layouting',
    label: 'Layouting',
  },
   */
  {
    path: '/multi-flows',
    label: 'Multi Flows',
  },
  {
    path: '/node-type-change',
    label: 'Node Type Change',
  },
  {
    path: '/node-types-id-change',
    label: 'Node Types ID Change',
  },
  {
    path: '/provider',
    label: 'Provider',
  },
  {
    path: '/save-restore',
    label: 'Save and Restore',
  },
  {
    path: '/stress',
    label: 'Stress',
  },
  {
    path: '/switch',
    label: 'Switch',
  },
  {
    path: '/unidirectional',
    label: 'Unidirectional',
  },
  {
    path: '/updatable-edge',
    label: 'Updatable Edge',
  },
  {
    path: '/update-node',
    label: 'Update Node',
  },
  {
    path: '/update-node-internals',
    label: 'Update Node Internals',
  },
  {
    path: '/validation',
    label: 'Validation',
  },
  {
    path: '/zoom-pan-helper',
    label: 'Zoom Pan Helper',
  },
]
</script>
<template>
  <aside>
    <div class="flex flex-col text-left items-start">
      <router-link v-for="(e, i) of examples" :key="`example-link-${i}`" class="example-link" :to="`/examples${e.path}`">
        {{ e.label }}
      </router-link>
    </div>
  </aside>
</template>
<style scoped>
.example-link {
  @apply w-full text-lg text-white hover:text-yellow-500 px-3 py-2 leading-tight;
}
.router-link-active {
  @apply rounded-lg bg-white font-semibold text-yellow-500 shadow-lg;
}
aside {
  @apply relative w-[280px] h-full px-[10px] py-[15px];
  background: rgba(0, 0, 0, 0.25) !important;
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>
