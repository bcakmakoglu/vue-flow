<script>
export default {
  layout: 'docs',
}
</script>
<template>
  <div class="p-4 bg-yellow-200 rounded-xl mb-4">
    <p class="italic font-bold">
      Vue Flow is not ready for production use yet. If you want to contribute getting the library ready, feel free to do so!
      Improvements need to be made on perfomance, documentation and testing.
    </p>
  </div>

  <h1>Introduction</h1>
  <p>
    Vue Flow, just like React Flow, is a library for building node-based applications. These can be simple static diagrams or
    complex node-based editors. You can implement custom node types and edge types and it comes with components like a mini-map
    and graph controls. Feel free to check out the <router-link to="/examples">examples</router-link>.
  </p>

  <h1>Key Features</h1>
  <ul>
    <li>
      <span class="font-semibold">👶 Easy to use</span>: Seamless zooming & panning behaviour and single and multi-selections of
      elements
    </li>
    <li>
      <span class="font-semibold">🎨 Customizable</span>: Different <router-link to="/docs/api/node-types">node</router-link> and
      <router-link to="/docs/api/edge-types">edge types</router-link> and support for custom nodes with multiple handles and
      custom edges
    </li>
    <li>
      <span class="font-semibold">(🚧 Kinda, it's a work in progress) Fast rendering</span>: Only nodes that have changed are
      re-rendered and only those that are in the viewport are displayed (optionally)
    </li>
    <li>
      <span class="font-semibold">🧲 Utils</span>: Snap-to-grid and graph
      <router-link to="/docs/api/helper-functions">helper functions</router-link>
    </li>
    <li>
      <span class="font-semibold">📦 Components</span>: <router-link to="/docs/api/background">Background</router-link>,
      <router-link to="/docs/api/minimap">Minimap</router-link> and <router-link to="/docs/api/controls">Controls</router-link>
    </li>
    <li>
      <span class="font-semibold">🦾 Reliable</span>: Written in <a href="https://www.typescriptlang.org/">TypeScript</a>(🚧 and
      not yet tested with <a href="https://cypress.io">Cypress</a>)
    </li>
  </ul>
</template>
