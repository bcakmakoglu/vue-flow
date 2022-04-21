<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import type { ControlProps } from '../../types/components'
import ControlButton from './ControlButton.vue'
import PlusIcon from '~/assets/icons/plus.svg'
import MinusIcon from '~/assets/icons/minus.svg'
import Fitview from '~/assets/icons/fitview.svg'
import Lock from '~/assets/icons/lock.svg'
import Unlock from '~/assets/icons/unlock.svg'

const props = withDefaults(defineProps<ControlProps>(), {
  showZoom: true,
  showFitView: true,
  showInteractive: true,
})
const emit = defineEmits<{
  (event: 'zoom-in'): void
  (event: 'zoom-out'): void
  (event: 'fit-view'): void
  (event: 'interaction-change', active: boolean): void
}>()

const { store, instance } = useVueFlow()

const isInteractive = computed(() => store.nodesDraggable && store.nodesConnectable && store.elementsSelectable)

const onZoomInHandler = () => {
  instance.value?.zoomIn()
  emit('zoom-in')
}

const onZoomOutHandler = () => {
  instance.value?.zoomOut()
  emit('zoom-out')
}

const onFitViewHandler = () => {
  instance.value?.fitView(props.fitViewParams)
  emit('fit-view')
}

const onInteractiveChangeHandler = () => {
  store.setInteractive(!isInteractive.value)
  emit('interaction-change', !isInteractive.value)
}
</script>
<script lang="ts">
export default {
  name: 'Controls',
}
</script>
<template>
  <div class="vue-flow__controls">
    <template v-if="props.showZoom">
      <slot name="control-zoom-in">
        <ControlButton class="vue-flow__controls-zoomin" @click="onZoomInHandler">
          <slot name="icon-zoom-in">
            <PlusIcon />
          </slot>
        </ControlButton>
      </slot>
      <slot name="control-zoom-out">
        <ControlButton class="vue-flow__controls-zoomout" @click="onZoomOutHandler">
          <slot name="icon-zoom-out">
            <MinusIcon />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <slot name="control-fitview">
      <ControlButton v-if="props.showFitView" class="vue-flow__controls-fitview" @click="onFitViewHandler">
        <slot name="icon-fitview">
          <Fitview />
        </slot>
      </ControlButton>
    </slot>
    <slot name="control-interactive">
      <ControlButton v-if="props.showInteractive" class="vue-flow__controls-interactive" @click="onInteractiveChangeHandler">
        <slot name="icon-unlock">
          <Unlock v-if="isInteractive" />
        </slot>
        <slot name="icon-lock">
          <Lock v-if="!isInteractive" />
        </slot>
      </ControlButton>
    </slot>
    <slot></slot>
  </div>
</template>
