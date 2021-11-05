export default (): Window & typeof globalThis & { chrome?: any } => {
  if (typeof window !== 'undefined') return window
  else return {} as any
}
