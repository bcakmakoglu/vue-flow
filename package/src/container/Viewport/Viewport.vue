<script lang="ts" setup>
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'
import { useVueFlow } from '../../composables'
import SelectionPane from '../SelectionPane/SelectionPane.vue'
import Zoom from './Zoom.vue'
import Transform from './Transform.vue'

const { id, store } = useVueFlow()
const zoomPaneEl = templateRef<HTMLDivElement>('viewport', null)

const { width, height } = useElementBounding(zoomPaneEl)

useResizeObserver(zoomPaneEl, () => {
  store.dimensions.width = width.value
  store.dimensions.height = height.value
})

const d3Zoom = ref()
const d3Selection = ref()
const d3ZoomHandler = ref()
onMounted(() => {
  d3Zoom.value = zoom<HTMLDivElement, any>().scaleExtent([store.minZoom, store.maxZoom]).translateExtent(store.translateExtent)
  d3Selection.value = select(zoomPaneEl.value).call(d3Zoom.value)
  d3ZoomHandler.value = d3Selection.value.on('wheel.zoom')

  store.setState({
    d3Zoom: d3Zoom.value,
    d3Selection: d3Selection.value,
    d3ZoomHandler: d3ZoomHandler.value,
  })
})
</script>
<script lang="ts">
export default {
  name: 'Viewport',
}
</script>
<template>
  <div ref="viewport" class="vue-flow__viewport vue-flow__container">
    <Zoom
      v-if="d3Zoom && d3Selection && d3ZoomHandler"
      :d3-zoom="d3Zoom"
      :d3-selection="d3Selection"
      :d3-zoom-handler="d3ZoomHandler"
    >
      <Transform>
        <slot />
      </Transform>
    </Zoom>
    <SelectionPane :key="`selection-pane-${id}`" />
  </div>
</template>
