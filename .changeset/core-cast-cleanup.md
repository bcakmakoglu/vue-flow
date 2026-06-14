---
"@vue-flow/core": patch
---

Internal cleanup: drop redundant type casts (vestigial `as unknown as readonly T[]` getter casts left from the pre-#1886 `DeepReadonly` era, the unnecessary `as any` on the built-in edge components, and several double casts reduced to a value or a single assertion), refresh stale comments, and remove the now-dead type imports. No behavior or public-API change.
