// @ts-nocheck
/**
 * The nodes selection rectangle gets displayed when a user
 * made a selectio  with on or several nodes
 */
import { computed, defineComponent, inject } from 'vue'
import { Draggable, DraggableEventListener } from '@braks/revue-draggable'
import { isNode } from '../../utils/graph'
import { Node, RevueFlowStore } from '../../types'
import { RevueFlowHooks } from '../../hooks/RevueFlowHooks'

export interface NodesSelectionProps {
  onSelectionDragStart?: (event: MouseEvent, nodes: Node[]) => void
  onSelectionDrag?: (event: MouseEvent, nodes: Node[]) => void
  onSelectionDragStop?: (event: MouseEvent, nodes: Node[]) => void
  onSelectionContextMenu?: (event: MouseEvent, nodes: Node[]) => void
}

const NodesSelection = defineComponent({
  setup() {
    const store = inject<RevueFlowStore>('store')!
    const hooks = inject<RevueFlowHooks>('hooks')!
    const grid = computed(() => (store.snapToGrid ? store.snapGrid : [1, 1])! as [number, number])
    const transform = computed(() => store.transform)

    const selectedNodes = computed(() =>
      store.selectedElements
        ? store.selectedElements.filter(isNode).map((selectedNode) => {
            const matchingNode = store.nodes.find((node) => node.id === selectedNode.id)

            return {
              ...matchingNode,
              position: matchingNode?.__rf.position
            } as Node
          })
        : []
    )

    const style = computed(() => ({
      transform: `translate(${store.transform[0]}px,${store.transform[1]}px) scale(${store.transform[2]})`
    }))

    const innerStyle = computed(() => ({
      width: `${store.selectedNodesBbox.width}px`,
      height: `${store.selectedNodesBbox.height}px`,
      top: `${store.selectedNodesBbox.y}px`,
      left: `${store.selectedNodesBbox.x}px`
    }))

    const onStart: DraggableEventListener = ({ event }) => {
      hooks.selectionDragStart.trigger({ event, nodes: selectedNodes.value })
    }

    const onDrag: DraggableEventListener = ({ event, data }) => {
      hooks.selectionDrag.trigger({ event, nodes: selectedNodes.value })

      store.updateNodePosDiff({
        diff: {
          x: data.deltaX,
          y: data.deltaY
        },
        isDragging: true
      })
    }

    const onStop: DraggableEventListener = ({ event }) => {
      store.updateNodePosDiff({
        isDragging: false
      })

      hooks.selectionDragStop.trigger({ event, nodes: selectedNodes.value })
    }

    const onContextMenu = (event: MouseEvent) => {
      const selectedNodes: Node[] = store.selectedElements
        ? store.selectedElements.filter(isNode).map((selectedNode) => store.nodes.find((node) => node.id === selectedNode.id))
        : []

      hooks.selectionContextMenu.trigger({ event, nodes: selectedNodes })
    }

    return () => {
      return !store.selectedElements || store.selectionActive ? (
        ''
      ) : (
        <div class="revue-flow__nodesselection" style={style.value}>
          <Draggable
            onStart={onStart}
            onMove={onDrag}
            onStop={onStop}
            scale={transform.value[2]}
            grid={grid.value}
            enableUserSelectHack={false}
          >
            <div class="revue-flow__nodesselection-rect" onContextmenu={onContextMenu} style={innerStyle.value} />
          </Draggable>
        </div>
      )
    }
  }
})

export default NodesSelection
