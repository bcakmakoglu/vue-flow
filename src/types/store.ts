import { ComputedRef, ToRefs } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { Dimensions, Elements, FlowElements, FlowInstance, FlowOptions, Rect, SnapGrid, Transform, XYPosition } from './flow'
import { HandleType, EdgeComponent, NodeComponent } from './components'
import { ConnectionLineType, ConnectionMode, SetConnectionId } from './connection'
import { Edge, GraphEdge } from './edge'
import { GraphNode, CoordinateExtent, Node } from './node'
import { D3Selection, D3Zoom, D3ZoomHandler, KeyCode, PanOnScrollMode } from './zoom'
import { FlowHooks } from './hooks'

export interface FlowState<N = any, E = N> extends Omit<FlowOptions<N, E>, 'id'> {
  hooks: FlowHooks
  instance?: FlowInstance

  elements: Elements
  nodes: GraphNode<N>[]
  edges: GraphEdge<E>[]

  d3Zoom?: D3Zoom
  d3Selection?: D3Selection
  d3ZoomHandler?: D3ZoomHandler
  minZoom: number
  maxZoom: number
  defaultZoom: number
  translateExtent: CoordinateExtent
  nodeExtent: CoordinateExtent
  dimensions: Dimensions
  transform: Transform
  onlyRenderVisibleElements: boolean
  defaultPosition: [number, number]

  selectedNodesBbox: Rect
  selectedNodes: GraphNode[]
  selectedEdges: GraphEdge[]
  nodesSelectionActive: boolean
  selectionActive: boolean
  multiSelectionActive: boolean
  deleteKeyCode: KeyCode
  selectionKeyCode: KeyCode
  multiSelectionKeyCode: KeyCode
  zoomActivationKeyCode: KeyCode

  connectionNodeId?: string
  connectionHandleId?: string
  connectionHandleType?: HandleType
  connectionPosition: XYPosition
  connectionMode: ConnectionMode
  connectionLineType: ConnectionLineType
  edgeUpdaterRadius: number

  snapToGrid: boolean
  snapGrid: SnapGrid
  defaultMarkerColor: string

  edgesUpdatable: boolean
  nodesDraggable: boolean
  nodesConnectable: boolean
  elementsSelectable: boolean
  selectNodesOnDrag: boolean
  paneMoveable: boolean
  zoomOnScroll: boolean
  zoomOnPinch: boolean
  panOnScroll: boolean
  panOnScrollSpeed: number
  panOnScrollMode: PanOnScrollMode
  zoomOnDoubleClick: boolean
  preventScrolling: boolean

  isReady: boolean

  vueFlowVersion: string
}

export interface FlowActions<N = any, E = N> {
  setElements: (elements: Elements<N, E>, extent: CoordinateExtent) => void
  setNodes: (nodes: Node<N>[], extent: CoordinateExtent) => void
  setEdges: (edges: Edge<E>[]) => void
  addSelectedElements: (elements: FlowElements<N, E>) => void
  addSelectedEdges: (edges: GraphEdge<E>[]) => void
  addSelectedNodes: (nodes: GraphNode<N>[]) => void
  setMinZoom: (zoom: number) => void
  setMaxZoom: (zoom: number) => void
  setTranslateExtent: (translateExtent: CoordinateExtent) => void
  resetSelectedElements: () => void
  setConnectionNodeId: (payload: SetConnectionId) => void
  setInteractive: (isInteractive: boolean) => void
  setState: (state: Partial<FlowOptions<N, E>>) => void
  updateNodePosition: ({ id, diff, dragging }: { id?: string; diff?: XYPosition; dragging?: boolean }) => void
}

export interface FlowGetters<N = any, E = N> {
  getEdgeTypes: ComputedRef<Record<string, EdgeComponent>>
  getNodeTypes: ComputedRef<Record<string, NodeComponent>>
  getNodes: ComputedRef<GraphNode<N>[]>
  getEdges: ComputedRef<GraphEdge<E>[]>
  getNode: ComputedRef<(id: string) => GraphNode<N> | undefined>
  getEdge: ComputedRef<(id: string) => GraphEdge<E> | undefined>
  getSelectedElements: ComputedRef<FlowElements<N, E>>
  getSelectedNodes: ComputedRef<GraphNode<N>[]>
  getSelectedEdges: ComputedRef<GraphEdge<E>[]>
}

export type Store<N = any, E = N> = { id: string; state: FlowState<N, E> } & ToRefs<FlowState<N, E>> &
  FlowActions<N, E> &
  FlowGetters<N, E>
export type FlowStore<N = any, E = N> = UnwrapNestedRefs<Store<N, E>>
