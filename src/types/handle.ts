import { Dimensions, ElementId, Position, XYPosition } from './types'
import { Connection, OnConnectFunc } from './connection'

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null
  position: Position
}

export interface HandleProps {
  type: HandleType
  position: Position
  isConnectable?: boolean
  onConnect?: OnConnectFunc
  isValidConnection?: (connection: Connection) => boolean
  id?: ElementId
}
