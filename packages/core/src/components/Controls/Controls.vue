<script lang="ts" setup>
import { toRef } from 'vue'
import { useVueFlow } from '../../composables'
import Panel from '../Panel/Panel.vue'
import type { ControlEmits, ControlProps } from './types'
import ControlButton from './ControlButton.vue'
import PlusIcon from './icons/plus.svg'
import MinusIcon from './icons/minus.svg'
import FitView from './icons/fitview.svg'
import Lock from './icons/lock.svg'
import Unlock from './icons/unlock.svg'

const props = withDefaults(defineProps<ControlProps>(), {
  showZoom: true,
  showFitView: true,
  showInteractive: true,
  position: 'bottom-left',
})

const emit = defineEmits<ControlEmits>()

const {
  nodesDraggable,
  nodesConnectable,
  elementsSelectable,
  setInteractive,
  zoomIn,
  zoomOut,
  fitView,
  viewport,
  minZoom,
  maxZoom,
} = useVueFlow()

const isInteractive = toRef(() => nodesDraggable.value || nodesConnectable.value || elementsSelectable.value)

const minZoomReached = toRef(() => viewport.value.zoom <= minZoom.value)

const maxZoomReached = toRef(() => viewport.value.zoom >= maxZoom.value)

function onZoomInHandler() {
  zoomIn()

  emit('zoomIn')
}

function onZoomOutHandler() {
  zoomOut()

  emit('zoomOut')
}

function onFitViewHandler() {
  fitView(props.fitViewParams)

  emit('fitView')
}

function onInteractiveChangeHandler() {
  setInteractive(!isInteractive.value)

  emit('interactionChange', !isInteractive.value)
}
</script>

<script lang="ts">
export default {
  name: 'Controls',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <Panel class="vue-flow__controls" :position="position">
    <slot name="top" />

    <template v-if="showZoom">
      <slot name="control-zoom-in">
        <ControlButton class="vue-flow__controls-zoomin" :disabled="maxZoomReached" @click="onZoomInHandler">
          <slot name="icon-zoom-in">
            <component :is="PlusIcon" />
          </slot>
        </ControlButton>
      </slot>

      <slot name="control-zoom-out">
        <ControlButton class="vue-flow__controls-zoomout" :disabled="minZoomReached" @click="onZoomOutHandler">
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

    <slot />
  </Panel>
</template>
