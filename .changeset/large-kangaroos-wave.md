---
"@vue-flow/core": minor
---

Remove auto-generated hanle-ids and use `null` as the default handle id.
If you were relying on handle-ids in your code but weren't assigning them explicitly, you'll might need to update your code to handle this change.
By default, if you don't provide a handle-id, it will be `null` and the first handle of the corresponding type will be used.
