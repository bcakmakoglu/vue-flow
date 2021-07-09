import useZoomPanHelper from '../../hooks/useZoomPanHelper';
import { FitViewParams } from '../../types';
import { defineComponent, HTMLAttributes, onMounted, PropType, ref } from 'vue';
import store from '../../store';

export interface ControlProps extends HTMLAttributes {
  showZoom?: boolean;
  showFitView?: boolean;
  showInteractive?: boolean;
  fitViewParams?: FitViewParams;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitView?: () => void;
  onInteractiveChange?: (interactiveStatus: boolean) => void;
}

export type ControlButtonProps = HTMLButtonElement;

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
      <button class={['react-flow__controls-button']} onClick={props.onClick} disabled={props.disabled}>
        {slots.default ? slots.default() : ''}
      </button>
    );
  }
});

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
    const pinia = store();
    const isVisible = ref<boolean>(false);
    const { zoomIn, zoomOut, fitView } = useZoomPanHelper();

    const isInteractive = pinia.nodesDraggable && pinia.nodesConnectable && pinia.elementsSelectable;
    const mapClasses = ['react-flow__controls'];

    const onZoomInHandler = () => {
      zoomIn?.();
      props.onZoomIn?.();
    };

    const onZoomOutHandler = () => {
      zoomOut?.();
      props.onZoomOut?.();
    };

    const onFitViewHandler = () => {
      fitView?.(props.fitViewParams);
      props.onFitView?.();
    };

    const onInteractiveChangeHandler = () => {
      pinia.setInteractive?.(!isInteractive);
      props.onInteractiveChange?.(!isInteractive);
    };

    onMounted(() => {
      isVisible.value = true;
    });

    return () => (
      <div class={mapClasses}>
        {props.showZoom && (
          <>
            <ControlButton onClick={onZoomInHandler} class="react-flow__controls-zoomin">
              <img src={'../../../assets/icons/plus.svg'} alt="Plus" />
            </ControlButton>
            <ControlButton onClick={onZoomOutHandler} class="react-flow__controls-zoomout">
              <img src={'../../../assets/icons/minus.svg'} alt="Minus" />
            </ControlButton>
          </>
        )}
        {props.showFitView && (
          <ControlButton class="react-flow__controls-fitview" onClick={onFitViewHandler}>
            <img src={'../../../assets/icons/fitview.svg'} alt="FitView" />
          </ControlButton>
        )}
        {props.showInteractive && (
          <ControlButton class="react-flow__controls-interactive" onClick={onInteractiveChangeHandler}>
            {isInteractive ? (
              <img src={'../../../assets/icons/unlock.svg'} alt="Unlock" />
            ) : (
              <img src={'../../../assets/icons/lock.svg'} alt="Lock" />
            )}
          </ControlButton>
        )}
        {slots.default ? slots.default() : ''}
      </div>
    );
  }
});

export default Controls;
