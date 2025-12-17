let VueFlowInstanceId = 0
export function newVueFlowInstanceID(): number {
  return VueFlowInstanceId++
}
