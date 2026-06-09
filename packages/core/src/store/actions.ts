import { getDimensions, getOverlappingArea, isRectObject, panBy as panBySystem, updateAbsolutePositions } from '@xyflow/system'
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
  applyChanges,
  createAdditionChange,
  createEdgeRemoveChange,
  createGraphEdges,
  createGraphNodes,
  createNodeRemoveChange,
  createSelectionChange,
  getConnectedEdges as getConnectedEdgesBase,
  getHandleBounds,
  getSelectionChanges,
  isDef,
  isGraphNode,
  nodeToRect,
  parseNode,
  updateConnectionLookup,
  updateEdgeAction,
} from '../utils'
import { storeOptionsToSkip, useState } from './state'

export function useActions<NodeType extends Node = Node>(
  state: State<NodeType>,
  nodeLookup: NodeLookup<NodeType>,
  parentLookup: Map<string, Map<string, GraphNode<NodeType>>>,
  edgeLookup: EdgeLookup,
): Actions<NodeType> {
  const viewportHelper = useViewportHelper(state, nodeLookup)

  /**
   * Single write path for node membership. `nodeLookup` is the primary structure (Step 3 of the
   * inversion); we rebuild it + `parentLookup` from `next` in one imperative pass and mirror `next`
   * into `state.nodes` for the internal reads + public `store.nodes` ref that still consume the array.
   * In-place field mutations (selected/position/internals/data) don't need this — the entries are
   * reactive, shared by reference with the mirror — only membership/order/parent changes do.
   */
  function commitNodes(next: GraphNode<NodeType>[]) {
    nodeLookup.clear()
    parentLookup.clear()
    const parents = new Map<string, Map<string, GraphNode<NodeType>>>()
    for (const node of next) {
      nodeLookup.set(node.id, node)
      const parentId = node.parentId
      if (parentId) {
        let children = parents.get(parentId)
        if (!children) {
          children = new Map<string, GraphNode<NodeType>>()
          parents.set(parentId, children)
        }
        children.set(node.id, node)
      }
    }
    for (const [parentId, children] of parents) {
      parentLookup.set(parentId, children)
    }
    state.nodes = next

    recomputeAbsolutePositions()
  }

  /** Single write path for edge membership; mirrors `next` into `state.edges` (see {@link commitNodes}). */
  function commitEdges(next: GraphEdge[]) {
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

    for (const node of state.nodes) {
      const fresh = nodeLookup.get(node.id)
      if (fresh && fresh !== node) {
        node.internals.positionAbsolute = fresh.internals.positionAbsolute
        node.internals.z = fresh.internals.z
        nodeLookup.set(node.id, node)
      }

      if (!node.parentId) {
        node.internals.z =
          (typeof node.zIndex === 'number' ? node.zIndex : 0) + (node.selected && state.elevateNodesOnSelect ? 1000 : 0)
      }
    }
  }

  const updateNodeInternals: Actions<NodeType>['updateNodeInternals'] = (ids) => {
    const updateIds = ids ?? []

    state.hooks.updateNodeInternals.trigger(updateIds)
  }

  const getConnectedEdges: Actions<NodeType>['getConnectedEdges'] = (nodes) => {
    return getConnectedEdgesBase(nodes, state.edges) as GraphEdge[]
  }

  const getHandleConnections: Actions['getHandleConnections'] = ({ id, type, nodeId }) => {
    const handleSuffix = id ? `-${type}-${id}` : `-${type}`
    return Array.from(state.connectionLookup.get(`${nodeId}${handleSuffix}`)?.values() ?? [])
  }

  const findNode: Actions<NodeType>['findNode'] = (id) => {
    if (!id) {
      return
    }

    return nodeLookup.get(id)
  }

  const findEdge: Actions<NodeType>['findEdge'] = (id) => {
    if (!id) {
      return
    }

    return edgeLookup.get(id)
  }

  const updateNodePositions: Actions<NodeType>['updateNodePositions'] = (dragItems, changed, dragging) => {
    const changes: NodePositionChange[] = []

    for (const node of dragItems) {
      const change: NodePositionChange = {
        id: node.id,
        type: 'position',
        dragging,
        positionAbsolute: node.internals.positionAbsolute,
      }

      if (changed) {
        change.position = node.position

        if (node.parentId) {
          const parentNode = findNode(node.parentId)

          change.position = {
            x: change.position.x - (parentNode?.internals.positionAbsolute?.x ?? 0),
            y: change.position.y - (parentNode?.internals.positionAbsolute?.y ?? 0),
          }
        }
      }

      changes.push(change)
    }

    if (changes?.length) {
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

    const changes: NodeDimensionChange[] = []

    for (const element of updates) {
      const update = element

      const node = findNode(update.id)

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
        }
      }
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

  const addSelectedEdges: Actions<NodeType>['addSelectedEdges'] = (edges) => {
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

    const nodeChanges = nodesToUnselect.map((n) => {
      n.selected = false
      return createSelectionChange(n.id, false)
    })

    state.hooks.nodesChange.trigger(nodeChanges)
  }

  const removeSelectedEdges: Actions<NodeType>['removeSelectedEdges'] = (edges) => {
    const edgesToUnselect = edges || state.edges

    const edgeChanges = edgesToUnselect.map((e) => {
      e.selected = false
      return createSelectionChange(e.id, false)
    })

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

    commitNodes(
      createGraphNodes(nextNodes, findNode, state.hooks.error.trigger, {
        nodeOrigin: [0, 0],
        nodeExtent: Array.isArray(state.nodeExtent) ? (state.nodeExtent as CoordinateExtent) : undefined,
        elevateNodesOnSelect: state.elevateNodesOnSelect,
      }) as GraphNode<NodeType>[],
    )
  }

  const setEdges: Actions<NodeType>['setEdges'] = (edges) => {
    const nextEdges = edges instanceof Function ? edges(state.edges) : edges

    if (!state.initialized && !nextEdges.length) {
      return
    }

    const validEdges: GraphEdge[] = createGraphEdges(
      nextEdges,
      state.isValidConnection,
      findNode,
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

    const graphNodes = createGraphNodes(nextNodes, findNode, state.hooks.error.trigger, {
      nodeOrigin: [0, 0],
      nodeExtent: Array.isArray(state.nodeExtent) ? (state.nodeExtent as CoordinateExtent) : undefined,
      elevateNodesOnSelect: state.elevateNodesOnSelect,
    })

    const changes: NodeAddChange<any>[] = []
    for (const node of graphNodes) {
      changes.push(createAdditionChange(node))
    }

    if (changes.length) {
      state.hooks.nodesChange.trigger(changes)
    }
  }

  const addEdges: Actions<NodeType>['addEdges'] = (params) => {
    let nextEdges = params instanceof Function ? params(state.edges) : params
    nextEdges = Array.isArray(nextEdges) ? nextEdges : [nextEdges]

    const validEdges = createGraphEdges(
      nextEdges,
      state.isValidConnection,
      findNode,
      findEdge,
      state.hooks.error.trigger,
      state.defaultEdgeOptions,
      state.nodes,
      state.edges,
    )

    const changes: EdgeAddChange[] = []
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
      const children: GraphNode[] = []
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
        createEdgeRemovalChanges([currNode])
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

  const removeEdges: Actions<NodeType>['removeEdges'] = (edges) => {
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

  const updateEdge: Actions<NodeType>['updateEdge'] = (oldEdge, newConnection, shouldReplaceId = true) => {
    const prevEdge = findEdge(oldEdge.id)

    if (!prevEdge) {
      return false
    }

    const prevEdgeIndex = state.edges.indexOf(prevEdge)

    const newEdge = updateEdgeAction(oldEdge, newConnection, prevEdge, shouldReplaceId, state.hooks.error.trigger)

    if (newEdge) {
      const [validEdge] = createGraphEdges(
        [newEdge],
        state.isValidConnection,
        findNode,
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

  const updateEdgeData: Actions<NodeType>['updateEdgeData'] = (id, dataUpdate, options = { replace: false }) => {
    const edge = findEdge(id)

    if (!edge) {
      return
    }

    const nextData = typeof dataUpdate === 'function' ? dataUpdate(edge) : dataUpdate

    edge.data = options.replace ? nextData : { ...edge.data, ...nextData }
  }

  const applyNodeChanges: Actions<NodeType>['applyNodeChanges'] = (changes) => {
    // Apply changes against a snapshot of the (primary) lookup, then commit the result back. The
    // public `applyChanges` util stays a pure array transform (it mutates node *fields* on the shared
    // reactive refs and adds/removes array entries); `commitNodes` reconciles lookup membership/order.
    const result = applyChanges(changes, Array.from(nodeLookup.values())) as GraphNode<NodeType>[]
    commitNodes(result)
    return result
  }

  const applyEdgeChanges: Actions<NodeType>['applyEdgeChanges'] = (changes) => {
    const result = applyChanges(changes, Array.from(edgeLookup.values())) as GraphEdge[]

    commitEdges(result)

    updateConnectionLookup(state.connectionLookup, edgeLookup, result)

    return result
  }

  // todo: maybe we should use a more immutable approach, this is a bit too much mutation and hard to maintain
  const updateNode: Actions<NodeType>['updateNode'] = (id, nodeUpdate, options = { replace: false }) => {
    const node = findNode(id)

    if (!node) {
      return
    }

    const nextNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate

    if (options.replace) {
      const next = Array.from(nodeLookup.values())
      next.splice(next.indexOf(node), 1, parseNode(nextNode as NodeType))
      commitNodes(next)
    } else {
      // mutate the reactive lookup entry in place, then reconcile (a `parentId` change must be
      // reflected in `parentLookup`). Membership/order are unchanged, so this reuses the same refs.
      Object.assign(node, nextNode)
      commitNodes(Array.from(nodeLookup.values()))
    }
  }

  const updateNodeData: Actions<NodeType>['updateNodeData'] = (id, dataUpdate, options = { replace: false }) => {
    const node = findNode(id)

    if (!node) {
      return
    }

    const nextData = typeof dataUpdate === 'function' ? dataUpdate(node) : dataUpdate

    node.data = options.replace ? nextData : { ...node.data, ...nextData }
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
    const node = isRectObj ? null : isGraphNode(nodeOrRect as GraphNode) ? (nodeOrRect as GraphNode) : findNode(nodeOrRect.id)

    if (!isRectObj && !node) {
      return [null, null, isRectObj]
    }

    const nodeRect = isRectObj ? nodeOrRect : nodeToRect(node!)

    return [nodeRect, node, isRectObj]
  }

  const getIntersectingNodes: Actions<NodeType>['getIntersectingNodes'] = (nodeOrRect, partially = true, nodes = state.nodes) => {
    const [nodeRect, node, isRect] = getNodeRect(nodeOrRect)

    if (!nodeRect) {
      return []
    }

    const intersections: GraphNode<NodeType>[] = []
    for (const n of nodes || state.nodes) {
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

  const setState: Actions<NodeType>['setState'] = (options) => {
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
      const { selected: _, resizing: __, dragging: ___, measured: ____, internals: _____, ...rest } = node

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

  const fromObject: Actions<NodeType>['fromObject'] = (obj) => {
    return new Promise((resolve) => {
      const { nodes, edges, position, zoom, viewport } = obj

      if (nodes) {
        setNodes(nodes as NodeType[])
      }

      if (edges) {
        setEdges(edges)
      }

      const [xPos, yPos] = viewport?.x && viewport?.y ? [viewport.x, viewport.y] : position ?? [null, null]

      if (xPos && yPos) {
        const nextZoom = viewport?.zoom || zoom || state.viewport.zoom

        // Match React/Svelte Flow: restore is best-effort and expected to run once the flow is ready
        // (e.g. from `onInit` or a user action). `setViewport` applies immediately when the viewport is
        // initialized and warns + no-ops otherwise — no init-watching, and we never mutate
        // `defaultViewport` (which `$reset` reads and the user may have set).
        viewportHelper.value.setViewport({ x: xPos, y: yPos, zoom: nextZoom }).then(() => resolve(true))
      } else {
        resolve(true)
      }
    })
  }

  const $reset: Actions<NodeType>['$reset'] = () => {
    const { nodes: _nodes, edges: _edges, ...resetState } = useState<NodeType>()

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
    fromObject,
    updateNodeInternals,
    viewportHelper,
    $reset,
    $destroy: () => {},
  }
}
