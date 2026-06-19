---
"@vue-flow/core": patch
---

Migrate the build from Vite (library mode) to [tsdown](https://tsdown.dev), aligning with `@xyflow/react`/`@xyflow/system`. One tool now produces the JS bundles **and** the bundled, per-condition type declarations (`index.d.mts` / `index.d.ts`), replacing the previous `vite build` + separate `vue-tsc → rolldown-plugin-dts` flatten step.

- `.vue` SFCs compile via `unplugin-vue`; SFC declarations are emitted by tsdown's `dts: { vue: true }` (vue-tsc under the hood).
- The control icons are now plain Vue components (`icons.ts`) instead of `.svg` files, removing the `vite-svg-loader` dependency.
- Declared dependencies (`@vueuse/core`, `d3-interpolate`, `@xyflow/system`) are now externalized rather than bundled — the standard library behavior (they're already `dependencies`), shrinking the published bundle. The ESM/CJS dual output is unchanged.
- Source maps are now published, and `publint` + `arethetypeswrong` run as part of the build.
- Output files are renamed `vue-flow-core.{mjs,js}` → `index.{mjs,js}`; consumers use the package entry point (`@vue-flow/core`) so this is internal.

Removed dev dependencies: `vite`, `@vitejs/plugin-vue`, `vite-svg-loader`, `@rollup/plugin-replace`, `rollup-plugin-dts`.
