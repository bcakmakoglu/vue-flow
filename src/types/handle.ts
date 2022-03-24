import { Dimensions, Position, XYPosition } from './flow'
import { Connection } from './connection'

export type HandleType = 'source' | 'target'

export interface HandleElement extends XYPosition, Dimensions {
  id?: string | null
  position: Position
}

export interface StartHandle {
  nodeId: string
  type: HandleType
  handleId?: string | null
}

/** A valid connection function can determine if an attempted connection is valid or not, i.e. abort creating a new edge */
export type ValidConnectionFunc = (connection: Connection) => boolean

export interface HandleProps {
  /** Unique id of handle element */
  id?: string
  /** Handle type (source / target) {@link HandleType} */
  type?: HandleType
  /** Handle position (top, bottom, left, right) {@link Position} */
  position?: Position
  /** A valid connection func {@link ValidConnectionFunc} */
  isValidConnection?: ValidConnectionFunc
  /** Enable/disable connecting to handle */
  connectable?: boolean
}
