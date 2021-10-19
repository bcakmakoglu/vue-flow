<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import PlusIcon from '../../../assets/icons/plus.svg'
import MinusIcon from '../../../assets/icons/minus.svg'
import Fitview from '../../../assets/icons/fitview.svg'
import Lock from '../../../assets/icons/lock.svg'
import Unlock from '../../../assets/icons/unlock.svg'
import ControlButton from './ControlButton.vue'
import { FitViewParams, RevueFlowStore, ZoomPanHelperFunctions } from '~/types'
import useZoomPanHelper from '~/hooks/useZoomPanHelper'

export interface ControlProps extends HTMLAttributes {
  showZoom?: boolean
  showFitView?: boolean
  showInteractive?: boolean
  fitViewParams?: FitViewParams
  onZoomIn?: () => void
  onZoomOut?: () => void
  onFitView?: () => void
  onInteractiveChange?: (interactiveStatus: boolean) => void
}

const props = withDefaults(defineProps<ControlProps>(), {
  showZoom: true,
  showFitView: true,
  showInteractive: true,
})

const store = inject<RevueFlowStore>('store')!
// const { onReady } = useZoomPanHelper()

const isInteractive = store.nodesDraggable && store.nodesConnectable && store.elementsSelectable
const mapClasses = ['revue-flow__controls']

/*
* const onZoomInHandler = () => {
  zoomHelper.value?.zoomIn?.()
  props.onZoomIn?.()
}

const onZoomOutHandler = () => {
  zoomHelper.value?.zoomOut?.()
  props.onZoomOut?.()
}

const onFitViewHandler = () => {
  zoomHelper.value?.fitView?.(props.fitViewParams)
  props.onFitView?.()
}

const onInteractiveChangeHandler = () => {
  store.setInteractive?.(!isInteractive)
  props.onInteractiveChange?.(!isInteractive)
}
*/
</script>
<template>
  <div :class="mapClasses">
    <template v-if="props.showZoom">
      <ControlButton on-click="onZoomInHandler" class="revue-flow__controls-zoomin">
        <PlusIcon />
      </ControlButton>
      <ControlButton on-click="onZoomOutHandler" class="revue-flow__controls-zoomout">
        <MinusIcon />
      </ControlButton>
    </template>
    <ControlButton v-if="props.showFitView" class="revue-flow__controls-fitview" on-click="onFitViewHandler">
      <Fitview />
    </ControlButton>
    <ControlButton v-if="props.showInteractive" class="revue-flow__controls-interactive" on-click="onInteractiveChangeHandler">
      <Unlock v-if="isInteractive" />
      <Lock v-else />
    </ControlButton>
    <slot></slot>
  </div>
</template>
