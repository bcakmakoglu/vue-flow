/**
 * Composable for getting the visible node ids from the store.
 *
 * @internal
 * @param onlyRenderVisible
 * @returns array with visible node ids
 */
export function useVisibleNodeIds(onlyRenderVisible: boolean) {
  const nodeIds = useStore(useCallback(selector(onlyRenderVisible), [onlyRenderVisible]), shallow)

  return nodeIds
}
