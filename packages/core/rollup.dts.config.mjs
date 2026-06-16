import { dts } from 'rollup-plugin-dts';

// Bundle the `vue-tsc`-emitted declaration tree (dist/index.d.ts + subdirs, with extensionless
// relative re-exports) into a single self-contained flat declaration. A flat file has no internal
// relative imports, so it can be emitted as `.d.ts` / `.d.mts` / `.d.cts` interchangeably — which is
// what lets the package expose per-condition (import/require) types without the "masquerades as CJS"
// hazard. Bare specifiers (vue, @xyflow/system, @vueuse/core, d3-*) stay external/referenced.
export default {
  input: './dist/index.d.ts',
  output: { file: './dist/_flat.d.ts', format: 'es' },
  external: id => !/^[./]/.test(id),
  plugins: [dts({ respectExternal: false })],
};
