import type { Options as HTMLToImageOptions } from 'html-to-image/es/types'
import type { Ref } from 'vue'

export enum ImageType {
  JPEG = 'jpeg',
  PNG = 'png',
}

export interface UseScreenshotOptions {
  defaultFileName?: string
  defaultImageType?: ImageType
  defaultOptions?: HTMLToImageOptions
}

export type Screenshot = (type?: ImageType, fileName?: string, options?: HTMLToImageOptions) => Promise<string>

export type Download = (fileName: string) => void

export interface UseScreenshot {
  // returns the data url of the screenshot
  screenshot: Screenshot
  download: Download
  dataUrl: Ref<string>
  error: Ref
}
