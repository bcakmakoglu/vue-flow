<script lang="ts" setup>
import { Panel, useVueFlow } from '@vue-flow/core'
import type { Component } from 'vue'
import { computed, toRef } from 'vue'
import type { ControlItemSlotProps, ControlProps, ControlsSlotProps } from './types'
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
  position = 'bottom-left',
} = defineProps<ControlProps>()

const emit = defineEmits<{
  (event: 'zoomIn'): void
  (event: 'zoomOut'): void
  (event: 'fitView'): void
  (event: 'interactionChange', active: boolean): void
}>()

defineSlots<{
  default(props: ControlsSlotProps): any
  top(props: ControlsSlotProps): any
  'control-item'(props: ControlItemSlotProps): any
  'control-zoom-in'(props: { disabled: boolean; zoomIn: () => any; icon: Component }): any
  'control-zoom-out'(props: { disabled: boolean; zoomOut: () => any; icon: Component }): any
  'control-fit-view'(props: { fitView: () => any; icon: Component }): any
  'control-interactive'(props: {
    interactive: boolean
    toggleInteractive: () => any
    icon: Component
    lockIcon: Component
    unlockIcon: Component
  }): any
  'icon-zoom-in'(props: {}): any
  'icon-zoom-out'(props: {}): any
  'icon-fit-view'(props: {}): any
  'icon-lock'(props: {}): any
  'icon-unlock'(props: {}): any
}>()

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
  fitView(fitViewParams)

  emit('fitView')
}

function onInteractiveChangeHandler() {
  setInteractive(!isInteractive.value)

  emit('interactionChange', !isInteractive.value)
}

const slotProps = computed(
  () =>
    ({
      zoomInDisabled: maxZoomReached.value,
      zoomIn: onZoomInHandler,
      zoomInIcon: PlusIcon,
      zoomOutDisabled: minZoomReached.value,
      zoomOut: onZoomOutHandler,
      zoomOutIcon: MinusIcon,
      fitView: onFitViewHandler,
      fitViewIcon: FitView,
      interactive: isInteractive.value,
      toggleInteractive: onInteractiveChangeHandler,
      interactiveIcon: isInteractive.value ? Unlock : Lock,
      lockIcon: Lock,
      unlockIcon: Unlock,
    } satisfies ControlsSlotProps),
)
</script>

<script lang="ts">
export default {
  name: 'Controls',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <Panel class="vue-flow__controls" :position="position">
    <slot name="top" v-bind="slotProps" />

    <template v-if="showZoom">
      <slot name="control-zoom-in" :disabled="maxZoomReached" :zoom-in="onZoomInHandler" :icon="PlusIcon">
        <slot name="control-item" control="zoom-in" :disabled="maxZoomReached" :on-click="onZoomInHandler" :icon="PlusIcon">
          <ControlButton class="vue-flow__controls-zoomin" :disabled="maxZoomReached" @click="onZoomInHandler">
            <slot name="icon-zoom-in">
              <component :is="PlusIcon" />
            </slot>
          </ControlButton>
        </slot>
      </slot>

      <slot name="control-zoom-out" :disabled="minZoomReached" :zoom-out="onZoomOutHandler" :icon="MinusIcon">
        <slot name="control-item" control="zoom-out" :disabled="minZoomReached" :on-click="onZoomOutHandler" :icon="MinusIcon">
          <ControlButton class="vue-flow__controls-zoomout" :disabled="minZoomReached" @click="onZoomOutHandler">
            <slot name="icon-zoom-out">
              <component :is="MinusIcon" />
            </slot>
          </ControlButton>
        </slot>
      </slot>
    </template>

    <template v-if="showFitView">
      <slot name="control-fit-view" :fit-view="onFitViewHandler" :icon="FitView">
        <slot name="control-item" control="fit-view" :on-click="onFitViewHandler" :icon="FitView">
          <ControlButton class="vue-flow__controls-fitview" @click="onFitViewHandler">
            <slot name="icon-fit-view">
              <component :is="FitView" />
            </slot>
          </ControlButton>
        </slot>
      </slot>
    </template>

    <template v-if="showInteractive">
      <slot
        name="control-interactive"
        :interactive="isInteractive"
        :toggle-interactive="onInteractiveChangeHandler"
        :icon="isInteractive ? Unlock : Lock"
        :lock-icon="Lock"
        :unlock-icon="Unlock"
      >
        <slot
          name="control-item"
          control="interactive"
          :on-click="onInteractiveChangeHandler"
          :icon="isInteractive ? Unlock : Lock"
        >
          <ControlButton v-if="showInteractive" class="vue-flow__controls-interactive" @click="onInteractiveChangeHandler">
            <slot v-if="isInteractive" name="icon-unlock">
              <component :is="Unlock" />
            </slot>
            <slot v-if="!isInteractive" name="icon-lock">
              <component :is="Lock" />
            </slot>
          </ControlButton>
        </slot>
      </slot>
    </template>

    <slot v-bind="slotProps" />
  </Panel>
</template>
