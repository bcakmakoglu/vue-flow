import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import { highlight } from './highlight'

interface HoistedTags {
  script: string[]
  style: string[]
  components: string[]
}

type ExtendedMarkdownParsedData = { hoistedTags: HoistedTags }

let index = 1
// hoist <script> and <style> tags out of the returned html
// so that they can be placed outside as SFC blocks.
export const demoPlugin = (md: MarkdownIt): any => {
  const RE = /<demo /i

  md.renderer.rules.html_inline = (tokens: any, idx: any) => {
    const content = tokens[idx].content
    const data = (md as any).__data as ExtendedMarkdownParsedData
    const hoistedTags =
      data.hoistedTags ||
      (data.hoistedTags = {
        script: [],
        style: [],
        components: [],
      })

    if (RE.test(content.trim())) {
      const componentName = `demo${index++}`
      let language = (content.match(/language=("|')(.*)('|")/) || [])[2] ?? ''
      const src = (content.match(/src=("|')(\S+)('|")/) || [])[2] ?? ''

      const { realPath, urlPath, importMap } = md as any
      const absolutePath = path
        .resolve(realPath ?? urlPath, '../', src)
        .split(path.sep)
        .join('/')

      if (!src || !fs.existsSync(absolutePath)) {
        const warningMsg = `${absolutePath} does not exist!`
        console.warn(`[vitepress]: ${warningMsg}`)
        return `<demo src="${absolutePath}" >
        <p>${warningMsg}</p>`
      }
      if (!language) {
        language = (absolutePath.match(/\.(.+)$/) || [])[1] ?? 'vue'
      }

      const codeStr = fs.readFileSync(absolutePath).toString()
      const htmlStr = encodeURIComponent(highlight(codeStr, language))

      hoistedTags.script!.unshift(`import ${componentName} from '${absolutePath}' \n`)
      hoistedTags.components!.push(componentName)

      return content.replace(
        '>',
        ` componentName="${componentName}" htmlStr="${htmlStr}" codeStr="${encodeURIComponent(codeStr)}" ${
          importMap ? `importMap="${encodeURIComponent(JSON.stringify(importMap))}"` : ''
        } >
        <${componentName}></${componentName}>
        `,
      )
    } else {
      return content
    }
  }
}
