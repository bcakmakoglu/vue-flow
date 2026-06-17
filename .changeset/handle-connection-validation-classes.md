---
"@vue-flow/core": patch
---

Restore the per-handle connection-state classes used for connection-validation styling. During a connection drag `<Handle>` again toggles `connectingfrom` (on the handle the drag started from), `connectingto` (on the handle currently hovered), and `valid` (when that hovered handle is a valid target) — matching `@xyflow/react` and `@xyflow/svelte`. Core only toggles the classes; coloring is left to your CSS. Note the class names now mirror xyflow: target `.vue-flow__handle.connectingto` / `.connectingfrom` / `.valid` instead of the old `vue-flow__handle-connecting` / `vue-flow__handle-valid`.
