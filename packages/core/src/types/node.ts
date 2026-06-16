import type { InternalNodeBase, NodeBase, Padding } from '@xyflow/system';
import type { HTMLAttributes } from 'vue';
import type { ClassValue, Styles } from './flow';
import type { HandleElement } from './handle';

/** Defined as [[x-from, y-from], [x-to, y-to]] */
export type CoordinateExtent = [extentFrom: [fromX: number, fromY: number], extentTo: [toX: number, toY: number]];

export interface CoordinateExtentRange {
  range: 'parent' | CoordinateExtent;
  /**
   * Padding inside the parent's bounds (`@xyflow/system`'s `Padding`). A single value applies to all
   * sides; the object form sets sides individually (`x`/`y` are horizontal/vertical shorthands). A `%`
   * value resolves against the parent's width/height.
   */
  padding: Padding;
}

/**
 * Origin of a node relative to its position. `[0, 0]` is top-left, `[0.5, 0.5]` centers it, `[1, 1]` is bottom-right.
 *
 * Locally defined (rather than re-exported from `@xyflow/system`) so the Vue SFC compiler stays out of the
 * system d.ts (its `Optional<T, K>` utility trips vuejs/core#14236). Structurally identical to system's.
 */
export type NodeOrigin = [number, number];

export interface NodeHandleBounds {
  source: HandleElement[] | null;
  target: HandleElement[] | null;
}

/**
 * User-facing node type — reuses `@xyflow/system`'s `NodeBase` (xyflow/react does
 * `Node = NodeBase & {…}`) plus vue-flow-specific fields. `extent` stays `NodeBase`'s narrow
 * `'parent' | CoordinateExtent | null` deliberately (so `InternalNode`/`Node` stay structurally
 * assignable to system's types); the richer `CoordinateExtentRange` is a runtime-only extension
 * handled with localized casts (see `store/actions.ts` `recomputeAbsolutePositions`).
 */
export type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined,
> = NodeBase<NodeData, NodeType> & {
  class?: ClassValue;
  style?: Styles;
  resizing?: boolean;
  focusable?: boolean;
  ariaRole?: string;
  domAttributes?: Omit<
    HTMLAttributes,
    | 'id'
    | 'style'
    | 'className'
    | 'draggable'
    | 'aria-label'
    | 'onMouseenter'
    | 'onMousemove'
    | 'onMouseleave'
    | 'onContextmenu'
    | 'onClick'
    | 'onDblclick'
    | 'onKeydown'
  >;
};
/**
 * The enriched, store-internal node — what `nodeLookup`/`getInternalNode(id)`/`useInternalNode(id)` return,
 * once a user-provided `Node` has been processed by the store. Carries the user `Node`
 * (`internals.userNode`) plus the store-computed `internals.{positionAbsolute, z, handleBounds}` and
 * authoritative `measured`. Named to mirror xyflow/react's `InternalNode`, so the public split
 * (`getNode`/`v-model` = user `Node`, `getInternalNode` = `InternalNode`) reads the same across frameworks.
 *
 * Structurally assignable to `@xyflow/system`'s `InternalNodeBase<NodeType>` so we can hand `nodeLookup`
 * to `XYResizer` / `XYDrag` / `getHandlePosition` without casts. Read absolute position via
 * `internals.positionAbsolute`, z-index via `internals.z`, handle bounds via `internals.handleBounds`, and
 * dimensions via `measured`; the "is this a parent?" check lives on `parentLookup` (storage).
 */
export type InternalNode<NodeType extends Node = Node> = InternalNodeBase<NodeType>;

/**
 * Props passed to custom node components, parameterized on a `NodeType` (xyflow/react convention:
 * `NodeProps<MyNode>`).
 *
 * Declared as a generic **interface** with indexed access (`NodeType['data']`), NOT a `Pick`/`Required`
 * **type alias**: `@vue/compiler-sfc`'s macro resolver can instantiate generic interfaces in
 * `defineProps<NodeProps<MyNode>>()` but cannot instantiate generic utility-type aliases — the alias
 * form silently fails to resolve. (Indexed access resolves even through `NodeType['type']` when the
 * underlying type is `@xyflow/system`'s conditional `NodeBase`.)
 */
export interface NodeProps<NodeType extends Node = Node> {
  id: string;
  data: NodeType['data'];
  type: NodeType['type'];
  selected: boolean;
  selectable: boolean;
  deletable: boolean;
  draggable: boolean;
  dragging: boolean;
  zIndex: number;
  isConnectable: boolean;
  positionAbsoluteX: number;
  positionAbsoluteY: number;
  width?: NodeType['width'];
  height?: NodeType['height'];
  sourcePosition?: NodeType['sourcePosition'];
  targetPosition?: NodeType['targetPosition'];
  dragHandle?: NodeType['dragHandle'];
  parentId?: NodeType['parentId'];
}

export type BuiltInNode = Node<{ label: string }, 'input' | 'output' | 'default'> | Node<Record<string, never>, 'group'>;
