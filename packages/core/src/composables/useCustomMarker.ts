// useCustomMarker.ts
import { ref } from 'vue';

const customMarkers = ref<Record<string, { path: string }>>({});

export function useCustomMarker() {
  function registerMarkerType(type: string, definition: { path: string }) {
    customMarkers.value[type] = definition;
  }

  function getMarkerDefinition(type: string) {
    return customMarkers.value[type];
  }

  return {
    registerMarkerType,
    getMarkerDefinition,
  };
}