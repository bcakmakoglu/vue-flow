<script lang="ts" setup>
import { CSSProperties } from 'vue'

interface MiniMapNodeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  borderRadius?: number
  color?: string
  shapeRendering?: 'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision' | 'inherit'
  strokeColor?: string
  strokeWidth?: number
}
const props = withDefaults(defineProps<MiniMapNodeProps>(), {
  shapeRendering: 'geometricPrecision',
})
const attrs = useAttrs()

const styles = (attrs.style ?? {}) as CSSProperties
const fill = computed(() => props.color || styles.background || styles.backgroundColor)
</script>
<template>
  <rect
    class="vue-flow__minimap-node"
    :x="props.x"
    :y="props.y"
    :rx="props.borderRadius"
    :ry="props.borderRadius"
    :width="props.width"
    :height="props.height"
    :fill="fill"
    :stroke="props.strokeColor"
    :stroke-width="props.strokeWidth"
    :shape-rendering="props.shapeRendering"
  />
</template>
