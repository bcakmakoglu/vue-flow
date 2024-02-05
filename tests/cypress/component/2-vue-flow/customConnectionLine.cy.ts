import { defineComponent, h, watch } from 'vue'
import type { ConnectionLineProps } from '@vue-flow/core'
import { BaseEdge, getBezierPath } from '@vue-flow/core'

const connectionLineId = 'test-custom-connection-line'

describe('Custom Connection Line', () => {
  it('renders a custom connection line component', () => {
    const CustomConnectionLine = defineComponent({
      props: ['sourceNode', 'sourceHandle', 'targetNode', 'targetHandle', 'sourceX', 'sourceY', 'targetX', 'targetY'],
      emits: ['change'],
      setup(props, { emit }) {
        watch(
          () => props,
          () => {
            emit('change', {
              sourceNodeId: props.sourceNode?.id,
              sourceHandleId: props.sourceHandle.id,
              targetNodeId: props.targetNode?.id,
              targetHandleId: props.targetHandle?.id,
            })
          },
          { immediate: true, deep: true },
        )

        return () => {
          const path = getBezierPath(props)

          return h(BaseEdge, { path: path[0], class: connectionLineId })
        }
      },
    })

    const onChangeSpy = cy.spy().as('onChangeSpy')

    cy.vueFlow(
      {
        autoConnect: true,
        fitViewOnInit: false,
        modelValue: [
          {
            id: '1',
            label: 'Node 1',
            position: { x: 0, y: 0 },
          },
          {
            id: '2',
            type: 'output',
            label: 'Node 2',
            position: { x: 300, y: 300 },
          },
        ],
      },
      {},
      { 'connection-line': (props: ConnectionLineProps) => h(CustomConnectionLine, { ...props, onChange: onChangeSpy }) },
    )

    cy.window().then((win) => {
      const sourceHandle = cy.get(`[data-nodeid="1"].source`)
      const targetHandle = cy.get(`[data-nodeid="2"].target`)

      targetHandle.then((handle) => {
        const target = handle[0]
        const { x, y } = target.getBoundingClientRect()

        sourceHandle
          .trigger('mousedown', {
            button: 0,
            force: true,
            view: win,
          })
          .trigger('mousemove', {
            clientX: x,
            clientY: y,
            force: true,
          })

        cy.get(`.${connectionLineId}`).should('have.length', 1)

        cy.get('@onChangeSpy').should('have.been.calledWith', {
          sourceNodeId: '1',
          sourceHandleId: '1__handle-bottom',
          targetNodeId: '2',
          targetHandleId: '2__handle-top',
        })

        sourceHandle.trigger('mouseup', {
          clientX: x,
          clientY: y,
          force: true,
          view: win,
        })

        cy.get(`.${connectionLineId}`).should('have.length', 0)

        cy.get('.vue-flow__edge').should('have.length', 1)
      })
    })
  })
})
