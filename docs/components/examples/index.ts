import BasicExample from './basic/Basic.vue?raw'
import BasicInitialElements from './basic/initial-elements.js?raw'
import BasicCss from './basic/style.css'

export const exampleImports = {
  basic: {
    'App.vue': BasicExample,
    'initial-elements.js': BasicInitialElements,
    'style.css': BasicCss,
  },
}
