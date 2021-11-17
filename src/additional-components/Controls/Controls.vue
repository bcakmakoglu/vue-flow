<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import { FitViewParams } from '../../types'
import { useZoomPanHelper, useStore } from '../../composables'
import ControlButton from './ControlButton.vue'
import PlusIcon from '~/assets/icons/plus.svg'
import MinusIcon from '~/assets/icons/minus.svg'
import Fitview from '~/assets/icons/fitview.svg'
import Lock from '~/assets/icons/lock.svg'
import Unlock from '~/assets/icons/unlock.svg'

export interface ControlProps extends HTMLAttributes {
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
  fitViewParams?: FitViewParams
}

const props = withDefaults(defineProps<ControlProps>(), {
  showZoom: true,
  showFitView: true,
  showInteractive: true,
})
// todo define types for events
const emit = defineEmits(['zoom-in', 'zoom-out', 'fit-view', 'interaction-change'])

const store = useStore()
const { zoomIn, zoomOut, fitView } = useZoomPanHelper()

const isInteractive = computed(() => store.nodesDraggable && store.nodesConnectable && store.elementsSelectable)
const mapClasses = ['vue-flow__controls']

const onZoomInHandler = () => {
  zoomIn?.()
  emit('zoom-in')
}

const onZoomOutHandler = () => {
  zoomOut?.()
  emit('zoom-out')
}

const onFitViewHandler = () => {
  fitView?.(props.fitViewParams)
  emit('fit-view')
}

const onInteractiveChangeHandler = () => {
  store.setInteractive?.(!isInteractive.value)
  emit('interaction-change', !isInteractive.value)
}
</script>
<template>
  <div :class="mapClasses">
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
