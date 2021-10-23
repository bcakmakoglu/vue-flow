import { ssrWindow } from 'ssr-window'

export default (): Window & typeof globalThis & { chrome?: any } => {
  if (typeof window !== 'undefined') return window
  else return ssrWindow as any
}
