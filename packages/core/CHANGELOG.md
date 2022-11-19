# @vue-flow/core

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
