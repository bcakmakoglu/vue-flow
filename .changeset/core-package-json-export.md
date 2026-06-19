---
"@vue-flow/core": patch
---

Expose `./package.json` in the package `exports` map, so `@vue-flow/core/package.json` can be imported (e.g. to read the version). The `exports` map previously blocked it with `ERR_PACKAGE_PATH_NOT_EXPORTED`.
