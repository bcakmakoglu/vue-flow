---
"@vue-flow/core": minor
---

Add a `colorMode` prop (`'light' | 'dark' | 'system'`, default `'light'`) matching `xyflow/react` + `xyflow/svelte`. The resolved mode is applied as a `light`/`dark` class on the `.vue-flow` container; `'system'` follows the OS `prefers-color-scheme` and reacts to changes at runtime.

The default theme now ships a dark palette: `theme-default.css` defines its colors as `--vf-*` CSS variables (light values on `:root`, dark overrides under `.vue-flow.dark`) so built-in nodes, edges, handles, `Controls`, and `MiniMap` adapt out of the box. The container also paints a dark background in dark mode. Existing light-mode appearance is unchanged.

New themeable variables (overridable via the `style` prop or your own CSS, listed in `CSSVars`): `--vf-handle-border`, `--vf-edge-text`, `--vf-edge-text-bg`, `--vf-background-color`, `--vf-controls-bg`, `--vf-controls-bg-hover`, `--vf-controls-border`, `--vf-controls-color`, `--vf-minimap-bg`, `--vf-minimap-node-bg`, `--vf-minimap-mask`. The `MiniMap`'s `nodeColor`/`maskColor` defaults now reference `--vf-minimap-node-bg`/`--vf-minimap-mask` (still overridable via the props).
