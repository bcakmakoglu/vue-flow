<script lang="ts" setup>
import { CSSProperties } from 'vue'
import type { MiniMapNodeProps } from '../../types/components'

const props = withDefaults(defineProps<MiniMapNodeProps>(), {
  shapeRendering: 'geometricPrecision',
})
const attrs = useAttrs()

const styles = (attrs.style ?? {}) as CSSProperties
const fill = computed(() => props.color || (styles.background as string) || styles.backgroundColor)
</script>
<script lang="ts">
export default {
  name: 'MiniMapNode',
}
</script>
<template>
  <rect
    class="vue-flow__minimap-node"
    :x="props.position.x"
    :y="props.position.y"
    :rx="props.borderRadius"
    :ry="props.borderRadius"
    :width="props.dimensions.width"
    :height="props.dimensions.height"
    :fill="fill"
    :stroke="props.strokeColor"
    :stroke-width="props.strokeWidth"
    :shape-rendering="props.shapeRendering"
  />
</template>
