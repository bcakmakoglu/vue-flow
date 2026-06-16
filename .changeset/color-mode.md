---
"@vue-flow/core": minor
---

Add a `colorMode` prop (`'light' | 'dark' | 'system'`, default `'light'`) matching `xyflow/react` + `xyflow/svelte`. The resolved mode is applied as a `light`/`dark` class on the `.vue-flow` container; `'system'` follows the OS `prefers-color-scheme` and reacts to changes at runtime.

The default theme ships a dark palette out of the box: built-in nodes, edges, handles, `Controls`, and `MiniMap` adapt automatically (light values on `.vue-flow`, dark overrides under `.vue-flow.dark`), and the container paints a dark background in dark mode. Existing light-mode appearance is unchanged. (The theme is driven by the `--xy-*` CSS variables — see the separate CSS-alignment changeset.)
