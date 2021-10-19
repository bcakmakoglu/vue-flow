<script lang="ts" setup>
import { HTMLAttributes } from 'vue'
import ControlButton from './ControlButton.vue'
import PlusIcon from '@/assets/icons/plus.svg'
import MinusIcon from '@/assets/icons/minus.svg'
import Fitview from '@/assets/icons/fitview.svg'
import Lock from '@/assets/icons/lock.svg'
import Unlock from '@/assets/icons/unlock.svg'
import { FitViewParams } from '~/types'
import useZoomPanHelper from '~/composables/useZoomPanHelper'
import { Store } from '~/context'

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

const store = inject(Store)!
const { zoomIn, zoomOut, fitView } = useZoomPanHelper()

const isInteractive = store.nodesDraggable && store.nodesConnectable && store.elementsSelectable
const mapClasses = ['revue-flow__controls']

const onZoomInHandler = () => {
  zoomIn?.()
  props.onZoomIn?.()
}

const onZoomOutHandler = () => {
  zoomOut?.()
  props.onZoomOut?.()
}

const onFitViewHandler = () => {
  fitView?.(props.fitViewParams)
  props.onFitView?.()
}

const onInteractiveChangeHandler = () => {
  store.setInteractive?.(!isInteractive)
  props.onInteractiveChange?.(!isInteractive)
}
</script>
<template>
  <div :class="mapClasses">
    <template v-if="props.showZoom">
      <slot name="control-zoom-in">
        <ControlButton class="revue-flow__controls-zoomin" @click="onZoomInHandler">
          <slot name="icon-zoom-in">
            <PlusIcon />
          </slot>
        </ControlButton>
      </slot>
      <slot name="control-zoom-out">
        <ControlButton class="revue-flow__controls-zoomout" @click="onZoomOutHandler">
          <slot name="icon-zoom-out">
            <MinusIcon />
          </slot>
        </ControlButton>
      </slot>
    </template>
    <slot name="control-fitview">
      <ControlButton v-if="props.showFitView" class="revue-flow__controls-fitview" @click="onFitViewHandler">
        <slot name="icon-fitview">
          <Fitview />
        </slot>
      </ControlButton>
    </slot>
    <slot name="control-interactive">
      <ControlButton v-if="props.showInteractive" class="revue-flow__controls-interactive" @click="onInteractiveChangeHandler">
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
