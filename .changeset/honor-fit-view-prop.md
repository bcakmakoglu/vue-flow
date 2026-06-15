---
"@vue-flow/core": patch
---

Fix the `fitView` prop being ignored on init — `:fit-view` (and `<VueFlow fit-view>`) had no effect, so flows didn't fit to their nodes after load. `setState` maps the `fitView` prop to the internal `fitViewOnInit` flag, but its generic option loop then re-applied the default `fitViewOnInit: false` (re-spread from the freshly-created state), clobbering the value the mapping had just set. `fitViewOnInit` is now excluded from that loop (it's set solely by the `fitView` mapping), so the initial fit runs as intended. Regression from the `fitViewOnInit`-prop → `fitView`-prop rename.
