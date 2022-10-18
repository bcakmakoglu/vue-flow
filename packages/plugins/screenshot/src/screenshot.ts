import type { Plugin, VueFlowStore } from '@vue-flow/core'
import { toJpeg as ElToJpg, toPng as ElToPng } from 'html-to-image'
import { useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import type { ImageType, UseScreenshotState } from './types'

const createScreenshotState = (store: VueFlowStore): UseScreenshotState => {
  const dataUrl = ref<string>('')
  const imgType = ref<string>('jpeg')
  const error = ref()

  async function screenshot(type: ImageType = 'jpeg', fileName = 'vue-flow-screenshot') {
    let data

    switch (type) {
      case 'jpeg':
        data = await toJpeg()
        break
      case 'png':
        data = await toPng()
        break
      default:
        data = await toJpeg()
        break
    }

    // immediately download the image if shouldDownload is true
    if (!!fileName && fileName !== '') download(fileName)

    return data
  }

  function toJpeg() {
    error.value = null

    return ElToJpg(<HTMLElement>store.vueFlowRef.value, { quality: 0.95 })
      .then((data) => {
        dataUrl.value = data
        imgType.value = 'jpeg'
        return data
      })
      .catch((error) => {
        error.value = error
        throw new Error(error)
      })
  }

  function toPng() {
    error.value = null

    return ElToPng(<HTMLElement>store.vueFlowRef.value, { quality: 0.95 })
      .then((data) => {
        dataUrl.value = data
        imgType.value = 'png'
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

export const PluginScreenshot: Plugin = (hooks) => {
  hooks.created((store) => {
    store.screenshot = createScreenshotState(store)
  })
}

export function useScreenshot() {
  return useVueFlow().screenshot
}
