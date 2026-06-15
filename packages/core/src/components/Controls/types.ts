import type { PanelPosition } from '@xyflow/system';
import type { FitViewParams } from '../../types';

export interface ControlProps {
  /**
   * Show the zoom control buttons (zoom-in and zoom-out)
   *
   * @default true
   */
  showZoom?: boolean;
  /**
   * Show the fit view control button
   *
   * @default true
   */
  showFitView?: boolean;
  /**
   * Show the interactivity toggle control button
   *
   * @default true
   */
  showInteractive?: boolean;
  /**
   * {@link FitViewParams Parameters} to use when the fit view control button is pressed
   *
   * @default undefined
   */
  fitViewParams?: FitViewParams;
  /**
   * The {@link PanelPosition position} of the `<Controls>` panel
   *
   * @default 'bottom-left'
   */
  position?: PanelPosition;
}

export interface ControlEmits {
  (event: 'zoomIn'): void;
  (event: 'zoomOut'): void;
  (event: 'fitView'): void;
  (event: 'interactionChange', isInteractive: boolean): void;
}
