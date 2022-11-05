import type { Plugin, VueFlowStore } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import { toJpeg as ElToJpg, toPng as ElToPng } from 'html-to-image'
import { ref } from 'vue'
import type { Options as HTMLToImageOptions } from 'html-to-image/es/types'
import type { UseScreenshot, UseScreenshotOptions } from './types'
import { ImageType } from './types'

const createScreenshotState = (store: VueFlowStore, useScreenshotOptions: UseScreenshotOptions = {}): UseScreenshot => {
  const dataUrl = ref<string>('')
  const imgType = ref<ImageType>(ImageType.PNG)
  const error = ref()

  const screenshot: UseScreenshot['screenshot'] = async (
    type = useScreenshotOptions.defaultImageType || ImageType.PNG,
    fileName = useScreenshotOptions.defaultFileName || 'vue-flow-screenshot',
    options = useScreenshotOptions.defaultOptions,
  ) => {
    let data

    switch (type) {
      case ImageType.JPEG:
        data = await toJpeg(options as HTMLToImageOptions)
        break
      case ImageType.PNG:
        data = await toPng(options as HTMLToImageOptions)
        break
      default:
        data = await toJpeg(options as HTMLToImageOptions)
        break
    }

    // immediately download the image if shouldDownload is true
    if (!!fileName && fileName !== '') download(fileName)

    return data
  }

  function toJpeg(options: HTMLToImageOptions = { quality: 0.95 }) {
    error.value = null

    return ElToJpg(<HTMLElement>store.vueFlowRef.value, options)
      .then((data) => {
        dataUrl.value = data
        imgType.value = ImageType.JPEG
        return data
      })
      .catch((error) => {
        error.value = error
        throw new Error(error)
      })
  }

  function toPng(options: HTMLToImageOptions = { quality: 0.95 }) {
    error.value = null

    return ElToPng(<HTMLElement>store.vueFlowRef.value, options)
      .then((data) => {
        dataUrl.value = data
        imgType.value = ImageType.PNG
        return data
      })
      .catch((error) => {
        error.value = error
        throw new Error(error)
      })
  }

  function download(fileName: string) {
    const link = document.createElement('a')
    link.download = `${fileName}.${imgType.value}`
    link.href = dataUrl.value
    link.click()
  }

  return {
    screenshot,
    download,
    dataUrl,
    error,
  }
}

export const PluginScreenshot =
  (options?: UseScreenshotOptions): Plugin =>
  (hooks) => {
    hooks.created((store) => {
      store.screenshot = createScreenshotState(store, options)
    })
  }

export function useScreenshot() {
  return useVueFlow().screenshot
}
