export function round(x: number, multiple = 10) {
  return Math.round(x / multiple) * multiple
}

export function roundDown(x: number, multiple = 10) {
  return Math.floor(x / multiple) * multiple
}

export function roundUp(x: number, multiple = 10) {
  return Math.ceil(x / multiple) * multiple
}
