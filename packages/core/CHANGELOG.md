# @vue-flow/core

## 1.12.5

### Patch Changes

- [#622](https://github.com/bcakmakoglu/vue-flow/pull/622) [`512eb176`](https://github.com/bcakmakoglu/vue-flow/commit/512eb17640b72b9aa6b06844805cf2c13c1f475c) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - If node extent is set to parent, wait until node is initialized to clamp position

- [#622](https://github.com/bcakmakoglu/vue-flow/pull/622) [`512eb176`](https://github.com/bcakmakoglu/vue-flow/commit/512eb17640b72b9aa6b06844805cf2c13c1f475c) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Regroup edges when nodes change and elevate edges on select is active

- [#622](https://github.com/bcakmakoglu/vue-flow/pull/622) [`d79e2a42`](https://github.com/bcakmakoglu/vue-flow/commit/d79e2a420eb3eff2f0634751c71bf07afb6406cf) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Wait for parent node to be initialized before applying an initial expansion of the parent node

- [#622](https://github.com/bcakmakoglu/vue-flow/pull/622) [`73de601f`](https://github.com/bcakmakoglu/vue-flow/commit/73de601f794e6339a9b6dbd4d39a3f11a624a47d) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Pass initialized nodes in the `onNodesInitialized` hook

## 1.12.4

### Patch Changes

- [#619](https://github.com/bcakmakoglu/vue-flow/pull/619) [`3d482b77`](https://github.com/bcakmakoglu/vue-flow/commit/3d482b77032b2bdc6442751730ae694c9e798c29) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use timeout when clamping positions after nodes' extent has changed

- [#618](https://github.com/bcakmakoglu/vue-flow/pull/618) [`f1975ea7`](https://github.com/bcakmakoglu/vue-flow/commit/f1975ea71e6ebc37c7bc43472016eb45702e54aa) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Do not trigger ctx menu event on viewport when dragging with right mouse button

## 1.12.3

### Patch Changes

- [#616](https://github.com/bcakmakoglu/vue-flow/pull/616) [`b16e3564`](https://github.com/bcakmakoglu/vue-flow/commit/b16e3564708c5429ad594156341fa3e95f84d3b2) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Upgrade to vite 4 & update deps

- [#615](https://github.com/bcakmakoglu/vue-flow/pull/615) [`d8fe5432`](https://github.com/bcakmakoglu/vue-flow/commit/d8fe5432adec9c185c87b0c1e4bf432d83a8362f) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Support key combinations for keycodes.
  Combinations can be passed using an array of keycodes and concatenated with a plus sign.
  For example: `['A+B']` will trigger when A and B are pressed at the same time.

- [#614](https://github.com/bcakmakoglu/vue-flow/pull/614) [`580de340`](https://github.com/bcakmakoglu/vue-flow/commit/580de3405621fcf2811701186abbbc23bddf0a33) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Keep user selection on right click

## 1.12.2

### Patch Changes

- [#610](https://github.com/bcakmakoglu/vue-flow/pull/610) [`01040099`](https://github.com/bcakmakoglu/vue-flow/commit/010400992fdd01df694a06785fbacd339515f24e) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Always handle keyup events, instead of cancelling when focusing an input dom node

- [#611](https://github.com/bcakmakoglu/vue-flow/pull/611) [`8dbdcae2`](https://github.com/bcakmakoglu/vue-flow/commit/8dbdcae27d46679bca34cef105742517f364e485) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Check if position is a number when updating, instead of checking if the value is truthy. Fixes 0 values not being used when updating.

## 1.12.1

### Patch Changes

- [#607](https://github.com/bcakmakoglu/vue-flow/pull/607) [`45851080`](https://github.com/bcakmakoglu/vue-flow/commit/45851080ea54f5f7d16cc2d594e3a1efd35a3b58) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Place default slot content outside of viewport element

- [#605](https://github.com/bcakmakoglu/vue-flow/pull/605) [`e670f465`](https://github.com/bcakmakoglu/vue-flow/commit/e670f465c5afc66d2b56206190f3dc0afecdb5ea) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Let keydown event bubble up from node wrapper instead of preventing default

## 1.12.0

### Minor Changes

- [#600](https://github.com/bcakmakoglu/vue-flow/pull/600) [`072fd911`](https://github.com/bcakmakoglu/vue-flow/commit/072fd91181c0897ae78d0bd2d500959afa1f5fdb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `zIndex` option to nodes and edges. Allows defining stacking order of elements.

## 1.11.1

### Patch Changes

- [#597](https://github.com/bcakmakoglu/vue-flow/pull/597) [`749175b9`](https://github.com/bcakmakoglu/vue-flow/commit/749175b970791991763c84d7f219d41b679fc635) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `focus` and `focus-visible` styles to avoid browser specific styles on default nodes

## 1.11.0

### Minor Changes

- [#595](https://github.com/bcakmakoglu/vue-flow/pull/595) [`0c784a2`](https://github.com/bcakmakoglu/vue-flow/commit/0c784a27a9c2bac15d7578ac1171f3203ddd2f65) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `deletable` option to nodes and edges. If set to false it will prevent nodes and edges to be removed when `removeNodes` or `removeEdges` is triggered

### Patch Changes

- [#593](https://github.com/bcakmakoglu/vue-flow/pull/593) [`da65c54`](https://github.com/bcakmakoglu/vue-flow/commit/da65c54b0dd722a3f8afa68aa56007871d892963) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent elements that have selectable disabled from being selected

- [#590](https://github.com/bcakmakoglu/vue-flow/pull/590) [`89d2415`](https://github.com/bcakmakoglu/vue-flow/commit/89d2415c6d038d753d00b774d3d67fd6995adbc7) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Skip updating positions when `updateNodeInternals` is triggered - it will only update node dimensions (which can trigger a position update)

- [#590](https://github.com/bcakmakoglu/vue-flow/pull/590) [`72f9f1a`](https://github.com/bcakmakoglu/vue-flow/commit/72f9f1a06912976d8f9bc8614663a37b536004e5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use flush timing `pre` for NodeWrapper watchers

## 1.10.3

### Patch Changes

- [#586](https://github.com/bcakmakoglu/vue-flow/pull/586) [`c0f31a2`](https://github.com/bcakmakoglu/vue-flow/commit/c0f31a2b48e5bbab97778b2d88d18cd4418ea949) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Check if element is still in state before attempting removal when applying removal changes

## 1.10.2

### Patch Changes

- [#584](https://github.com/bcakmakoglu/vue-flow/pull/584) [`17cd5bc`](https://github.com/bcakmakoglu/vue-flow/commit/17cd5bc9eb189693b346d0722b330ccbca25bedb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Set initial node position correctly after applying node extent

- [#583](https://github.com/bcakmakoglu/vue-flow/pull/583) [`0c25796`](https://github.com/bcakmakoglu/vue-flow/commit/0c25796967dec49ad9ba5ecce99c7e0bdc0c29aa) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix type exports using path alias instead of relative paths, which causes types to not be inferred on user-side

## 1.10.1

### Patch Changes

- [#581](https://github.com/bcakmakoglu/vue-flow/pull/581) [`ea5c35e`](https://github.com/bcakmakoglu/vue-flow/commit/ea5c35e5faea722acd31d835a1e716aa798f3b53) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Re-calculate position when node extent changes

## 1.10.0

### Minor Changes

- [#579](https://github.com/bcakmakoglu/vue-flow/pull/579) [`b8d3241`](https://github.com/bcakmakoglu/vue-flow/commit/b8d324184fdb974b96d1b54aa042835b7ce83482) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow setting `padding` option for `node.extent: 'parent'`

  Padding can be a `number[]` containing a maximum of 4 values.
  The values are applied in the same order as CSS padding: top, right, bottom, left.
  You can omit values at the end of the array, so `[10, 20]` is equivalent to `[10, 20, 10, 20]` etc.

  #### Usage

  ```js
  const nodes = ref([
    {
      id: '4',
      label: 'Node 4',
      position: { x: 320, y: 200 },
      style: { backgroundColor: 'rgba(255, 0, 0, 0.7)', width: '300px', height: '300px' },
    },
    {
      id: '4a',
      label: 'Node 4a',
      position: { x: 15, y: 65 },
      class: 'light',
      extent: {
        range: 'parent',
        // apply 10 px padding to all four sides
        padding: [10],
      },
      parentNode: '4',
    },
  ])
  ```

### Patch Changes

- [#578](https://github.com/bcakmakoglu/vue-flow/pull/578) [`c0d9018`](https://github.com/bcakmakoglu/vue-flow/commit/c0d901899cd46a4f26ec38001859fa5598f3c248) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow omitting width and height style properties for parent nodes when using `expandParent` on child nodes

## 1.9.4

### Patch Changes

- [#574](https://github.com/bcakmakoglu/vue-flow/pull/574) [`1160d3d`](https://github.com/bcakmakoglu/vue-flow/commit/1160d3d2fbbae1988c7d72c56a1adcab4b1a53dd) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix props being undefined on first render of custom node and edge components

- [#574](https://github.com/bcakmakoglu/vue-flow/pull/574) [`1160d3d`](https://github.com/bcakmakoglu/vue-flow/commit/1160d3d2fbbae1988c7d72c56a1adcab4b1a53dd) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove `nodes` property from `ConnectionLineProps` - use `getNodes` inside the component instead ⚠️

## 1.9.3

### Patch Changes

- [`5402c0e`](https://github.com/bcakmakoglu/vue-flow/commit/5402c0ec211ee4d372911e17af9c5aef49656a85) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use correct aria live class names for vue-flow

## 1.9.2

### Patch Changes

- [#566](https://github.com/bcakmakoglu/vue-flow/pull/566) [`b324a06`](https://github.com/bcakmakoglu/vue-flow/commit/b324a06066c6a9af9ed0e1ff789d31c8a22982f4) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix edge component prop types

## 1.9.1

### Patch Changes

- [#561](https://github.com/bcakmakoglu/vue-flow/pull/561) [`2979feb`](https://github.com/bcakmakoglu/vue-flow/commit/2979feb581c219ddb9fe1f87ff2c5fb4348e9bea) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix slots type regression

## 1.9.0

### Minor Changes

- [#557](https://github.com/bcakmakoglu/vue-flow/pull/557) [`c7897a1`](https://github.com/bcakmakoglu/vue-flow/commit/c7897a1da80a0e22c6e286706de8193db293f433) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow customizing the controls of the viewport and the selection box.

  #### Props

  - `selectionKeyCode`: You can now set this to `MaybeRef<boolean>` to enable a selection box without extra button press (need to set `:pan-on-drag="false"` or `:pan-on-drag="[2]"`[RightClick]).
  - `panOnDrag`: Can now be a boolean or a number[], this allows you to configure every mouse button as a drag button. [1, 2] would mean that you can drag via middle and right mouse button.
  - `panActivationKeyCode`: Key code (or KeyFilter) for activating dragging (useful when using selectionOnDrag).
  - `selectionMode`: You can choose if the selection box needs to contain a node fully (`SelectionMode.Full`) or partially (`SelectionMode.Partial`) to select.

  #### Events

  - `onSelectionStart`: Emitted when the selection box is started.
  - `onSelectionEnd`: Emitted when the selection box is ended.
  - `onViewportChangeStart`: Emitted when viewport change has started.
  - `onViewportChange`: Emitted when viewport is changed.
  - `onViewportChangeEnd`: Emitted when viewport change has ended.

### Patch Changes

- [#558](https://github.com/bcakmakoglu/vue-flow/pull/558) [`bac9893`](https://github.com/bcakmakoglu/vue-flow/commit/bac98930da15fe049ab8f1ac65f09dd67e0000fb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - ⚠️ Deprecate options API utils `addEdge` and `updateEdge`. These utils will be removed soon!

  #### Resolve deprecation warnings

  Instead of using these utils, use `addEdges` and `updateEdge` found on the VueFlow store instance.
  You receive a store instance by using either a template-ref or listening to the `onPaneReady` event.

  ### Example

  ```vue
  <script>
  import { VueFlow } from '@vue-flow/core'

  export default defineComponent({
    name: 'OptionsAPIExample',
    components: { VueFlow },
    data() {
      return {
        vueFlow: null,
        instance: null,
        elements: [
          { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 }, class: 'light' },
          { id: '2', label: 'Node 2', position: { x: 100, y: 100 }, class: 'light' },
          { id: '3', label: 'Node 3', position: { x: 400, y: 100 }, class: 'light' },
          { id: '4', label: 'Node 4', position: { x: 400, y: 200 }, class: 'light' },
          { id: 'e1-2', source: '1', target: '2', animated: true },
          { id: 'e1-3', source: '1', target: '3' },
        ],
      }
    },
    methods: {
      // You can listen to `onPaneReady` to get the instance
      onPaneReady(instance) {
        instance.fitView()
        this.instance = instance
      },
      onConnect(params) {
        // either use the instance you have saved in `onPaneReady`
        this.instance?.addEdges([params])

        // or use the template-ref
        this.$refs.vueFlow?.addEdges([params])
      },
    },
  })
  </script>

  <template>
    <VueFlow
      v-model="elements"
      ref="vueFlow"
      class="vue-flow-basic-example"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
      :zoom-on-scroll="false"
      @connect="onConnect"
      @pane-ready="onPaneReady"
    />
  </template>
  ```

- [#557](https://github.com/bcakmakoglu/vue-flow/pull/557) [`c7897a1`](https://github.com/bcakmakoglu/vue-flow/commit/c7897a1da80a0e22c6e286706de8193db293f433) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add a11y support to selection box

## 1.8.0

### Minor Changes

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`cf46cc8`](https://github.com/bcakmakoglu/vue-flow/commit/cf46cc88b3a51173b8ccc3710243cb11ba5fbc6a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add keyboard controls to node wrapper (a11y)

- [#554](https://github.com/bcakmakoglu/vue-flow/pull/554) [`9e7f65a`](https://github.com/bcakmakoglu/vue-flow/commit/9e7f65aaa05f5a5f03dbd49657bba25b8e57813d) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Merge `defaultZoom` & `defaultPosition` into `defaultViewport` object

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `disableKeyboardA11y` option to VueFlow props and store options

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `focusable` option to edge types

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `ariaLabel` option to edge type

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `edgesFocusable` option to store

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`cf46cc8`](https://github.com/bcakmakoglu/vue-flow/commit/cf46cc88b3a51173b8ccc3710243cb11ba5fbc6a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `nodesFocusable` option to VueFlow props and store options

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `pathOptions` to Bezier and Smoothstep edge types

### Patch Changes

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`cf46cc8`](https://github.com/bcakmakoglu/vue-flow/commit/cf46cc88b3a51173b8ccc3710243cb11ba5fbc6a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `ariaLabel` option to node type

- [#554](https://github.com/bcakmakoglu/vue-flow/pull/554) [`545ab07`](https://github.com/bcakmakoglu/vue-flow/commit/545ab079ba7decf77aa67e8db0d5b2eca8a62b40) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Clamp invalid zoom values

- [#556](https://github.com/bcakmakoglu/vue-flow/pull/556) [`699d786`](https://github.com/bcakmakoglu/vue-flow/commit/699d7861ced2d304e74bf5fc7dfb9269ad4ca115) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent `expandParent` option from changing parent nodes position while expanding

- [#553](https://github.com/bcakmakoglu/vue-flow/pull/553) [`cd4e056`](https://github.com/bcakmakoglu/vue-flow/commit/cd4e0564c119b42251356b9272acd154f6d3c6f3) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Rename `viewpane` to `viewport` -> `ViewpaneTransform` now `ViewportTransform`

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`cf46cc8`](https://github.com/bcakmakoglu/vue-flow/commit/cf46cc88b3a51173b8ccc3710243cb11ba5fbc6a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `focusable` option to node type

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `vueFlowId` to `getMarkerId` to uniquely identify markers across multiple vue flow instances

- [#544](https://github.com/bcakmakoglu/vue-flow/pull/544) [`2341b9b`](https://github.com/bcakmakoglu/vue-flow/commit/2341b9bf157aae32415f897b6e8d21c7b24aa139) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Update `EdgeRef` injection type to `SVGElement`

### A11y

This release brings A11y support to Vue Flow. All nodes and edges can now receive a `focusable` and `ariaLabel` prop, which can be used to enhance A11y experience. You can also enable focusable globally by using `nodesFocusable` or `edgesFocusable`.
Additionally, nodes can be moved using keyboard controls (Arrow-Keys).

#### Props

- `disableKeyboardA11y`: Use this prop to disable Keyboard controls on the graph.
- `defaultViewport`: The old `defaultZoom` and `defaultPosition` props have been merged into a single object called `defaultViewport`.
- `nodesFocusable`: Globally enable that nodes can be focused.
- `edgesFocusable`: Globally enable that edges can be focused.

#### Elements

- `focusable`: Enable focusing for a single node/edge by setting this option.
- `ariaLabel`: Specify an aria label for a node/edge

## 1.7.2

### Patch Changes

- [#547](https://github.com/bcakmakoglu/vue-flow/pull/547) [`ccf10ff`](https://github.com/bcakmakoglu/vue-flow/commit/ccf10ff77958948e53ecb9806c9b77f095bbc40d) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Make label coords (x,y) optional in BaseEdge

- [#551](https://github.com/bcakmakoglu/vue-flow/pull/551) [`2f187a0`](https://github.com/bcakmakoglu/vue-flow/commit/2f187a0f7d2b24b1c7cb9b5e4fad150136bdd97c) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix input field focus inside nodes preventing selection rect to be created

- [#550](https://github.com/bcakmakoglu/vue-flow/pull/550) [`b734d08`](https://github.com/bcakmakoglu/vue-flow/commit/b734d085b2c84c93a49334acf90c5528da7ab709) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `elevateNodesOnSelect` option to enable/disable increasing z-index of selected nodes

- [#548](https://github.com/bcakmakoglu/vue-flow/pull/548) [`011f0ed`](https://github.com/bcakmakoglu/vue-flow/commit/011f0ed23387af1cbbbf71003d4efdeaf8bcf798) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Re-group edges by z-index on edge selection changes

## 1.7.1

### Patch Changes

- [#545](https://github.com/bcakmakoglu/vue-flow/pull/545) [`54c93b9`](https://github.com/bcakmakoglu/vue-flow/commit/54c93b92792b0bf543380dec2a7198b843d99fab) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove immediate watch of VueFlow props and set prop values via state initalizer

- [#545](https://github.com/bcakmakoglu/vue-flow/pull/545) [`54c93b9`](https://github.com/bcakmakoglu/vue-flow/commit/54c93b92792b0bf543380dec2a7198b843d99fab) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Only trigger store watcher immediate when elements were set, otherwise wait for changes in store to overwrite model-value

## 1.7.0

### Minor Changes

- [#539](https://github.com/bcakmakoglu/vue-flow/pull/539) [`85d5a64d`](https://github.com/bcakmakoglu/vue-flow/commit/85d5a64d519207fe3044bd68947b2edb014f288a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `getNodesInitialized` getter to store

### Patch Changes

- [#539](https://github.com/bcakmakoglu/vue-flow/pull/539) [`85d5a64d`](https://github.com/bcakmakoglu/vue-flow/commit/85d5a64d519207fe3044bd68947b2edb014f288a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Make `sourceHandle` and `targetHandle` optional properties for `Connection` type

- [#542](https://github.com/bcakmakoglu/vue-flow/pull/542) [`530f286c`](https://github.com/bcakmakoglu/vue-flow/commit/530f286cb42c09cd2bc5156527fb3e9fa56878cb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Move watcher timing to `pre` and sync immediately

## 1.6.4

### Patch Changes

- [#536](https://github.com/bcakmakoglu/vue-flow/pull/536) [`fc231bec`](https://github.com/bcakmakoglu/vue-flow/commit/fc231bec1e703277ff17403daab7380ed690a744) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix watcher not triggered when passing an empty array

- [#537](https://github.com/bcakmakoglu/vue-flow/pull/537) [`4ec39fb0`](https://github.com/bcakmakoglu/vue-flow/commit/4ec39fb09ae5ad31a53067ccd2e56d69c04e8293) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix node resizer resizing not updating handle bounds

## 1.6.3

### Patch Changes

- [#534](https://github.com/bcakmakoglu/vue-flow/pull/534) [`f0f7e7e4`](https://github.com/bcakmakoglu/vue-flow/commit/f0f7e7e49a98e4e267c028f552420ce81f73adc7) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add missing edge class to edge wrapper

- [#534](https://github.com/bcakmakoglu/vue-flow/pull/534) [`02c945e8`](https://github.com/bcakmakoglu/vue-flow/commit/02c945e8fb719d7c81f61e8b941bf5590bc2ddba) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Pass attributes to edge components (i.e. style and class forwarded to BaseEdge)

- [#532](https://github.com/bcakmakoglu/vue-flow/pull/532) [`cd778715`](https://github.com/bcakmakoglu/vue-flow/commit/cd778715a22769f36656bff8e95841899a0c0317) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use `vue-flow__handle` in handle bounds selector to avoid selecting elements with the `source` or `target` class names that aren't handles

## 1.6.2

### Patch Changes

- [#529](https://github.com/bcakmakoglu/vue-flow/pull/529) [`92fe1022`](https://github.com/bcakmakoglu/vue-flow/commit/92fe10224e432cf4c3bad6d3fd86af36ff4ee1b9) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix store watcher not being triggered when `addNodes` or `addEdges` is called

- [#530](https://github.com/bcakmakoglu/vue-flow/pull/530) [`262bc42b`](https://github.com/bcakmakoglu/vue-flow/commit/262bc42b9c7f26b6748eed30a5a6c67d72e1a6b6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove forced update on resize observer trigger of updateNodeDimensions

## 1.6.1

### Patch Changes

- [#525](https://github.com/bcakmakoglu/vue-flow/pull/525) [`eae81603`](https://github.com/bcakmakoglu/vue-flow/commit/eae8160326bb7a67672503fccd0400333dbf2048) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `initialized` prop to `GraphNode`

- [#525](https://github.com/bcakmakoglu/vue-flow/pull/525) [`eae81603`](https://github.com/bcakmakoglu/vue-flow/commit/eae8160326bb7a67672503fccd0400333dbf2048) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix Handle component adding duplicate handlebounds when node is not properly initialized

- [#526](https://github.com/bcakmakoglu/vue-flow/pull/526) [`00a9795a`](https://github.com/bcakmakoglu/vue-flow/commit/00a9795a41ec15ce0cc342be53c912a9473ea65b) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove console log

## 1.6.0

### Minor Changes

- [#498](https://github.com/bcakmakoglu/vue-flow/pull/498) [`1739797c`](https://github.com/bcakmakoglu/vue-flow/commit/1739797cfebca2d0f9a5d6864dc75c2e1f6ee722) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `useGetPointerPosition` composable

- [#519](https://github.com/bcakmakoglu/vue-flow/pull/519) [`306cd3da`](https://github.com/bcakmakoglu/vue-flow/commit/306cd3dabfc57f730eb6f8939bf05369dadc31a5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Move Panel component to core package

### Patch Changes

- [#498](https://github.com/bcakmakoglu/vue-flow/pull/498) [`1739797c`](https://github.com/bcakmakoglu/vue-flow/commit/1739797cfebca2d0f9a5d6864dc75c2e1f6ee722) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Make `dragging` flag optional in position change type

- [#498](https://github.com/bcakmakoglu/vue-flow/pull/498) [`1739797c`](https://github.com/bcakmakoglu/vue-flow/commit/1739797cfebca2d0f9a5d6864dc75c2e1f6ee722) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Make dimensions optional in dimensions change type

- [#521](https://github.com/bcakmakoglu/vue-flow/pull/521) [`f50644ff`](https://github.com/bcakmakoglu/vue-flow/commit/f50644ffd2237b50bd519c6eb5f0c86dbdaf010a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove Controls component styles from default theme

- [#498](https://github.com/bcakmakoglu/vue-flow/pull/498) [`1739797c`](https://github.com/bcakmakoglu/vue-flow/commit/1739797cfebca2d0f9a5d6864dc75c2e1f6ee722) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `dragging`, `selected` and `resizing` flags to `GraphNode` type

- [#498](https://github.com/bcakmakoglu/vue-flow/pull/498) [`1739797c`](https://github.com/bcakmakoglu/vue-flow/commit/1739797cfebca2d0f9a5d6864dc75c2e1f6ee722) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow multiple changes to be applied to element at once

- [#519](https://github.com/bcakmakoglu/vue-flow/pull/519) [`e5829e8d`](https://github.com/bcakmakoglu/vue-flow/commit/e5829e8d7327ab2a36655b56389a882b839c95c5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove minimap styles from core package default-theme

## 1.5.11

### Patch Changes

- [#517](https://github.com/bcakmakoglu/vue-flow/pull/517) [`440186d2`](https://github.com/bcakmakoglu/vue-flow/commit/440186d2a1a3fa32c0345941682877bc138e5a39) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add missing `dragging` prop to `GraphNode` type

- [#515](https://github.com/bcakmakoglu/vue-flow/pull/515) [`639245b1`](https://github.com/bcakmakoglu/vue-flow/commit/639245b1e2466fb2fe86deaa6d4bfb73378314d8) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove console log from watcher

## 1.5.10

### Patch Changes

- [`1a4a2a62`](https://github.com/bcakmakoglu/vue-flow/commit/1a4a2a6275ca94a085fd3e15cb5373f05c23a768) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add missing dragging flag (release failed)

## 1.5.9

### Patch Changes

- [`ac8c2573`](https://github.com/bcakmakoglu/vue-flow/commit/ac8c2573f61273056e9a226788ee9360a5e577f8) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add missing dragging flag to nodes

## 1.5.8

### Patch Changes

- [#509](https://github.com/bcakmakoglu/vue-flow/pull/509) [`5b748a66`](https://github.com/bcakmakoglu/vue-flow/commit/5b748a6631d8b576557bea5c5aa6ab66d0abd677) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix handle prop connectable always falling back to true, even when explicitly set to false

- [#511](https://github.com/bcakmakoglu/vue-flow/pull/511) [`88b0e34c`](https://github.com/bcakmakoglu/vue-flow/commit/88b0e34cd8c4cce0e271c89cc16e5b714da2ca25) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent store watcher from being stopped on cleanup of model watcher

## 1.5.7

### Patch Changes

- [#501](https://github.com/bcakmakoglu/vue-flow/pull/501) [`ccff5b8b`](https://github.com/bcakmakoglu/vue-flow/commit/ccff5b8bd0f17bb862457c538dd0c7eb3acdfafd) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix watcher not triggering with the `onMounted` hook

- [#506](https://github.com/bcakmakoglu/vue-flow/pull/506) [`7abc3956`](https://github.com/bcakmakoglu/vue-flow/commit/7abc395654d04a7a0144d37e8787a416b0847fae) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Child nodes not properly using parent dimensions when extent is set to `parent`

## 1.5.6

### Patch Changes

- [#497](https://github.com/bcakmakoglu/vue-flow/pull/497) [`50e59604`](https://github.com/bcakmakoglu/vue-flow/commit/50e596046bdb06b59eb9b4281e9482afb92d98a3) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Separate store and model watchers from each other and allow them to be triggered after init

- [#496](https://github.com/bcakmakoglu/vue-flow/pull/496) [`1ca8c2a9`](https://github.com/bcakmakoglu/vue-flow/commit/1ca8c2a9be3c35e5873fcc2289e1108fe4354618) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Make nodes and edges deeply reactive objects, so that data changes can trigger v-model changes as well

## 1.5.5

### Patch Changes

- [#494](https://github.com/bcakmakoglu/vue-flow/pull/494) [`50a24e4`](https://github.com/bcakmakoglu/vue-flow/commit/50a24e4017d47cbe619f34f98a020ed7a2c3bf10) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Apply translateExtent on pan

- [#492](https://github.com/bcakmakoglu/vue-flow/pull/492) [`715a070`](https://github.com/bcakmakoglu/vue-flow/commit/715a0701874f8b5cd8ac643c400df89165716f1a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Properly calculate node extent on drag

- [#491](https://github.com/bcakmakoglu/vue-flow/pull/491) [`47ad11d`](https://github.com/bcakmakoglu/vue-flow/commit/47ad11dcabb3a865854731d860dcad85a043d91f) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Set dragging flag only if a position change happened

## 1.5.4

### Patch Changes

- [#486](https://github.com/bcakmakoglu/vue-flow/pull/486) [`912da4d`](https://github.com/bcakmakoglu/vue-flow/commit/912da4d0a6f0ed48f9455678eb978b9a5e0c08f6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent valid connections on same node and same handle

- [#485](https://github.com/bcakmakoglu/vue-flow/pull/485) [`7ba6215`](https://github.com/bcakmakoglu/vue-flow/commit/7ba621554276e10e2be1cb441928354b4ddfd073) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow middle mouse pan over edges

- [#481](https://github.com/bcakmakoglu/vue-flow/pull/481) [`aed0845`](https://github.com/bcakmakoglu/vue-flow/commit/aed08458575e8832f07922b6cb104e0185306a74) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `HandleConnectableFunc` type

- [#483](https://github.com/bcakmakoglu/vue-flow/pull/483) [`9326c58`](https://github.com/bcakmakoglu/vue-flow/commit/9326c580da5cebc3fd39d1ade195291033c03e54) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Remove barrel files and use auto-imports instead (internal change)

- [#479](https://github.com/bcakmakoglu/vue-flow/pull/479) [`c673b04`](https://github.com/bcakmakoglu/vue-flow/commit/c673b044227a6702c695691be6f94f4331812dec) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Type `markerEnd` and `markerStart` in `EdgeProps`

## 1.5.3

### Patch Changes

- [#474](https://github.com/bcakmakoglu/vue-flow/pull/474) [`9568794`](https://github.com/bcakmakoglu/vue-flow/commit/9568794e36a7cc05169508a7d498510208f6a598) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix untyped connection line, node and edge slots props by patching type definition after build

## 1.5.2

### Patch Changes

- [#466](https://github.com/bcakmakoglu/vue-flow/pull/466) [`051dcc4`](https://github.com/bcakmakoglu/vue-flow/commit/051dcc477fe43033f12b17fb096c516a8cf2c485) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - use `reactive` instead of `shallowReactive` for nested node/edge properties

- [#462](https://github.com/bcakmakoglu/vue-flow/pull/462) [`7dfceb2`](https://github.com/bcakmakoglu/vue-flow/commit/7dfceb213397d82375c779bf61d24ddf2df9b27d) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix model watcher overwriting empty state when setting element `onMounted` hook

- [#465](https://github.com/bcakmakoglu/vue-flow/pull/465) [`c56ee5a`](https://github.com/bcakmakoglu/vue-flow/commit/c56ee5a6e906166b451a7221d4a5a8714497f745) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow `null` as key-code

## 1.5.1

### Patch Changes

- [#459](https://github.com/bcakmakoglu/vue-flow/pull/459) [`649bdb9`](https://github.com/bcakmakoglu/vue-flow/commit/649bdb94d4e1b9dc102629eb83b9912ca1c5c7c5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add nullish check for node/edge events object to prevent err if undefined

- [#454](https://github.com/bcakmakoglu/vue-flow/pull/454) [`fc15fa3`](https://github.com/bcakmakoglu/vue-flow/commit/fc15fa3276689744ef5f41f2b8560c8370cd37e6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Update model-value regardless of element arr length

## 1.5.0

### Minor Changes

- [#435](https://github.com/bcakmakoglu/vue-flow/pull/435) [`1cca3d0`](https://github.com/bcakmakoglu/vue-flow/commit/1cca3d0b8c789f2b1d749602eff560abf75e6eeb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `connecting` class to `SelectionPane` when connecting

- [#451](https://github.com/bcakmakoglu/vue-flow/pull/451) [`6047b90`](https://github.com/bcakmakoglu/vue-flow/commit/6047b908d98cdcf69297dc9ae73b6a5314cb2b4f) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Support touch for creating connections

- [#449](https://github.com/bcakmakoglu/vue-flow/pull/449) [`686b351`](https://github.com/bcakmakoglu/vue-flow/commit/686b351569e751510280f7283f7af3773aee8b44) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add experimental support for nested Vue Flow components; Align edges by adding parent flow zoom scale. Connections not supported.

### Patch Changes

- [#452](https://github.com/bcakmakoglu/vue-flow/pull/452) [`5303f10`](https://github.com/bcakmakoglu/vue-flow/commit/5303f10a80df4c71d3c526381cc27040a03f4f4d) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix parent expand not working for top/left drag

- [#449](https://github.com/bcakmakoglu/vue-flow/pull/449) [`686b351`](https://github.com/bcakmakoglu/vue-flow/commit/686b351569e751510280f7283f7af3773aee8b44) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `experimentalFeatures` flag to store

## 1.4.2

### Patch Changes

- [#439](https://github.com/bcakmakoglu/vue-flow/pull/439) [`817884e`](https://github.com/bcakmakoglu/vue-flow/commit/817884e71ffb0d555b69d84b5f08f724afe891cf) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Elevate selected nodes zIndex by 1000 instead to 1000

- [#448](https://github.com/bcakmakoglu/vue-flow/pull/448) [`3a09339`](https://github.com/bcakmakoglu/vue-flow/commit/3a0933952e8f0d4082c7643e78edd9f381f417a9) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Elevate child nodes by zIndex +1

- [#447](https://github.com/bcakmakoglu/vue-flow/pull/447) [`06fc9f2`](https://github.com/bcakmakoglu/vue-flow/commit/06fc9f2ec43ac58d3e6257d8ff5a1948330f060a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix initial node extent not applied

## 1.4.1

### Patch Changes

- [#425](https://github.com/bcakmakoglu/vue-flow/pull/425) [`da0a294`](https://github.com/bcakmakoglu/vue-flow/commit/da0a294aa47b091cd846168594d3a01bde057315) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Update deps

- [#434](https://github.com/bcakmakoglu/vue-flow/pull/434) [`b24b9ef`](https://github.com/bcakmakoglu/vue-flow/commit/b24b9efe1118b9d3151550257620b4b2c5088fca) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix improper if clause when checking for selection key code as bool

- [#429](https://github.com/bcakmakoglu/vue-flow/pull/429) [`1fc60bf`](https://github.com/bcakmakoglu/vue-flow/commit/1fc60bf1bb700ce4c7321d85b7421c41b235ab2b) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - When Connection Mode is `Loose`, use all handles as possible source handles for connection lines

- [#433](https://github.com/bcakmakoglu/vue-flow/pull/433) [`d82cb67`](https://github.com/bcakmakoglu/vue-flow/commit/d82cb674c6ae7be453ac6c145a2478a2efa2cedb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add missing `connectionExists` utility export

## 1.4.0

### Minor Changes

- [#360](https://github.com/bcakmakoglu/vue-flow/pull/360) [`a11edae`](https://github.com/bcakmakoglu/vue-flow/commit/a11edae9ecb95c8ca0ecef70ff9414415bafb23b) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `interactionWidth` prop to edges. Sets radius of pointer interactivity for edges

## 1.3.3

### Patch Changes

- [#412](https://github.com/bcakmakoglu/vue-flow/pull/412) [`630434d`](https://github.com/bcakmakoglu/vue-flow/commit/630434d5cfaae90eda96e0a49c488860fe994d32) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use node name as class name

## 1.3.2

### Patch Changes

- [#407](https://github.com/bcakmakoglu/vue-flow/pull/407) [`2874cd9`](https://github.com/bcakmakoglu/vue-flow/commit/2874cd969ad31bf2ec578c6c9c40399f9d59244a) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent default edge options overwriting actual edge values

- [#407](https://github.com/bcakmakoglu/vue-flow/pull/407) [`7908e02`](https://github.com/bcakmakoglu/vue-flow/commit/7908e0224e5f54f817ac34c3c34e3da3ffb7cfb1) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fall back to default edge or node type if custom type cannot be resolved

- [#389](https://github.com/bcakmakoglu/vue-flow/pull/389) [`6e0dd5b`](https://github.com/bcakmakoglu/vue-flow/commit/6e0dd5b3d2fc3d4d02866d8454dabcc1ee675e77) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Place Vue Flow Container in it's own stacking context

## 1.3.1

### Patch Changes

- [#402](https://github.com/bcakmakoglu/vue-flow/pull/402) [`d7ade98`](https://github.com/bcakmakoglu/vue-flow/commit/d7ade98720a5407a58e1e0924d53723b1600d044) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use `event.composedPath` as event target when checking for input dom nodes

- [#403](https://github.com/bcakmakoglu/vue-flow/pull/403) [`8930d2e`](https://github.com/bcakmakoglu/vue-flow/commit/8930d2ee957858ea67ec3e125e1ca0a9a41f7fae) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Stop reset of user-selection rect on mouse leave event

- [#398](https://github.com/bcakmakoglu/vue-flow/pull/398) [`43953c9`](https://github.com/bcakmakoglu/vue-flow/commit/43953c9d1f48dececff8cef84f85bbee8fec44db) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Upgrade to vite 3

## 1.3.0

### Minor Changes

- [#394](https://github.com/bcakmakoglu/vue-flow/pull/394) [`1403b65`](https://github.com/bcakmakoglu/vue-flow/commit/1403b65f612bd5c905b0ec240d4d16c16ff86df4) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `nodesInitialized` event hook

- [#387](https://github.com/bcakmakoglu/vue-flow/pull/387) [`9530290`](https://github.com/bcakmakoglu/vue-flow/commit/95302901335303c4460373848ee07a532f150678) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Pass node intersections to node drag events (on single node drag)

- [#387](https://github.com/bcakmakoglu/vue-flow/pull/387) [`a19b458`](https://github.com/bcakmakoglu/vue-flow/commit/a19b4581a7e237f746e7cf8837c25f3c36249962) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add intersection utils to help with checking if a node intersects with either other nodes or a given area

  ### Usage

  - You can either use the action `getIntersectingNodes` to find all nodes that intersect with a given node

  ```js
  const { onNodeDrag, getIntersectingNodes, getNodes } = useVueFlow()

  onNodeDrag(({ node }) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id)

    getNodes.value.forEach((n) => {
      // highlight nodes that are intersecting with the dragged node
      n.class = intersections.includes(n.id) ? 'highlight' : ''
    })
  })
  ```

  - Node drag events will provide you with the intersecting nodes without having to call the action explicitly.

  ```js
  onNodeDrag(({ intersections }) => {
    getNodes.value.forEach((n) => {
      n.class = intersections?.some((i) => i.id === n.id) ? 'highlight' : ''
    })
  })
  ```

  - Or you can use the `isIntersecting` util to check if a node intersects with a given area

  ```js
  const { onNodeDrag, isNodeIntersecting } = useVueFlow()

  onNodeDrag(({ node }) => {
    // highlight the node if it is intersecting with the given area
    node.class = isNodeIntersecting(node, { x: 0, y: 0, width: 100, height: 100 }) ? 'highlight' : ''
  })
  ```

- [#396](https://github.com/bcakmakoglu/vue-flow/pull/396) [`03412ac`](https://github.com/bcakmakoglu/vue-flow/commit/03412acf0d4452c104cc342e5e11eb3a7671fe72) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add zoomable and pannable to MiniMap

  ### Usage

  - Set `zoomable` and `pannable` to `true` in `MiniMap` component to enable interactions with the MiniMap

  ```vue
  <template>
    <VueFlow v-model="elements">
      <MiniMap :zoomable="true" :pannable="true" />
    </VueFlow>
  </template>
  ```

### Patch Changes

- [#361](https://github.com/bcakmakoglu/vue-flow/pull/361) [`43ff2a4`](https://github.com/bcakmakoglu/vue-flow/commit/43ff2a42e6d77251b3fe7987afa02c19cdb2f240) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `EdgeLabelRenderer` component export

  ### Usage

  - You can use the `EdgeLabelRenderer` component to render the label of an edge outside the SVG context of edges.
  - The `EdgeLabelRenderer` component is a component that handles teleporting your edge label into a HTML context
  - This is useful if you want to use HTML elements in your edge label, like buttons

  ```vue
  <script lang="ts" setup>
  import type { EdgeProps, Position } from '@vue-flow/core'
  import { EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
  import type { CSSProperties } from 'vue'

  interface CustomEdgeProps<T = any> extends EdgeProps<T> {
    id: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    sourcePosition: Position
    targetPosition: Position
    data: T
    markerEnd: string
    style: CSSProperties
  }

  const props = defineProps<CustomEdgeProps>()

  const { removeEdges } = useVueFlow()

  const path = $computed(() => getBezierPath(props))
  </script>

  <script lang="ts">
  export default {
    inheritAttrs: false,
  }
  </script>

  <template>
    <path :id="id" :style="style" class="vue-flow__edge-path" :d="path[0]" :marker-end="markerEnd" />

    <EdgeLabelRenderer>
      <div
        :style="{
          pointerEvents: 'all',
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }"
        class="nodrag nopan"
      >
        <button class="edgebutton" @click="removeEdges([id])">×</button>
      </div>
    </EdgeLabelRenderer>
  </template>

  <style>
  .edgebutton {
    border-radius: 999px;
    cursor: pointer;
  }
  .edgebutton:hover {
    box-shadow: 0 0 0 2px pink, 0 0 0 4px #f05f75;
  }
  </style>
  ```

## 1.2.2

### Patch Changes

- [#388](https://github.com/bcakmakoglu/vue-flow/pull/388) [`76ad5838`](https://github.com/bcakmakoglu/vue-flow/commit/76ad5838d9cd09df39ebe35e0983605b3443d8d6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Always set handle ids (using auto-generated id if none is passed)

- [#388](https://github.com/bcakmakoglu/vue-flow/pull/388) [`ffe65636`](https://github.com/bcakmakoglu/vue-flow/commit/ffe65636189b3ff681e629cd6d3933f52be2a04c) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - skip connectable for handles unrelated to connected edges

- [#392](https://github.com/bcakmakoglu/vue-flow/pull/392) [`fcffd492`](https://github.com/bcakmakoglu/vue-flow/commit/fcffd49221a77b0df88183caa4513f9c00bbb660) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use all handles, regardless of type, when ConnectionMode is `Loose`

## 1.2.1

### Patch Changes

- [#378](https://github.com/bcakmakoglu/vue-flow/pull/378) [`9089861c`](https://github.com/bcakmakoglu/vue-flow/commit/9089861ce78584cb524c3da178cd1c0252ccee30) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Disable user selection if `elementsSelectable` is false

- [#378](https://github.com/bcakmakoglu/vue-flow/pull/378) [`9089861c`](https://github.com/bcakmakoglu/vue-flow/commit/9089861ce78584cb524c3da178cd1c0252ccee30) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent node selection box from appearing before mouseup

- [#380](https://github.com/bcakmakoglu/vue-flow/pull/380) [`2c3ea836`](https://github.com/bcakmakoglu/vue-flow/commit/2c3ea836f1b62fb808f1f7a00bae5b2e917381bb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Use shallowRef for node/edge data and event objects so they trigger a re-render on custom nodes/edges

## 1.2.0

### Minor Changes

- [#123](https://github.com/bcakmakoglu/vue-flow/pull/123) [`3105bd0`](https://github.com/bcakmakoglu/vue-flow/commit/3105bd051ab4ac72c95e524dcb5c551ee4f812f6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Disable console warnings for production node-envs

## 1.1.4

### Patch Changes

- [#353](https://github.com/bcakmakoglu/vue-flow/pull/353) [`8f95187`](https://github.com/bcakmakoglu/vue-flow/commit/8f95187a6c474aa299fde3dd3c80145483b1b238) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Allow undefined as custom theme var value

- [#349](https://github.com/bcakmakoglu/vue-flow/pull/349) [`61d2b88`](https://github.com/bcakmakoglu/vue-flow/commit/61d2b88ebc9fcde7beb89a877f3bf975c00e22d5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Node and Edge data and events to be definitely typed when passed as NodeProps or EdgeProps

- [#352](https://github.com/bcakmakoglu/vue-flow/pull/352) [`bff576b`](https://github.com/bcakmakoglu/vue-flow/commit/bff576bc0494a34eedf6eafb03d84d074d372b79) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `overflow: visible` to control btn svgs (fixes safari bug where svgs aren't showing up)

- [#349](https://github.com/bcakmakoglu/vue-flow/pull/349) [`61d2b88`](https://github.com/bcakmakoglu/vue-flow/commit/61d2b88ebc9fcde7beb89a877f3bf975c00e22d5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Extend Elements/FlowElements generics to differentiate between Node and Edge data and custom events

- [#349](https://github.com/bcakmakoglu/vue-flow/pull/349) [`61d2b88`](https://github.com/bcakmakoglu/vue-flow/commit/61d2b88ebc9fcde7beb89a877f3bf975c00e22d5) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add Generic to isNode and isEdge helpers

- [#350](https://github.com/bcakmakoglu/vue-flow/pull/350) [`92a69a6`](https://github.com/bcakmakoglu/vue-flow/commit/92a69a617fc6ddbdc8c1eaeaa8ca040bbc67285e) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Set nodes' dragging prop on drag start and end (fixes grabbing hand not showing on mousedown / not disappearing on mouseup)

## 1.1.3

### Patch Changes

- [#342](https://github.com/bcakmakoglu/vue-flow/pull/342) [`72c203e`](https://github.com/bcakmakoglu/vue-flow/commit/72c203e3d527376221673fccb62dc99ff8061a23) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix edge text not calculating dimensions properly

## 1.1.2

### Patch Changes

- [#337](https://github.com/bcakmakoglu/vue-flow/pull/337) [`12d9f79`](https://github.com/bcakmakoglu/vue-flow/commit/12d9f79d1ba5ee3b2e6b45db54ee466156182f61) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add dragging class to nodes on `drag` instead of `dragStart`

- [#341](https://github.com/bcakmakoglu/vue-flow/pull/341) [`d2ed19e`](https://github.com/bcakmakoglu/vue-flow/commit/d2ed19eebad2a8d3ee40f55f3f1dc63037ef73bb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Pass edge styles to edge path element

- [`949d19f`](https://github.com/bcakmakoglu/vue-flow/commit/949d19ff5d120f30ffbef35beb960ce6037082bb) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Fix edge texts not properly aligning to center

- [#333](https://github.com/bcakmakoglu/vue-flow/pull/333) [`8583e13`](https://github.com/bcakmakoglu/vue-flow/commit/8583e13db98fe32f23d91b1952cee91778fd434e) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add missing dragging class to pane

- [#336](https://github.com/bcakmakoglu/vue-flow/pull/336) [`1aaac25`](https://github.com/bcakmakoglu/vue-flow/commit/1aaac25e76367602c9de9198ba1202b728267371) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Elements not properly unselected when clicking node and edge afterwards

## 1.1.1

### Patch Changes

- [#328](https://github.com/bcakmakoglu/vue-flow/pull/328) [`1e5a77d6`](https://github.com/bcakmakoglu/vue-flow/commit/1e5a77d608c79c7701f97a81690fa5babc7c2514) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Prevent `mouseup` handler from resetting `startHandle` before connections can be made when using `connectOnClick`

- [#328](https://github.com/bcakmakoglu/vue-flow/pull/328) [`18a812db`](https://github.com/bcakmakoglu/vue-flow/commit/18a812db6445941ff626921a311f2f2aefd84968) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Passing `single` option breaks `connectable` check when no handle ids are set

  - Pass `connectable` to correct handle prop in default node types

- [#328](https://github.com/bcakmakoglu/vue-flow/pull/328) [`a415353b`](https://github.com/bcakmakoglu/vue-flow/commit/a415353ba5fe3bb29b33704baf5d83b869e508f1) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - Add `dragging` class name to pane on drag

## 1.1.0

### Minor Changes

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`78f9ee1c`](https://github.com/bcakmakoglu/vue-flow/commit/78f9ee1cb77cc00590b8d4529da7cd124ddfc0f6) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Add `HandleConnectable` type
  - Update `connectable` prop of `Handle` to `HandleConnectable` type
  - Allow to specify if Handles are connectable
    - any number of connections
    - none
    - single connection
    - or a cb to determine whether the Handle is connectable

  Example:

  ```vue
  <script lang="ts" setup>
  import { Handle, HandleConnectable } from '@vue-flow/core'

  const handleConnectable: HandleConnectable = (node, connectedEdges) => {
    console.log(node, connectedEdges)
    return true
  }
  </script>
  <template>
    <!-- single connection -->
    <Handle type="target" position="left" connectable="single" />
    <div>Custom Node</div>
    <!-- cb -->
    <Handle id="a" position="right" :connectable="handleConnectable" />
  </template>
  ```

  - Update `node.connectable` prop to `HandleConnectable`

  For Example:

  ```js
  const nodes = ref([
    {
      id: '1',
      position: { x: 0, y: 0 },
      connectable: 'single', // each handle is only connectable once (default node for example)
    },
    {
      id: '2',
      position: { x: 200, y: 0 },
      connectable: (node, connectedEdges) => {
        return true // will allow any number of connections
      },
    },
    {
      id: '3',
      position: { x: 400, y: 0 },
      connectable: true, // will allow any number of connections
    },
    {
      id: '4',
      position: { x: 200, y: 0 },
      connectable: false, // will disable handles
    },
  ])
  ```

### Patch Changes

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`e175cf81`](https://github.com/bcakmakoglu/vue-flow/commit/e175cf8157be1851651d6df0a9e87f732b53de59) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Add `vueflow` pkg that exports all features

  ```vue
  <script setup>
  // `vueflow` pkg exports all features, i.e. core + additional components
  import { VueFlow, Background, MiniMap, Controls } from 'vueflow'
  </script>

  <template>
    <VueFlow>
      <Background />
      <MiniMap />
      <Controls />
    </VueFlow>
  </template>
  ```

  ### Chores

  - Rename `core` pkg directory to `core` from `vue-flow`
  - Rename bundle outputs

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`e1c28a26`](https://github.com/bcakmakoglu/vue-flow/commit/e1c28a26c75a86b8c2790480bb8dadf37ad2ff12) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Simplify `useHandle` usage
  - Pass props to the composable as possible refs
    - Still returns onClick & onMouseDown handlers but only expects mouse event now

  Before:

  ```vue
  <script lang="ts" setup>
  import { useHandle, NodeId } from '@vue-flow/core'

  const nodeId = inject(NodeId)

  const handleId = 'my-handle'

  const type = 'source'

  const isValidConnection = () => true

  const { onMouseDown } = useHandle()

  const onMouseDownHandler = (event: MouseEvent) => {
    onMouseDown(event, handleId, nodeId, type === 'target', isValidConnection, undefined)
  }
  </script>

  <template>
    <div @mousedown="onMouseDownHandler" />
  </template>
  ```

  After:

  ```vue
  <script lang="ts" setup>
  import { useHandle, useNode } from '@vue-flow/core'

  const { nodeId } = useNode()

  const handleId = 'my-handle'

  const type = 'source'

  const isValidConnection = () => true

  const { onMouseDown } = useHandle({
    nodeId,
    handleId,
    isValidConnection,
    type,
  })
  </script>

  <template>
    <div @mousedown="onMouseDown" />
  </template>
  ```

- [#311](https://github.com/bcakmakoglu/vue-flow/pull/311) [`08ad1735`](https://github.com/bcakmakoglu/vue-flow/commit/08ad17356f5fbd50255af27f7c482da756eda4aa) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # Bugfixes

  - Edges not returned by getter when `paneReady` event is triggered

## 1.0.0

### Major Changes

- [#305](https://github.com/bcakmakoglu/vue-flow/pull/305) [`939bff50`](https://github.com/bcakmakoglu/vue-flow/commit/939bff503039af3b790160640548ddde984cf2bc) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Simplify edge path calculations
    - remove `getEdgeCenter` and `getSimpleEdgeCenter`

  # Breaking Changes

  - `getEdgeCenter` has been removed
    - Edge center positions can now be accessed from `getBezierPath` or `getSmoothStepPath` functions

  Before:

  ```js
  import { getBezierPath, getEdgeCenter } from '@braks/vue-flow'

  // used to return the path string only
  const edgePath = computed(() => getBezierPath(pathParams))

  // was necessary to get the centerX, centerY of an edge
  const centered = computed(() => getEdgeCenter(centerParams))
  ```

  After:

  ```js
  import { getBezierPath } from '@vue-flow/core'

  // returns the path string and the center positions
  const [path, centerX, centerY] = computed(() => getBezierPath(pathParams))
  ```

- [#305](https://github.com/bcakmakoglu/vue-flow/pull/305) [`47d837aa`](https://github.com/bcakmakoglu/vue-flow/commit/47d837aac096e59e7f55213990dff2cc7eba0c01) Thanks [@bcakmakoglu](https://github.com/bcakmakoglu)! - # What's changed?

  - Change pkg scope from 'braks' to 'vue-flow'
    - Add `@vue-flow/core` package
    - Add `@vue-flow/additional-components` package
    - Add `@vue-flow/pathfinding-edge` package
    - Add `@vue-flow/resize-rotate-node` package

  # Features

  - `useNode` and `useEdge` composables
    - can be used to access current node/edge (or by id) and their respective element refs (if used inside the elements' context, i.e. a custom node/edge)
  - `selectionKeyCode` as `true`
    - allows for figma style selection (i.e. create a selection rect without holding shift or any other key)
  - Handles to trigger handle bounds calculation on mount
    - if no handle bounds are found, a Handle will try to calculate its bounds on mount
    - should remove the need for `updateNodeInternals` on dynamic handles
  - Testing for various features using Cypress 10

  # Bugfixes

  - Fix `removeSelectedEdges` and `removeSelectedNodes` actions not properly removing elements from store

  # Breaking Changes

  - `@vue-flow/core` package is now required to use vue-flow
  - `@vue-flow/additional-components` package contains `Background`, `MiniMap` and `Controls` components and related types
    - When switching to the new pkg scope, you need to change the import path.

  Before:

  ```js
  import { VueFlow, Background, MiniMap, Controls } from '@braks/vue-flow'
  ```

  After

  ```js
  import { VueFlow } from '@vue-flow/core'
  import { Background, MiniMap, Controls } from '@vue-flow/additional-components'
  ```
