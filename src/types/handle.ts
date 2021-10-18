import { Dimensions, ElementId, Position, XYPosition } from './types'

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null
  position: Position
}
