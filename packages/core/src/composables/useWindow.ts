type UseWindow = Window & typeof globalThis & { chrome?: any }

/**
 * Returns the window object
 *
 * @internal
 */
export function useWindow(): UseWindow {
  if (typeof window !== 'undefined') {
    return window as UseWindow
  }

  return {
    chrome: false,
    addEventListener(..._: Parameters<Window['addEventListener']>) {
      // do nothing
    },
  } as UseWindow
}
