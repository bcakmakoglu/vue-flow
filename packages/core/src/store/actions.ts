import { markRaw, toRaw } from 'vue'
import type { DeepReadonly } from 'vue'
import {
  clampPosition,
  clampPositionToParent,
  getDimensions,
  getOverlappingArea,
  handleExpandParent,
  isRectObject,
  panBy as panBySystem,
  updateAbsolutePositions,
} from '@xyflow/system'
import type {
  Actions,
  CoordinateExtent,
  CoordinateExtentRange,
  Edge,
  EdgeAddChange,
  EdgeLookup,
  EdgeRemoveChange,
  EdgeSelectionChange,
  FlowExportObject,
  GraphEdge,
  GraphNode,
  Node,
  NodeAddChange,
  NodeDimensionChange,
  NodeLookup,
  NodePositionChange,
  NodeRemoveChange,
  Rect,
  State,
} from '../types'
import { useViewportHelper } from '../composables'
import {
  adoptNodes,
  applyChanges,
  calcNextPosition,
  createAdditionChange,
  createEdgeRemoveChange,
  createGraphEdges,
  createNodeRemoveChange,
  createSelectionChange,
  getConnectedEdges as getConnectedEdgesBase,
  getExtent,
  getHandleBounds,
  getSelectionChanges,
  isDef,
  isGraphNode,
  isNode,
  nodeToRect,
  updateConnectionLookup,
  updateEdgeAction,
} from '../utils'
import { storeOptionsToSkip, useState } from './state'

export function useActions<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  state: State<NodeType, EdgeType>,
  nodeLookup: NodeLookup<NodeType>,
  parentLookup: Map<string, Map<string, GraphNode<NodeType>>>,
  edgeLookup: EdgeLookup<EdgeType>,
): Actions<NodeType, EdgeType> {
  const viewportHelper = useViewportHelper(state, nodeLookup)

  /**
   * Single write path for node membership/content. Takes the canonical USER `Node`s, re-adopts them into
   * `nodeLookup`/`parentLookup` via `adoptNodes` (xyflow/react+svelte parity — `adoptUserNodes` mutates the
   * lookups in place, reusing unchanged `InternalNode`s by reference via `checkEquality`), then stores the
   * validated user nodes as `state.nodes` (the v-model array / `getNodes`). The enriched `InternalNode`s
   * live only in the lookup. `recomputeAbsolutePositions` refreshes parent-aware absolute positions/z.
   *
   * Because adoption is immutable+reference-based, callers MUST pass NEW user-node objects for changed
   * nodes (see the immutable `applyChanges`) — mutating a node in place keeps its reference, so
   * `checkEquality` would re-adopt the stale `InternalNode`.
   */
  function commitNodes(nodes: NodeType[]) {
    const validNodes = adoptNodes(nodes, nodeLookup, parentLookup, state.hooks.error.trigger, {
      nodeOrigin: [0, 0],
      nodeExtent: Array.isArray(state.nodeExtent) ? (state.nodeExtent as CoordinateExtent) : undefined,
      elevateNodesOnSelect: state.elevateNodesOnSelect,
    })

    state.nodes = validNodes

    recomputeAbsolutePositions()
  }

  /** Single write path for edge membership; mirrors `next` into `state.edges` (see {@link commitNodes}). */
  function commitEdges(next: GraphEdge<EdgeType>[]) {
    edgeLookup.clear()
    for (const edge of next) {
      edgeLookup.set(edge.id, edge)
    }
    state.edges = next
  }

  /**
   * Recompute parent-aware `internals.positionAbsolute`/`z` for every node via `@xyflow/system`'s
   * `updateAbsolutePositions`, then write the results back onto the canonical reactive node refs
   * (Step 5, approach A — svelte's write-back). This replaces the per-node positionAbsolute watcher
   * that used to live in `NodeWrapper`.
   *
   * `updateAbsolutePositions` mutates the lookup: root nodes in place, child nodes via clone-on-`.set`
   * (so React/Svelte pick them up by reference). vue-flow keeps the nodes array canonical and
   * `useNode().node` returns the live array ref, so for cloned children we copy `internals` back onto
   * the canonical ref *in place* (propagates through the captured ref) and re-point the lookup at it
   * (re-converge identity — validated by the write-back spike). System does NOT set root-node `z`
   * (only children get it via the parent chain), so we apply the elevate-on-select `z` for roots here,
   * matching the old watcher / system's `calculateZ`.
   */
  function recomputeAbsolutePositions() {
    // `@xyflow/system` has no concept of vue-flow's `CoordinateExtentRange` (`{ range, padding }`) and
    // its `isCoordinateExtent` treats any non-`'parent'`/non-nullish value as a coordinate-extent array,
    // so it would index `extent[0]` on the range object and crash. Transiently coerce such extents to
    // their `range` (`'parent'` or a plain `CoordinateExtent`, both system-understood) for the system
    // pass and restore afterwards. NOTE: the range `padding` is not applied by the system clamp — a
    // known limitation tracked for follow-up (vue-flow's padded-parent-extent is richer than system's).
    // `node.extent` is typed `'parent' | CoordinateExtent | null` (deliberately narrow so `GraphNode`
    // stays structurally assignable to system's `NodeBase`), but at runtime vue-flow also supports a
    // `CoordinateExtentRange` ({ range, padding }) — see utils/drag.ts. Hence the localized casts: the
    // type can't express this without breaking system compat. We restore the original extent after.
    const coercedExtents: { node: GraphNode<NodeType>; extent: 'parent' | CoordinateExtent | null | undefined }[] = []
    for (const node of nodeLookup.values()) {
      const extent = node.extent as CoordinateExtentRange | 'parent' | CoordinateExtent | null | undefined
      if (extent && typeof extent === 'object' && !Array.isArray(extent) && 'range' in extent) {
        coercedExtents.push({ node, extent: node.extent })
        node.extent = extent.range
      }
    }

    updateAbsolutePositions(nodeLookup, parentLookup, {
      nodeOrigin: [0, 0],
      nodeExtent: Array.isArray(state.nodeExtent) ? (state.nodeExtent as CoordinateExtent) : undefined,
      elevateNodesOnSelect: state.elevateNodesOnSelect,
    })

    for (const { node, extent } of coercedExtents) {
      node.extent = extent
    }

    // `updateAbsolutePositions` writes `internals.positionAbsolute` directly onto the lookup
    // InternalNodes (roots in place, moved children via clone-on-`.set`) — the lookup is canonical for
    // internals now, so there is no array write-back. System does NOT set root-node `z` (only children get
    // it through the parent chain), so apply the elevate-on-select `z` to root InternalNodes here,
    // matching system's `calculateZ`.
    for (const node of nodeLookup.values()) {
      if (!node.parentId) {
        node.internals.z =
          (typeof node.zIndex === 'number' ? node.zIndex : 0) + (node.selected && state.elevateNodesOnSelect ? 1000 : 0)
      }
    }

    // Apply the range `padding` the system clamp can't express. `updateAbsolutePositions` only understands
    // `'parent'`/`CoordinateExtent` (we coerced `{ range, padding }` to its bare `range` above), so it
    // clamps to the parent/extent bounds *without* the inset. Now that absolute positions are fresh (and
    // re-converged onto the canonical refs), re-clamp each padded node against the padded extent via the
    // same `calcNextPosition`/`getExtent` math the keyboard-move path uses — restoring the padding the
    // pre-system-migration NodeWrapper watcher used to apply. Idempotent (an in-bounds node is unchanged),
    // and `expandParent` nodes are skipped (they grow the parent instead of being clamped into it).
    for (const { node } of coercedExtents) {
      if (node.expandParent) {
        continue
      }

      const parent = node.parentId ? nodeLookup.get(node.parentId) : undefined

      // The padding clamp needs measured dimensions: `getExtent` indexes into the computed extent array
      // and would throw on the unmeasured fallback (the global extent may be undefined). Skip until the
      // node — and, for a `'parent'` range, its parent — are measured; the next recompute (triggered by
      // `updateNodeDimensions` once dimensions land) re-runs this.
      if (!node.measured?.width || !node.measured?.height) {
        continue
      }

      const extent = node.extent as unknown as CoordinateExtentRange
      if (extent.range === 'parent' && (!parent?.measured?.width || !parent?.measured?.height)) {
        continue
      }

      const { position, computedPosition } = calcNextPosition(
        node,
        node.internals.positionAbsolute,
        state.hooks.error.trigger,
        state.nodeExtent,
        parent,
      )

      node.position = position
      node.internals.positionAbsolute = computedPosition
      // mirror the padding-clamped position onto the user node (the canonical array element) so v-model /
      // getNodes reflect it (the InternalNode's `position` is internal-only otherwise).
      ;(node.internals.userNode as Node).position = position
    }

    // Keep every InternalNode raw: `adoptUserNodes` rebuilds changed nodes as fresh plain objects and
    // `updateAbsolutePositions` clones moved children (`.set(id, {...node})`), so without this the reactive
    // lookup would deep-proxy them. The per-node render computed still re-renders on the lookup `.set`
    // (key-level reactivity is independent of value markRaw). Idempotent — reused/already-raw entries no-op.
    for (const internal of nodeLookup.values()) {
      markRaw(toRaw(internal))
    }
  }

  const updateNodeInternals: Actions<NodeType>['updateNodeInternals'] = (ids) => {
    const updateIds = ids ?? []

    state.hooks.updateNodeInternals.trigger(updateIds)
  }

  const getConnectedEdges: Actions<NodeType, EdgeType>['getConnectedEdges'] = (nodes) => {
    return getConnectedEdgesBase(nodes, state.edges) as GraphEdge<EdgeType>[]
  }

  const getHandleConnections: Actions['getHandleConnections'] = ({ id, type, nodeId }) => {
    const handleSuffix = id ? `-${type}-${id}` : `-${type}`
    return Array.from(state.connectionLookup.get(`${nodeId}${handleSuffix}`)?.values() ?? [])
  }

  const findNode: Actions<NodeType>['findNode'] = (id) => {
    if (!id) {
      return
    }

    // The public contract: `findNode`/`getNode` return the user-facing `Node` (the exact object held in
    // `state.nodes`/v-model), which the store keeps on the InternalNode as `internals.userNode`. Enriched
    // data (internals/measured) is reached via `getInternalNode`. Typed `DeepReadonly` (zero runtime) so
    // mutating the result is a compile error → use the helpers (updateNode/applyNodeChanges/setNodes).
    return nodeLookup.get(id)?.internals.userNode as DeepReadonly<NodeType> | undefined
  }

  // The enriched-node accessor (xyflow/react parity). Today it returns the same `nodeLookup` entry as
  // `findNode`; once the public split lands, `findNode`/`getNode` will return the user `Node` while this
  // keeps returning the enriched `InternalNode`. Internal call sites that read `internals`/`measured`
  // should migrate onto this so the contract flip doesn't churn them.
  const getInternalNode: Actions<NodeType>['getInternalNode'] = (id) => {
    if (!id) {
      return
    }

    return nodeLookup.get(id)
  }

  const findEdge: Actions<NodeType, EdgeType>['findEdge'] = (id) => {
    if (!id) {
      return
    }

    return edgeLookup.get(id)
  }

  const updateNodePositions: Actions<NodeType>['updateNodePositions'] = (dragItems, changed, dragging) => {
    const changes: (NodePositionChange | NodeDimensionChange)[] = []
    const parentExpandChildren: { id: string; parentId: string; rect: Rect }[] = []

    for (const node of dragItems) {
      // read `expandParent`/`parentId` from the canonical node: drag items carry them, but keyboard-move
      // items (from `useUpdateNodePositions`) do not — mirrors xyflow/react reading from the lookup.
      const lookupNode = findNode(node.id)
      const expandParentId = lookupNode?.expandParent ? lookupNode.parentId : undefined

      const change: NodePositionChange = {
        id: node.id,
        type: 'position',
        dragging,
        positionAbsolute: node.internals.positionAbsolute,
      }

      if (changed) {
        change.position = node.position

        if (node.parentId) {
          const parentNode = getInternalNode(node.parentId)

          change.position = {
            x: change.position.x - (parentNode?.internals.positionAbsolute?.x ?? 0),
            y: change.position.y - (parentNode?.internals.positionAbsolute?.y ?? 0),
          }
        }

        if (expandParentId) {
          // pin the child's relative position to >= 0; the parent grows to contain it instead
          // (xyflow/react clamps the same way before collecting the child for expansion).
          change.position = { x: Math.max(0, change.position.x), y: Math.max(0, change.position.y) }

          parentExpandChildren.push({
            id: node.id,
            parentId: expandParentId,
            rect: {
              ...node.internals.positionAbsolute,
              width: node.measured?.width ?? 0,
              height: node.measured?.height ?? 0,
            },
          })
        }
      }

      changes.push(change)
    }

    // grow each parent to fit its `expandParent` children — system returns the parent's position +
    // dimension changes plus counter-offsets for the other children, applied through the same pipeline.
    if (parentExpandChildren.length > 0) {
      changes.push(
        ...(handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, [0, 0]) as (
          | NodePositionChange
          | NodeDimensionChange
        )[]),
      )
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const updateNodeDimensions: Actions<NodeType>['updateNodeDimensions'] = (updates) => {
    if (!state.vueFlowRef) {
      return
    }

    const viewportNode = state.vueFlowRef.querySelector('.vue-flow__transformationpane') as HTMLElement

    if (!viewportNode) {
      return
    }

    const style = window.getComputedStyle(viewportNode)
    const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform)

    const changes: (NodeDimensionChange | NodePositionChange)[] = []
    const parentExpandChildren: { id: string; parentId: string; rect: Rect }[] = []

    for (const element of updates) {
      const update = element

      const node = getInternalNode(update.id)

      if (node) {
        const dimensions = getDimensions(update.nodeElement)

        const doUpdate = !!(
          dimensions.width &&
          dimensions.height &&
          (node.measured.width !== dimensions.width || node.measured.height !== dimensions.height || update.forceUpdate)
        )

        if (doUpdate) {
          const nodeBounds = update.nodeElement.getBoundingClientRect()
          node.measured = { width: dimensions.width, height: dimensions.height }
          if (!node.internals.handleBounds) {
            node.internals.handleBounds = { source: null, target: null }
          }
          node.internals.handleBounds.source = getHandleBounds('source', update.nodeElement, nodeBounds, zoom, node.id)
          node.internals.handleBounds.target = getHandleBounds('target', update.nodeElement, nodeBounds, zoom, node.id)

          changes.push({
            id: node.id,
            type: 'dimensions',
            dimensions,
          })

          // a freshly-measured `expandParent` child grows its parent to fit (mirrors system's own
          // `updateNodeDimensions`). Unlike the drag path (where the position is the user's target), here
          // the position is fixed and only the size grew — so re-clamp it against the NEW dimensions and
          // the node's extent BEFORE measuring expansion, exactly as system does. Otherwise a node that
          // merely grew would be treated as overflowing and the parent would expand more than necessary.
          if (node.expandParent && node.parentId) {
            const parent = getInternalNode(node.parentId)
            let positionAbsolute = node.internals.positionAbsolute
            const extent = node.extent as CoordinateExtentRange | 'parent' | CoordinateExtent | null | undefined

            if (extent === 'parent' && parent) {
              positionAbsolute = clampPositionToParent(positionAbsolute, dimensions, parent)
            } else if (Array.isArray(extent)) {
              positionAbsolute = clampPosition(positionAbsolute, extent, dimensions)
            } else if (
              extent &&
              typeof extent === 'object' &&
              'range' in extent &&
              parent?.measured.width &&
              parent.measured.height
            ) {
              // vue-flow range form → its padded coordinate extent
              positionAbsolute = clampPosition(
                positionAbsolute,
                getExtent(node, state.hooks.error.trigger, state.nodeExtent, parent),
                dimensions,
              )
            } else if (Array.isArray(state.nodeExtent)) {
              positionAbsolute = clampPosition(positionAbsolute, state.nodeExtent, dimensions)
            }

            parentExpandChildren.push({
              id: node.id,
              parentId: node.parentId,
              rect: { ...positionAbsolute, width: dimensions.width, height: dimensions.height },
            })
          }

          // Re-set a fresh entry so the markRaw lookup re-renders this node — in-place `measured`/
          // `handleBounds` writes don't trigger the per-node render computed (markRaw values aren't deep
          // tracked; only the lookup `.set` is). This makes measurement reflect even with `applyDefault:false`
          // (the 'dimensions' change additionally flows `measured` onto the user node via re-adopt).
          nodeLookup.set(node.id, markRaw({ ...toRaw(node) }))
        }
      }
    }

    if (parentExpandChildren.length > 0) {
      changes.push(
        ...(handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, [0, 0]) as (
          | NodeDimensionChange
          | NodePositionChange
        )[]),
      )
    }

    if (!state.fitViewOnInitDone && state.fitViewOnInit) {
      viewportHelper.value.fitView().then(() => {
        state.fitViewOnInitDone = true
      })
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const addSelectedNodes: Actions<NodeType>['addSelectedNodes'] = (nodes) => {
    if (state.multiSelectionActive) {
      const nodeChanges = nodes.map((node) => createSelectionChange(node.id, true))
      state.hooks.nodesChange.trigger(nodeChanges)
      return
    }

    state.hooks.nodesChange.trigger(getSelectionChanges(nodeLookup, new Set(nodes.map((n) => n.id)), true))
    state.hooks.edgesChange.trigger(getSelectionChanges(edgeLookup))
  }

  const addSelectedEdges: Actions<NodeType, EdgeType>['addSelectedEdges'] = (edges) => {
    if (state.multiSelectionActive) {
      const changedEdges = edges.map((edge) => createSelectionChange(edge.id, true))
      state.hooks.edgesChange.trigger(changedEdges as EdgeSelectionChange[])
      return
    }

    state.hooks.edgesChange.trigger(getSelectionChanges(edgeLookup, new Set(edges.map((e) => e.id))))
    state.hooks.nodesChange.trigger(getSelectionChanges(nodeLookup, new Set(), true))
  }

  const removeSelectedNodes: Actions<NodeType>['removeSelectedNodes'] = (nodes) => {
    const nodesToUnselect = nodes || state.nodes

    // emit select=false changes only — `applyNodeChanges` applies them immutably + re-adopts. (No in-place
    // `n.selected = false`: it would keep the node's reference, so the re-adopt would reuse the stale entry.)
    const nodeChanges = nodesToUnselect.map((n) => createSelectionChange(n.id, false))

    state.hooks.nodesChange.trigger(nodeChanges)
  }

  const removeSelectedEdges: Actions<NodeType, EdgeType>['removeSelectedEdges'] = (edges) => {
    const edgesToUnselect = edges || state.edges

    const edgeChanges = edgesToUnselect.map((e) => createSelectionChange(e.id, false))

    state.hooks.edgesChange.trigger(edgeChanges)
  }

  const setMinZoom: Actions<NodeType>['setMinZoom'] = (minZoom) => {
    state.panZoom?.setScaleExtent([minZoom, state.maxZoom])
    state.minZoom = minZoom
  }

  const setMaxZoom: Actions<NodeType>['setMaxZoom'] = (maxZoom) => {
    state.panZoom?.setScaleExtent([state.minZoom, maxZoom])
    state.maxZoom = maxZoom
  }

  const setTranslateExtent: Actions<NodeType>['setTranslateExtent'] = (translateExtent) => {
    state.panZoom?.setTranslateExtent(translateExtent)
    state.translateExtent = translateExtent
  }

  const setNodeExtent: Actions<NodeType>['setNodeExtent'] = (nodeExtent) => {
    state.nodeExtent = nodeExtent
    recomputeAbsolutePositions()
    updateNodeInternals()
  }

  const setPaneClickDistance: Actions<NodeType>['setPaneClickDistance'] = (clickDistance) => {
    state.panZoom?.setClickDistance(clickDistance)
  }

  const setInteractive: Actions<NodeType>['setInteractive'] = (isInteractive) => {
    state.nodesDraggable = isInteractive
    state.nodesConnectable = isInteractive
    state.elementsSelectable = isInteractive
  }

  const setNodes: Actions<NodeType>['setNodes'] = (nodes) => {
    const nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes

    if (!state.initialized && !nextNodes.length) {
      return
    }

    // `commitNodes` re-adopts the user nodes into the lookup (xyflow-style) and stores them as `state.nodes`
    commitNodes(nextNodes)
  }

  const setEdges: Actions<NodeType, EdgeType>['setEdges'] = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges

    if (!state.initialized && !nextEdges.length) {
      return
    }

    const validEdges = createGraphEdges<EdgeType>(
      nextEdges,
      state.isValidConnection,
      getInternalNode,
      findEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges,
    )

    commitEdges(validEdges)

    updateConnectionLookup(state.connectionLookup, edgeLookup, validEdges)
  }

  const addNodes: Actions<NodeType>['addNodes'] = (nodes) => {
    let nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes
    nextNodes = Array.isArray(nextNodes) ? nextNodes : [nextNodes]

    // Emit `add` changes for the valid user nodes (filter invalid up front — `applyChanges` would
    // otherwise read `.id` off a non-node and throw; `commitNodes`/`adoptNodes` re-validates on adopt).
    const changes: NodeAddChange<any>[] = []
    for (const node of nextNodes) {
      if (!isNode(node)) {
        continue
      }
      changes.push(createAdditionChange(node))
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const addEdges: Actions<NodeType, EdgeType>['addEdges'] = (params) => {
    let nextEdges = params instanceof Function ? params(state.edges) : params
    nextEdges = Array.isArray(nextEdges) ? nextEdges : [nextEdges]

    const validEdges = createGraphEdges<EdgeType>(
      nextEdges,
      state.isValidConnection,
      getInternalNode,
      findEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges,
    )

    const changes: EdgeAddChange<EdgeType>[] = []
    for (const edge of validEdges) {
      changes.push(createAdditionChange(edge))
    }

    if (changes.length) {
      state.hooks.edgesChange.trigger(changes)
    }
  }

  const removeNodes: Actions<NodeType>['removeNodes'] = (nodes, removeConnectedEdges = true, removeChildren = false) => {
    const nextNodes = nodes instanceof Function ? nodes(state.nodes) : nodes
    const nodesToRemove = Array.isArray(nextNodes) ? nextNodes : [nextNodes]

    const nodeChanges: NodeRemoveChange[] = []
    const edgeChanges: EdgeRemoveChange[] = []

    function createEdgeRemovalChanges(nodes: Node[]) {
      const connectedEdges = getConnectedEdges(nodes)
      for (const edge of connectedEdges) {
        if (isDef(edge.deletable) ? edge.deletable : true) {
          edgeChanges.push(createEdgeRemoveChange(edge.id))
        }
      }
    }

    // recursively get all children and if the child is a parent, get those children as well until all nodes have been removed that are children of the current node
    function createChildrenRemovalChanges(id: string) {
      const children: NodeType[] = []
      for (const node of state.nodes) {
        if (node.parentId === id) {
          children.push(node)
        }
      }

      if (children.length) {
        for (const child of children) {
          nodeChanges.push(createNodeRemoveChange(child.id))
        }

        if (removeConnectedEdges) {
          createEdgeRemovalChanges(children)
        }

        for (const child of children) {
          createChildrenRemovalChanges(child.id)
        }
      }
    }

    for (const item of nodesToRemove) {
      const currNode = typeof item === 'string' ? findNode(item) : item

      if (!currNode) {
        continue
      }

      if (isDef(currNode.deletable) && !currNode.deletable) {
        continue
      }

      nodeChanges.push(createNodeRemoveChange(currNode.id))

      if (removeConnectedEdges) {
        createEdgeRemovalChanges([currNode as Node])
      }

      if (removeChildren) {
        createChildrenRemovalChanges(currNode.id)
      }
    }

    if (edgeChanges.length) {
      state.hooks.edgesChange.trigger(edgeChanges)
    }

    if (nodeChanges.length) {
      state.hooks.nodesChange.trigger(nodeChanges)
    }
  }

  const removeEdges: Actions<NodeType, EdgeType>['removeEdges'] = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges
    const edgesToRemove = Array.isArray(nextEdges) ? nextEdges : [nextEdges]

    const changes: EdgeRemoveChange[] = []

    for (const item of edgesToRemove) {
      const currEdge = typeof item === 'string' ? findEdge(item) : item

      if (!currEdge) {
        continue
      }

      if (isDef(currEdge.deletable) && !currEdge.deletable) {
        continue
      }

      changes.push(createEdgeRemoveChange(typeof item === 'string' ? item : item.id))
    }

    state.hooks.edgesChange.trigger(changes)
  }

  const updateEdge: Actions<NodeType, EdgeType>['updateEdge'] = (oldEdge, newConnection, shouldReplaceId = true) => {
    const prevEdge = findEdge(oldEdge.id)

    if (!prevEdge) {
      return false
    }

    const prevEdgeIndex = state.edges.indexOf(prevEdge)

    const newEdge = updateEdgeAction(oldEdge, newConnection, prevEdge, shouldReplaceId, state.hooks.error.trigger)

    if (newEdge) {
      const [validEdge] = createGraphEdges<EdgeType>(
        [newEdge as unknown as EdgeType],
        state.isValidConnection,
        getInternalNode,
        findEdge,
        state.hooks.error.trigger,
        state.defaultEdgeOptions,
        state.nodes,
        state.edges,
      )

      commitEdges(state.edges.map((edge, index) => (index === prevEdgeIndex ? validEdge : edge)))

      updateConnectionLookup(state.connectionLookup, edgeLookup, [validEdge])

      return validEdge
    }

    return false
  }

  const updateEdgeData: Actions<NodeType, EdgeType>['updateEdgeData'] = (id, dataUpdate, options = { replace: false }) => {
    const edge = findEdge(id)

    if (!edge) {
      return
    }

    const nextData = typeof dataUpdate === 'function' ? dataUpdate(edge) : dataUpdate

    edge.data = options.replace ? nextData : { ...edge.data, ...nextData }
  }

  const applyNodeChanges: Actions<NodeType>['applyNodeChanges'] = (changes) => {
    // Apply changes IMMUTABLY against the canonical user nodes (`applyChanges` returns a new array — new
    // objects for changed nodes, unchanged reused by reference), then re-adopt via `commitNodes`
    // (`adoptUserNodes` reuses unchanged InternalNodes by reference via `checkEquality`).
    const result = applyChanges(changes, state.nodes) as NodeType[]
    commitNodes(result)
    return result
  }

  const applyEdgeChanges: Actions<NodeType, EdgeType>['applyEdgeChanges'] = (changes) => {
    const result = applyChanges(changes, Array.from(edgeLookup.values())) as GraphEdge<EdgeType>[]

    commitEdges(result)

    updateConnectionLookup(state.connectionLookup, edgeLookup, result)

    return result
  }

  const updateNode: Actions<NodeType>['updateNode'] = (id, nodeUpdate, options = { replace: false }) => {
    const node = getInternalNode(id)

    if (!node) {
      return
    }

    const nextNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate

    // Immutable update: build a NEW user node (full replacement or shallow merge) for the target id and
    // re-adopt via `commitNodes`. Mutating in place would keep the reference and re-adopt the stale node.
    const next = state.nodes.map((n) =>
      n.id === id ? ((options.replace ? nextNode : { ...n, ...nextNode }) as NodeType) : n,
    )
    commitNodes(next)
  }

  const updateNodeData: Actions<NodeType>['updateNodeData'] = (id, dataUpdate, options = { replace: false }) => {
    const node = getInternalNode(id)

    if (!node) {
      return
    }

    const nextData = typeof dataUpdate === 'function' ? dataUpdate(node) : dataUpdate

    // Immutable: new user node with new `data`, then re-adopt (see {@link updateNode}).
    const next = state.nodes.map((n) =>
      n.id === id ? ({ ...n, data: options.replace ? nextData : { ...n.data, ...nextData } } as NodeType) : n,
    )
    commitNodes(next)
  }

  const startConnection: Actions<NodeType>['startConnection'] = (startHandle, position, isClick = false) => {
    if (isClick) {
      state.connectionClickStartHandle = startHandle
    } else {
      state.connectionStartHandle = startHandle
    }

    state.connectionEndHandle = null
    state.connectionStatus = null

    if (position) {
      state.connectionPosition = position
    }
  }

  const updateConnection: Actions<NodeType>['updateConnection'] = (position, result = null, status = null) => {
    if (state.connectionStartHandle) {
      state.connectionPosition = position
      state.connectionEndHandle = result
      state.connectionStatus = status
    }
  }

  const endConnection: Actions<NodeType>['endConnection'] = (event, isClick) => {
    state.connectionPosition = { x: Number.NaN, y: Number.NaN }
    state.connectionEndHandle = null
    state.connectionStatus = null

    if (isClick) {
      state.connectionClickStartHandle = null
    } else {
      state.connectionStartHandle = null
    }
  }

  const getNodeRect = (
    nodeOrRect: (Partial<Node> & { id: Node['id'] }) | Rect,
  ): [Rect | null, Node | null | undefined, boolean] => {
    const isRectObj = isRectObject(nodeOrRect)
    // use `getInternalNode` (not findNode): `nodeToRect` below needs `internals`/`measured`, which live on
    // the InternalNode, not the user `Node` that findNode returns
    const node = isRectObj
      ? null
      : isGraphNode(nodeOrRect as GraphNode)
        ? (nodeOrRect as GraphNode)
        : getInternalNode(nodeOrRect.id)

    if (!isRectObj && !node) {
      return [null, null, isRectObj]
    }

    const nodeRect = isRectObj ? nodeOrRect : nodeToRect(node!)

    return [nodeRect, node, isRectObj]
  }

  const getIntersectingNodes: Actions<NodeType>['getIntersectingNodes'] = (
    nodeOrRect,
    partially = true,
    // defaults to the enriched InternalNodes — intersection geometry needs `internals`/`measured`
    nodes = Array.from(nodeLookup.values()),
  ) => {
    const [nodeRect, node, isRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return []
    }

    const intersections: GraphNode<NodeType>[] = []
    for (const n of nodes) {
      if (!isRect && (n.id === node!.id || !n.internals.positionAbsolute)) {
        continue
      }

      const currNodeRect = nodeToRect(n)
      const overlappingArea = getOverlappingArea(currNodeRect, nodeRect)
      const partiallyVisible = partially && overlappingArea > 0

      if (
        partiallyVisible ||
        overlappingArea >= currNodeRect.width * currNodeRect.height ||
        overlappingArea >= Number(nodeRect.width) * Number(nodeRect.height)
      ) {
        intersections.push(n)
      }
    }

    return intersections
  }

  const isNodeIntersecting: Actions<NodeType>['isNodeIntersecting'] = (nodeOrRect, area, partially = true) => {
    const [nodeRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return false
    }

    const overlappingArea = getOverlappingArea(nodeRect, area)
    const partiallyVisible = partially && overlappingArea > 0

    return partiallyVisible || overlappingArea >= Number(nodeRect.width) * Number(nodeRect.height)
  }

  const panBy: Actions<NodeType>['panBy'] = (delta) => {
    const { viewport, dimensions, translateExtent, panZoom } = state

    return panBySystem({ delta, panZoom, transform: [viewport.x, viewport.y, viewport.zoom], translateExtent, ...dimensions })
  }

  const setState: Actions<NodeType, EdgeType>['setState'] = (options) => {
    const opts = options instanceof Function ? options(state) : options

    // these options cannot be set after initialization
    const exclude: (keyof typeof opts)[] = ['viewportRef', 'vueFlowRef', 'dimensions', 'hooks']

    // we need to set the default opts before setting any elements so the options are applied to the elements on first render
    if (isDef(opts.defaultEdgeOptions)) {
      state.defaultEdgeOptions = opts.defaultEdgeOptions
    }

    if (isDef(opts.nodes)) {
      setNodes(opts.nodes as unknown as NodeType[])
    }

    if (isDef(opts.edges)) {
      setEdges(opts.edges)
    }

    const setSkippedOptions = () => {
      if (isDef(opts.maxZoom)) {
        setMaxZoom(opts.maxZoom)
      }
      if (isDef(opts.minZoom)) {
        setMinZoom(opts.minZoom)
      }
      if (isDef(opts.translateExtent)) {
        setTranslateExtent(opts.translateExtent)
      }
    }

    for (const o of Object.keys(opts)) {
      const key = o as keyof State
      const option = opts[key]

      if (![...storeOptionsToSkip, ...exclude].includes(key) && isDef(option)) {
        ;(<any>state)[key] = option
      }
    }

    // min/max-zoom + translateExtent setters are panZoom-null-safe (they always write state, and
    // `XYPanZoom` reads those state values when it mounts), so apply them directly — no need to wait
    // for the panZoom instance to exist.
    setSkippedOptions()

    if (!state.initialized) {
      state.initialized = true
    }
  }

  const toObject: Actions<NodeType>['toObject'] = () => {
    const nodes: Node[] = []
    const edges: Edge[] = []

    for (const node of state.nodes) {
      // `state.nodes` are already user `Node`s (no `internals`); strip the transient runtime fields for export
      const { selected: _, resizing: __, dragging: ___, measured: ____, ...rest } = node

      nodes.push(rest)
    }

    for (const edge of state.edges) {
      const { selected: _, sourceNode: __, targetNode: ___, events: ____, ...rest } = edge

      edges.push(rest)
    }

    // we have to stringify/parse so objects containing refs (like nodes and edges) can potentially be saved in a storage
    return JSON.parse(
      JSON.stringify({
        nodes,
        edges,
        position: [state.viewport.x, state.viewport.y],
        zoom: state.viewport.zoom,
        viewport: state.viewport,
      } as FlowExportObject),
    )
  }

  const $reset: Actions<NodeType, EdgeType>['$reset'] = () => {
    const { nodes: _nodes, edges: _edges, ...resetState } = useState<NodeType, EdgeType>()

    commitEdges([])
    commitNodes([])

    if (state.panZoom) {
      state.panZoom.setViewport({
        x: state.defaultViewport.x ?? 0,
        y: state.defaultViewport.y ?? 0,
        zoom: state.defaultViewport.zoom ?? 1,
      })
    }

    setState(resetState)
  }

  return {
    updateNodePositions,
    updateNodeDimensions,
    setNodes,
    setEdges,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    findNode,
    getInternalNode,
    findEdge,
    updateEdge,
    updateEdgeData,
    updateNode,
    updateNodeData,
    applyEdgeChanges,
    applyNodeChanges,
    addSelectedNodes,
    addSelectedEdges,
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setNodeExtent,
    setPaneClickDistance,
    removeSelectedNodes,
    removeSelectedEdges,
    startConnection,
    updateConnection,
    endConnection,
    setInteractive,
    setState,
    getIntersectingNodes,
    getConnectedEdges,
    getHandleConnections,
    isNodeIntersecting,
    panBy,
    fitView: (params) => viewportHelper.value.fitView(params),
    zoomIn: (transitionOpts) => viewportHelper.value.zoomIn(transitionOpts),
    zoomOut: (transitionOpts) => viewportHelper.value.zoomOut(transitionOpts),
    zoomTo: (zoomLevel, transitionOpts) => viewportHelper.value.zoomTo(zoomLevel, transitionOpts),
    setViewport: (params, transitionOpts) => viewportHelper.value.setViewport(params, transitionOpts),
    getViewport: () => viewportHelper.value.getViewport(),
    setCenter: (x, y, opts) => viewportHelper.value.setCenter(x, y, opts),
    fitBounds: (params, opts) => viewportHelper.value.fitBounds(params, opts),
    project: (params) => viewportHelper.value.project(params),
    screenToFlowCoordinate: (params) => viewportHelper.value.screenToFlowCoordinate(params),
    flowToScreenCoordinate: (params) => viewportHelper.value.flowToScreenCoordinate(params),
    toObject,
    updateNodeInternals,
    viewportHelper,
    $reset,
    $destroy: () => {},
  }
}
