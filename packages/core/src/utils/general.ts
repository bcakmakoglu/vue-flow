export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}

export function isNumber(val: any): val is number {
  return typeof val === 'number'
}
