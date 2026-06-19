<script setup>
import { useVueFlow, VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import DropzoneBackground from './DropzoneBackground.vue';
import Sidebar from './Sidebar.vue';
import useDragAndDrop from './useDnD';

const { onConnect, addEdges } = useVueFlow();

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();

const nodes = ref([]);

onConnect(addEdges);
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">
          Drop here
        </p>
      </DropzoneBackground>
    </VueFlow>

    <Sidebar />
  </div>
</template>
