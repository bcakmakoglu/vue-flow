<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'

interface MiniMapNodeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  borderRadius?: number
  color?: string
  shapeRendering?: string
  strokeColor?: string
  strokeWidth?: number
}
const props = defineProps<MiniMapNodeProps>()
const attrs = useAttrs()

const styles = (attrs.style ?? {}) as CSSProperties
const fill = computed(() => (props.color || styles.background || styles.backgroundColor) as string)
</script>
<template>
  <rect
    class="revue-flow__minimap-node"
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
