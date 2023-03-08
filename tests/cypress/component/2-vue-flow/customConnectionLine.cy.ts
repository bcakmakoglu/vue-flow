import { h } from 'vue'
import type { FunctionalComponent } from 'vue'
import type { ConnectionLineProps, GraphNode, HandleElement } from '@vue-flow/core'
import { BaseEdge, getBezierPath } from '@vue-flow/core'

let propTargetNode: GraphNode | null | undefined = null
let propTargetHandle: HandleElement | null | undefined = null

const CustomConnectionLine: FunctionalComponent<ConnectionLineProps> = (props: ConnectionLineProps) => {
  const path = getBezierPath(props)

  propTargetNode = props.targetNode
  propTargetHandle = props.targetHandle

  return h(BaseEdge, { path: path[0], class: 'test-custom-connection-line' })
}

describe('Check if custom connection lines are rendered', () => {
  beforeEach(() => {
    cy.vueFlow(
      {
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
      { 'connection-line': CustomConnectionLine },
    )
  })

  it('renders custom connection line', () => {
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
            clientX: x + 5,
            clientY: y + 5,
            force: true,
          })

        cy.get('.test-custom-connection-line')
          .should('have.length', 1)
          .then(() => {
            expect(propTargetNode).to.not.be.null
            expect(propTargetNode?.id).to.equal('2')

            expect(propTargetHandle).to.not.be.null
            expect(propTargetHandle?.id).to.equal('2__handle-top')

            sourceHandle.trigger('mouseup', {
              clientX: x + 5,
              clientY: y + 5,
              force: true,
              view: win,
            })
          })
      })
    })
  })
})
