import type { Plugin, VueFlowStore } from '@vue-flow/core'
import { toJpeg as ElToJpg, toPng as ElToPng } from 'html-to-image'
import { ref } from 'vue'
import type { Options as HTMLToImageOptions } from 'html-to-image/es/types'
import { useVueFlow } from '@vue-flow/core'
import type { CaptureScreenshot, UseScreenshot, UseScreenshotPluginOptions } from './types'
import { ImageType } from './types'

const createScreenshotState = (store: VueFlowStore, pluginOptions: UseScreenshotPluginOptions = {}): UseScreenshot => {
  const dataUrl = ref<string>('')
  const imgType = ref<ImageType>(ImageType.PNG)
  const error = ref()

  const capture: CaptureScreenshot = async (el = null, options = {}) => {
    let data

    const fileName = options.fileName ?? pluginOptions.defaultFileName ?? 'vue-flow-screenshot'

    switch (options.type ?? pluginOptions.defaultImageType) {
      case ImageType.JPEG:
        data = await toJpeg(el, options)
        break
      case ImageType.PNG:
        data = await toPng(el, options)
        break
      default:
        data = await toPng(el, options)
        break
    }

    // immediately download the image if shouldDownload is true
    if (options.shouldDownload && fileName !== '') {
      download(fileName)
    }

    return data
  }

  return {
    capture,
    download,
    dataUrl,
    error,
  }

  function toJpeg(el?: HTMLElement | null, options: HTMLToImageOptions = { quality: 0.95 }) {
    error.value = null

    return ElToJpg(el ?? <HTMLElement>store.vueFlowRef.value, options)
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

  function toPng(el?: HTMLElement | null, options: HTMLToImageOptions = { quality: 0.95 }) {
    error.value = null

    return ElToPng(el ?? <HTMLElement>store.vueFlowRef.value, options)
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
}

export const PluginScreenshot =
  (options?: UseScreenshotPluginOptions): Plugin =>
  (hooks) => {
    hooks.created(([store, extend]) =>
      extend({
        screenshot: createScreenshotState(store, options),
      }),
    )
  }

export function useScreenshot() {
  return useVueFlow().screenshot
}
