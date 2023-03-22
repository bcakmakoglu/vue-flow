export enum ErrorCode {
  MISSING_VIEWPORT_DIMENSIONS = 'MISSING_VIEWPORT_DIMENSIONS',
  NODE_NOT_FOUND = 'NODE_NOT_FOUND',
  NODE_MISSING_PARENT = 'NODE_MISSING_PARENT',
  NODE_TYPE_MISSING = 'NODE_TYPE_MISSING',
  NODE_EXTENT_INVALID = 'NODE_EXTENT_INVALID',
  EDGE_INVALID = 'EDGE_INVALID',
  EDGE_NOT_FOUND = 'EDGE_NOT_FOUND',
  EDGE_SOURCE_MISSING = 'EDGE_SOURCE_MISSING',
  EDGE_TARGET_MISSING = 'EDGE_TARGET_MISSING',
  EDGE_TYPE_MISSING = 'EDGE_TYPE_MISSING',
  EDGE_SOURCE_TARGET_SAME = 'EDGE_SOURCE_TARGET_SAME',
  EDGE_SOURCE_TARGET_MISSING = 'EDGE_SOURCE_TARGET_MISSING',
  EDGE_ORPHANED = 'EDGE_ORPHANED',
}

const messages = {
  [ErrorCode.MISSING_VIEWPORT_DIMENSIONS]: () => 'The Vue Flow parent container needs a width and a height to render the graph',
  [ErrorCode.NODE_NOT_FOUND]: (id: string) => `Node not found\nNode: ${id}`,
  [ErrorCode.NODE_MISSING_PARENT]: (id: string, parentId: string) => `Node is missing a parent\nNode: ${id}\nParent: ${parentId}`,
  [ErrorCode.NODE_TYPE_MISSING]: (type: string) => `Node type is missing\nType: ${type}`,
  [ErrorCode.NODE_EXTENT_INVALID]: (id: string) => `Only child nodes can use a parent extent\nNode: ${id}`,
  [ErrorCode.EDGE_INVALID]: (id: string) => `An edge needs a source and a target\nEdge: ${id}`,
  [ErrorCode.EDGE_SOURCE_MISSING]: (id: string, source: string) => `Edge source is missing\nEdge: ${id} \nSource: ${source}`,
  [ErrorCode.EDGE_TARGET_MISSING]: (id: string, target: string) => `Edge target is missing\nEdge: ${id} \nTarget: ${target}`,
  [ErrorCode.EDGE_TYPE_MISSING]: (type: string) => `Edge type is missing\nType: ${type}`,
  [ErrorCode.EDGE_SOURCE_TARGET_SAME]: (id: string, source: string, target: string) =>
    `Edge source and target are the same\nEdge: ${id} \nSource: ${source} \nTarget: ${target}`,
  [ErrorCode.EDGE_SOURCE_TARGET_MISSING]: (id: string, source: string, target: string) =>
    `Edge source or target is missing\nEdge: ${id} \nSource: ${source} \nTarget: ${target}`,
  [ErrorCode.EDGE_ORPHANED]: (id: string) =>
    `Edge was orphaned (suddenly missing source or target) and has been removed\nEdge: ${id}`,
  [ErrorCode.EDGE_NOT_FOUND]: (id: string) => `Edge not found\nEdge: ${id}`,
} as const

export class VueFlowError<T extends ErrorCode = ErrorCode> extends Error {
  code: T
  constructor(
    code: T,
    ...args: (typeof messages)[T] extends (...args: any[]) => string ? Parameters<(typeof messages)[T]> : never
  ) {
    // @ts-expect-error - TS doesn't know that the message is a key of messages
    super(messages[code]?.(...args))

    this.code = code
  }
}
