import type { Options as HTMLToImageOptions } from 'html-to-image/es/types'
import type { Ref } from 'vue'

export enum ImageType {
  JPEG = 'jpeg',
  PNG = 'png',
}

export interface UseScreenshotPluginOptions {
  defaultFileName?: string
  defaultImageType?: ImageType
  defaultOptions?: HTMLToImageOptions
}

export interface UseScreenshotOptions extends HTMLToImageOptions {
  type?: ImageType
  fileName?: string
  shouldDownload?: boolean
  fetchRequestInit?: RequestInit
}

export type CaptureScreenshot = (el?: HTMLElement | null, options?: UseScreenshotOptions) => Promise<string>

export type Download = (fileName: string) => void

export interface UseScreenshot {
  // returns the data url of the screenshot
  capture: CaptureScreenshot
  download: Download
  dataUrl: Ref<string>
  error: Ref
}
