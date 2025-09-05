// We are using vite-svg-loader which imports SVGs as Vue components instead of strings
// so we need to overwrite the default Vite declaration for SVGs here.
declare module '*.svg' {
  import type { Component } from 'vue'

  const component: Component
  export default component
}
