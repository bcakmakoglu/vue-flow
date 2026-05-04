import { ResizeControlVariant } from './types'

export const DefaultPositions = {
  [ResizeControlVariant.Line]: 'right',
  [ResizeControlVariant.Handle]: 'bottom-right',
}

export const StylingProperty = {
  [ResizeControlVariant.Line]: 'borderColor',
  [ResizeControlVariant.Handle]: 'backgroundColor',
}
