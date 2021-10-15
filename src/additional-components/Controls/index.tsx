import { defineComponent, HTMLAttributes, inject, onMounted, PropType, ref } from 'vue'
import useZoomPanHelper from '../../hooks/useZoomPanHelper'
import { FitViewParams, RevueFlowStore, ZoomPanHelperFunctions } from '../../types'
import PlusIcon from '../../../assets/icons/plus.svg'
import MinusIcon from '../../../assets/icons/minus.svg'
import Fitview from '../../../assets/icons/fitview.svg'
import Lock from '../../../assets/icons/lock.svg'
import Unlock from '../../../assets/icons/unlock.svg'

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

export type ControlButtonProps = HTMLButtonElement

export const ControlButton = defineComponent({
  props: {
    disabled: {
      type: Boolean as PropType<ControlButtonProps['disabled']>,
      required: false,
      default: undefined
    },
    onClick: {
      type: Function as PropType<() => any>,
      required: false,
      default: undefined
    }
  },
  setup(props, { slots }) {
    return () => (
      <button class={['revue-flow__controls-button']} {...props}>
        {slots.default ? slots.default() : ''}
      </button>
    )
  }
})

const Controls = defineComponent({
  name: 'Controls',
  props: {
    showZoom: {
      type: Boolean as PropType<ControlProps['showZoom']>,
      required: false,
      default: true
    },
    showFitView: {
      type: Boolean as PropType<ControlProps['showFitView']>,
      required: false,
      default: true
    },
    showInteractive: {
      type: Boolean as PropType<ControlProps['showInteractive']>,
      required: false,
      default: true
    },
    fitViewParams: {
      type: Object as PropType<ControlProps['fitViewParams']>,
      required: false,
      default: undefined
    },
    onZoomIn: {
      type: Function() as PropType<ControlProps['onZoomIn']>,
      required: false,
      default: undefined
    },
    onZoomOut: {
      type: Function() as PropType<ControlProps['onZoomOut']>,
      required: false,
      default: undefined
    },
    onFitView: {
      type: Function() as PropType<ControlProps['onFitView']>,
      required: false,
      default: undefined
    },
    onInteractiveChange: {
      type: Function() as PropType<ControlProps['onInteractiveChange']>,
      required: false,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const store = inject<RevueFlowStore>('store')!
    const isVisible = ref<boolean>(false)
    const zoomHelper = ref<ZoomPanHelperFunctions>()
    const { onReady } = useZoomPanHelper()

    onReady((helper) => {
      zoomHelper.value = helper
    })

    const isInteractive = store.nodesDraggable && store.nodesConnectable && store.elementsSelectable
    const mapClasses = ['revue-flow__controls']

    const onZoomInHandler = () => {
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

    onMounted(() => {
      isVisible.value = true
    })

    return () => (
      <div class={mapClasses}>
        {props.showZoom && (
          <>
            <ControlButton onClick={onZoomInHandler} class="revue-flow__controls-zoomin">
              <PlusIcon />
            </ControlButton>
            <ControlButton onClick={onZoomOutHandler} class="revue-flow__controls-zoomout">
              <MinusIcon />
            </ControlButton>
          </>
        )}
        {props.showFitView && (
          <ControlButton class="revue-flow__controls-fitview" onClick={onFitViewHandler}>
            <Fitview />
          </ControlButton>
        )}
        {props.showInteractive && (
          <ControlButton class="revue-flow__controls-interactive" onClick={onInteractiveChangeHandler}>
            {isInteractive ? <Unlock /> : <Lock />}
          </ControlButton>
        )}
        {slots.default ? slots.default() : ''}
      </div>
    )
  }
})

export default Controls
