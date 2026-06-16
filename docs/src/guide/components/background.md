# Background

Vue Flow comes with two background pattern variants: dots and lines. 

## Usage

To use the background simply pass the `Background` component as a child to the `VueFlow` component.

```vue
<script setup>
import { Background, VueFlow } from '@vue-flow/core'
</script>

<template>
  <VueFlow>
    <Background />
  </VueFlow>
</template>
```

## [Props](/typedocs/interfaces/BackgroundProps)

| Name      | Definition                                                  | Type                                                          | Optional | Default                           |
|-----------|-------------------------------------------------------------|---------------------------------------------------------------|----------|-----------------------------------|
| id        | Background id — needed when several flows show a background  | string                                                        | true     | auto-generated                    |
| variant   | Pattern variant                                             | [BackgroundVariant](/typedocs/type-aliases/BackgroundVariant) | true     | dots                              |
| gap       | Pattern gap — a single number or `[x, y]`                   | number \| number[]                                            | true     | 20                                |
| size      | Pattern size                                                | number                                                        | true     | 1                                 |
| lineWidth | Line width (for the `lines` variant)                        | number                                                        | true     | 1                                 |
| color     | Pattern color (only the pattern, not the background)        | string                                                        | true     | `#91919a` (dots) / `#eee` (lines) |
| offset    | Pattern offset — a single number or `[x, y]`                | number \| [number, number]                                    | true     | 0                                 |
| x         | Background x-coordinate                                     | number                                                        | true     | 0                                 |
| y         | Background y-coordinate                                     | number                                                        | true     | 0                                 |

::: tip
There is no `bgColor` prop — to change the background *color* (rather than the pattern), set a `background-color` on the `<VueFlow>` element via CSS.
:::
