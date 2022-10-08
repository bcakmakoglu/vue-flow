<script lang="ts" setup>
import { useVueFlow } from '@vue-flow/core'
import type { ControlProps } from './types'
import ControlButton from './ControlButton.vue'
import PlusIcon from './icons/plus.svg'
import MinusIcon from './icons/minus.svg'
import FitView from './icons/fitview.svg'
import Lock from './icons/lock.svg'
import Unlock from './icons/unlock.svg'

const { showZoom = true, showFitView = true, showInteractive = true, fitViewParams } = defineProps<ControlProps>()

const emit = defineEmits<{
  (event: 'zoomIn'): void
  (event: 'zoomOut'): void
  (event: 'fitView'): void
  (event: 'interactionChange', active: boolean): void
}>()

const { nodesDraggable, nodesConnectable, elementsSelectable, setInteractive, zoomIn, zoomOut, fitView } = $(useVueFlow())

const isInteractive = computed(() => nodesDraggable && nodesConnectable && elementsSelectable)

const onZoomInHandler = () => {
  zoomIn()
  emit('zoomIn')
}

const onZoomOutHandler = () => {
  zoomOut()
  emit('zoomOut')
}

const onFitViewHandler = () => {
  fitView(fitViewParams)
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
    <template v-if="showFitView">
      <slot name="control-fit-view">
        <ControlButton class="vue-flow__controls-fitview" @click="onFitViewHandler">
          <slot name="icon-fit-view">
            <FitView />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <template v-if="showInteractive">
      <slot name="control-interactive">
        <ControlButton v-if="showInteractive" class="vue-flow__controls-interactive" @click="onInteractiveChangeHandler">
          <slot v-if="isInteractive" name="icon-unlock">
            <Unlock />
          </slot>
          <slot v-if="!isInteractive" name="icon-lock">
            <Lock />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <slot></slot>
  </div>
</template>
