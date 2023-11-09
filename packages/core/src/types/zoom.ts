import type { FitViewOptionsBase } from '@xyflow/system'

export interface FitViewParams extends Omit<FitViewOptionsBase<any>, 'nodes' | 'nodeOrigin'> {
  nodes?: string[]
  offset?: {
    x?: number
    y?: number
  }
}
