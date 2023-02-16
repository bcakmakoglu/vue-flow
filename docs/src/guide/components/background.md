# Background

Vue Flow comes with two background pattern variants: dots and lines. 

## Installation

```bash
yarn add @vue-flow/background

# or
npm install @vue-flow/background
```

## Usage

To use the background simply pass the `Background` component as a child to the `VueFlow` component.

```vue
<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import initialElements from './initial-elements'

// some nodes and edges
const elements = ref(initialElements)
</script>

<template>
  <VueFlow v-model="elements" fit-view-on-init class="vue-flow-basic-example">
    <Background />
  </VueFlow>
</template>
```

## [Props](/typedocs/interfaces/BackgroundProps)

| Name         | Definition        | Type                                                   | Optional | Default |
|--------------|-------------------|--------------------------------------------------------|----------|---------|
| variant      | Pattern variant   | [BackgroundVariant](/typedocs/enums/BackgroundVariant) | true     | dots    |
| gap          | Pattern gap       | number                                                 | true     | 10      |
| size         | Pattern size      | number                                                 | true     | 0.4     |
| patternColor | Pattern color     | string                                                 | true     | #81818a |
| bgColor      | Is node dragging  | boolean                                                | true     | #fff    |
| height       | Background height | number                                                 | true     | 100     |
| width        | Background width  | number                                                 | true     | 100     |
| x            | X-offset          | number                                                 | true     | 0       |
| y            | Y-offset          | number                                                 | true     | 0       |
