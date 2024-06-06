import { toJpeg as ElToJpg, toPng as ElToPng } from 'html-to-image'
import { ref } from 'vue'

export function useScreenshot() {
  const dataUrl = ref('')
  const imgType = ref('png')
  const error = ref()

  async function capture(el, options = {}) {
    let data

    const fileName = options.fileName ?? `vue-flow}`

    switch (options.type) {
      case 'jpeg':
        data = await toJpeg(el, options)
        break
      case 'png':
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

  function toJpeg(el, options = { quality: 0.95 }) {
    error.value = null

    return ElToJpg(el, options)
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

  function toPng(el, options = { quality: 0.95 }) {
    error.value = null

    return ElToPng(el, options)
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

  function download(fileName) {
    const link = document.createElement('a')
    link.setAttribute('download', `${fileName}.${imgType.value}`)
    link.setAttribute('href', dataUrl.value)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    capture,
    download,
    dataUrl,
    error,
  }
}
