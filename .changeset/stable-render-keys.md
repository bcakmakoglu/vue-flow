---
"@vue-flow/core": patch
---

Iterate a value-stable id list in `NodeRenderer`/`EdgeRenderer` so their `v-for` render effect only re-runs on node/edge **membership** changes, not on every commit. Previously each position or data update replaced the whole `nodes`/`edges` array and re-diffed all N children every frame; a moved node/edge now re-renders only through its own lookup-backed wrapper. Combined with the existing per-item `v-memo`, membership changes stay O(changed). No API change.
