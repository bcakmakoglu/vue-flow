type UseWindow = Window & typeof globalThis & { chrome?: any }

export function useWindow(): UseWindow {
  if (typeof window !== 'undefined') {
    return window as UseWindow
  } else {
    return { chrome: false } as UseWindow
  }
}
