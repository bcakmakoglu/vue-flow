import type { Ref } from 'vue'

export type ImageType = 'jpeg' | 'png'

export interface UseScreenshotState {
  // returns the data url of the screenshot
  screenshot: (type?: ImageType, fileName?: string) => Promise<string>
  download: (fileName: string) => void
  dataUrl: Ref<string>
  error: Ref
}
