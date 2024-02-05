import { useVueFlow } from './useVueFlow'

/**
 * Composable for accessing the currently ongoing connection.
 *
 * @public
 * @returns current connection: startHandle, endHandle, status, position
 */
export function useConnection() {
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
