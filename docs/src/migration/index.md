# Migration Guide

## Migrating to 1.6.0+

### Additional Components are now split into separate packages

If you're using Vue Flow at 1.6.0, please avoid using the `@vue-flow/additional-components` package, as it will *not*
work with Vue Flow 1.6.0+.

Instead, install the components from their respective packages.

These packages include:

- [`@vue-flow/background`](/guide/components/background)
- [`@vue-flow/controls`](/guide/components/controls)
- [`@vue-flow/minimap`](/guide/components/minimap)

### Panel Component

The `Panel` component has been moved into the `@vue-flow/core`package.
If you're using it, please update your imports accordingly.
