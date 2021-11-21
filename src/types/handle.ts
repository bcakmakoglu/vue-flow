import { Dimensions, ElementId, Position, XYPosition } from './flow'
import { Connection } from './connection'

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null
  position: Position
}

export type ValidConnectionFunc = (connection: Connection) => boolean
