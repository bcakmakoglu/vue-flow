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
  {
    path: '/layouting',
    label: 'Layouting',
  },
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
    <div class="flex flex-col justify-center items-start">
      <router-link v-for="(example, i) of examples" :key="`example-link-${i}`" class="example-link" :to="example.path">
        {{ example.label }}
      </router-link>
    </div>
    <slot></slot>
  </aside>
</template>
<style>
.example-link {
  @apply text-lg text-white hover:text-black py-2 underline;
}
aside {
  border-right: 1px solid #eee;
  padding: 15px 10px;
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 280px; /* Set the width of the sidebar */
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>
