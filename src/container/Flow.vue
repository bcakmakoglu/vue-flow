<script lang="ts" setup>
import '~/style.css'
import '~/theme-default.css'
import { CSSProperties } from 'vue'
import ZoomPane from './ZoomPane.vue'
import SelectionPane from './SelectionPane.vue'
import NodeRenderer from '~/container/NodeRenderer.vue'
import EdgeRenderer from '~/container/EdgeRenderer.vue'
import {
  ConnectionLineType,
  ConnectionMode,
  Elements,
  PanOnScrollMode,
  RevueFlowStore,
  Node,
  Edge,
  NodeType,
  EdgeType,
  ConnectionLineComponent,
  KeyCode,
  TranslateExtent,
  NodeExtent,
} from '~/types'
import { RevueFlowHooks, useRevueFlow } from '~/hooks/RevueFlowHooks'
import configureStore from '~/store/configure-store'
import { initialState } from '~/store'
import { createNodeTypes } from '~/container/NodeRenderer/utils'
import InputNode from '~/components/Nodes/InputNode'
import DefaultNode from '~/components/Nodes/DefaultNode'
import OutputNode from '~/components/Nodes/OutputNode'
import { BezierEdge, SmoothStepEdge, StepEdge, StraightEdge } from '~/components/Edges'
import { createEdgeTypes } from '~/container/EdgeRenderer/utils'
import { isEdge, isNode, parseEdge, parseNode } from '~/utils/graph'

interface RevueFlowProps {
  modelValue: Elements
  nodeTypes?: Record<string, NodeType>
  edgeTypes?: Record<string, EdgeType>
  connectionMode?: ConnectionMode
  connectionLineType?: ConnectionLineType
  connectionLineStyle?: CSSProperties
  connectionLineComponent?: ConnectionLineComponent
  deleteKeyCode?: KeyCode
  selectionKeyCode?: KeyCode
  multiSelectionKeyCode?: KeyCode
  zoomActivationKeyCode?: KeyCode
  snapToGrid?: boolean
  snapGrid?: [number, number]
  onlyRenderVisibleElements?: boolean
  nodesDraggable?: boolean
  nodesConnectable?: boolean
  elementsSelectable?: boolean
  selectNodesOnDrag?: boolean
  paneMoveable?: boolean
  minZoom?: number
  maxZoom?: number
  defaultZoom?: number
  defaultPosition?: [number, number]
  translateExtent?: TranslateExtent
  nodeExtent?: NodeExtent
  arrowHeadColor?: string
  markerEndId?: string
  zoomOnScroll?: boolean
  zoomOnPinch?: boolean
  panOnScroll?: boolean
  panOnScrollSpeed?: number
  panOnScrollMode?: PanOnScrollMode
  zoomOnDoubleClick?: boolean
  edgeUpdaterRadius?: number
}

type NextElements = {
  nextNodes: Node[]
  nextEdges: Edge[]
}

const props = withDefaults(defineProps<RevueFlowProps>(), {
  modelValue: () => [] as Elements,
  connectionMode: ConnectionMode.Strict,
  connectionLineType: ConnectionLineType.Bezier,
  selectionKeyCode: 'Shift',
  multiSelectionKeyCode: 'Meta',
  zoomActivationKeyCode: 'Meta',
  deleteKeyCode: 'Backspace',
  snapToGrid: false,
  snapGrid: () => [15, 15],
  onlyRenderVisibleElements: false,
  nodesConnectable: true,
  elementsSelectable: true,
  selectNodesOnDrag: true,
  minZoom: 0.5,
  maxZoom: 2,
  defaultZoom: 1,
  defaultPosition: () => [0, 0],
  translateExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  nodeExtent: () => [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ],
  arrowHeadColor: '#b1b1b7',
  zoomOnScroll: true,
  zoomOnPinch: true,
  zoomOnDoubleClick: true,
  panOnScroll: false,
  panOnScrollSpeed: 0.5,
  panOnScrollMode: PanOnScrollMode.Free,
  paneMoveable: true,
  edgeUpdaterRadius: 10,
})
const emit = defineEmits(Object.keys(useRevueFlow()))

const store = configureStore(initialState)()
provide<RevueFlowStore>('store', store)

const hooks = useRevueFlow().bind(emit)
provide<RevueFlowHooks>('hooks', hooks)

const elements = useVModel(props, 'modelValue', emit)

const defaultNodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
}

const defaultEdgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
}

const nodeTypes = createNodeTypes({ ...defaultNodeTypes, ...props.nodeTypes })
const edgeTypes = createEdgeTypes({ ...defaultEdgeTypes, ...props.edgeTypes })
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])

const setElements = (elements: Elements) => {
  const propElements = elements
  const nextElements: NextElements = {
    nextNodes: [],
    nextEdges: [],
  }
  const { nextNodes, nextEdges } = propElements.reduce((res, propElement): NextElements => {
    if (isNode(propElement)) {
      const storeNode = nodes.value.find((node) => node.id === propElement.id)

      if (storeNode) {
        const updatedNode: Node = {
          ...storeNode,
          ...propElement,
        }

        if (storeNode.position.x !== propElement.position.x || storeNode.position.y !== propElement.position.y) {
          updatedNode.__rf.position = propElement.position
        }

        if (typeof propElement.type !== 'undefined' && propElement.type !== storeNode.type) {
          // we reset the elements dimensions here in order to force a re-calculation of the bounds.
          // When the type of a node changes it is possible that the number or positions of handles changes too.
          updatedNode.__rf.width = null
        }

        res.nextNodes.push(updatedNode)
      } else {
        res.nextNodes.push(parseNode(propElement, props.nodeExtent))
      }
    } else if (isEdge(propElement)) {
      const storeEdge = edges.value.find((se) => se.id === propElement.id)

      if (storeEdge) {
        res.nextEdges.push({
          ...storeEdge,
          ...propElement,
        })
      } else {
        res.nextEdges.push(parseEdge(propElement))
      }
    }

    return res
  }, nextElements)

  nodes.value = nextNodes
  edges.value = nextEdges
}

setElements(elements.value)
</script>
<template>
  <div class="revue-flow">
    <ZoomPane>
      <template #default="{ transform, dimensions }">
        <SelectionPane
          :delete-key-code="props.deleteKeyCode"
          :multi-selection-key-code="props.multiSelectionKeyCode"
          :selection-key-code="props.selectionKeyCode"
        >
          <NodeRenderer v-bind="props" :node-types="nodeTypes" :nodes="nodes" :transform="transform" :dimensions="dimensions" />
          <EdgeRenderer
            v-if="false"
            v-bind="props"
            :edge-types="edgeTypes"
            :edges="edges"
            :transform="transform"
            :dimensions="dimensions"
          />
        </SelectionPane>
      </template>
    </ZoomPane>
  </div>
</template>
