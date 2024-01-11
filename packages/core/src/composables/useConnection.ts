import type { VueFlowStore } from '../types'
import { useVueFlow } from './useVueFlow'

export interface UseConnectionReturn {
  startHandle: VueFlowStore['connectionStartHandle']
  endHandle: VueFlowStore['connectionEndHandle']
  status: VueFlowStore['connectionStatus']
  position: VueFlowStore['connectionPosition']
}

/**
 * Hook for accessing the ongoing connection.
 *
 * @returns ongoing connection: startHandle, endHandle, status, position
 */
export function useConnection(): {
  startHandle: VueFlowStore['connectionStartHandle']
  endHandle: VueFlowStore['connectionEndHandle']
  status: VueFlowStore['connectionStatus']
  position: VueFlowStore['connectionPosition'] | null
} {
  const {
    connectionStartHandle: startHandle,
    connectionEndHandle: endHandle,
    connectionStatus: status,
    connectionPosition: position,
  } = useVueFlow()

  return {
    startHandle,
    endHandle,
    status,
    position,
  }
}
