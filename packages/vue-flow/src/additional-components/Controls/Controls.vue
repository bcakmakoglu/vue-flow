<script lang="ts" setup>
import { useVueFlow } from '../../composables'
import type { ControlProps } from '../../types/components'
import ControlButton from './ControlButton.vue'
import PlusIcon from '~/assets/icons/plus.svg'
import MinusIcon from '~/assets/icons/minus.svg'
import FitView from '~/assets/icons/fitview.svg'
import Lock from '~/assets/icons/lock.svg'
import Unlock from '~/assets/icons/unlock.svg'

const { showZoom = true, showFitView = true, showInteractive = true, fitViewParams } = defineProps<ControlProps>()

const emit = defineEmits<{
  (event: 'zoomIn'): void
  (event: 'zoomOut'): void
  (event: 'fitView'): void
  (event: 'interactionChange', active: boolean): void
}>()

const { instance, nodesDraggable, nodesConnectable, elementsSelectable, setInteractive } = $(useVueFlow())

const isInteractive = computed(() => nodesDraggable && nodesConnectable && elementsSelectable)

const onZoomInHandler = () => {
  instance?.zoomIn()
  emit('zoomIn')
}

const onZoomOutHandler = () => {
  instance?.zoomOut()
  emit('zoomOut')
}

const onFitViewHandler = () => {
  instance?.fitView(fitViewParams)
  emit('fitView')
}

const onInteractiveChangeHandler = () => {
  setInteractive(!isInteractive.value)
  emit('interactionChange', !isInteractive.value)
}
</script>

<script lang="ts">
export default {
  name: 'Controls',
}
</script>

<template>
  <div class="vue-flow__controls">
    <slot name="top"></slot>
    <template v-if="showZoom">
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
      <ControlButton v-if="showFitView" class="vue-flow__controls-fitview" @click="onFitViewHandler">
        <slot name="icon-fitview">
          <FitView />
        </slot>
      </ControlButton>
    </slot>
    <slot name="control-interactive">
      <ControlButton v-if="showInteractive" class="vue-flow__controls-interactive" @click="onInteractiveChangeHandler">
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
