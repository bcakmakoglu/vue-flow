import antfu from '@antfu/eslint-config';

// Shared flat config for the monorepo (antfu 8). The config package has no vue/ts source of its own,
// so `vue`/`typescript` are enabled explicitly rather than left to antfu's package auto-detection.
export default antfu({
  vue: true,
  typescript: true,
  // antfu's native stylistic formatter (we don't use prettier); the repo uses semicolons + single quotes
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  rules: {
    'curly': ['error', 'all'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // Vite/Vue + quasar code reads build-time-replaced `process.env.*` — `process` is fine as a global here
    'node/prefer-global/process': 'off',
    // mirror the previous `@typescript-eslint/ban-types: off` (split in ts-eslint v8): the codebase
    // intentionally uses `Function`, empty interfaces (extension points like `NodeProps`), etc.
    'ts/no-empty-object-type': 'off',
    'ts/no-unsafe-function-type': 'off',
    'ts/no-wrapper-object-types': 'off',
    // misfires on the documented overloaded composables (useNodesData/useEdgesData): the shared JSDoc
    // block sits above the first overload, so `@param guard` reads as "not matching" a parameter
    'jsdoc/check-param-names': 'off',
  },
});
