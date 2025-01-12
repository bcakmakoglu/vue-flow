import type { Node } from '@vue-flow/core'

export enum ProcessStatus {
  ERROR = 'error',
  SKIPPED = 'skipped',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  RUNNING = 'running',
}

export interface ProcessData {
  status: ProcessStatus | null
}

export type ProcessNode = Node<ProcessData, any, 'process'>
