<script lang="ts" setup>
import { Panel, useVueFlow } from '@vue-flow/core'
import type { PanelPosition } from '@vue-flow/core'
import type { ControlProps } from './types'
import ControlButton from './ControlButton.vue'
import PlusIcon from './icons/plus.svg'
import MinusIcon from './icons/minus.svg'
import FitView from './icons/fitview.svg'
import Lock from './icons/lock.svg'
import Unlock from './icons/unlock.svg'

const {
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  fitViewParams,
  position = 'bottom-left' as PanelPosition,
} = defineProps<ControlProps>()

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
  <Panel class="vue-flow__controls" :position="position">
    <slot name="top"></slot>
    <template v-if="showZoom">
      <slot name="control-zoom-in">
        <ControlButton class="vue-flow__controls-zoomin" @click="onZoomInHandler">
          <slot name="icon-zoom-in">
            <component :is="PlusIcon" />
          </slot>
        </ControlButton>
      </slot>
      <slot name="control-zoom-out">
        <ControlButton class="vue-flow__controls-zoomout" @click="onZoomOutHandler">
          <slot name="icon-zoom-out">
            <component :is="MinusIcon" />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <template v-if="showFitView">
      <slot name="control-fit-view">
        <ControlButton class="vue-flow__controls-fitview" @click="onFitViewHandler">
          <slot name="icon-fit-view">
            <component :is="FitView" />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <template v-if="showInteractive">
      <slot name="control-interactive">
        <ControlButton v-if="showInteractive" class="vue-flow__controls-interactive" @click="onInteractiveChangeHandler">
          <slot v-if="isInteractive" name="icon-unlock">
            <component :is="Unlock" />
          </slot>
          <slot v-if="!isInteractive" name="icon-lock">
            <component :is="Lock" />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <slot></slot>
  </Panel>
</template>
