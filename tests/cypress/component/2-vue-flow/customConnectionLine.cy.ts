import { h } from 'vue'
import type { FunctionalComponent } from 'vue'
import type { ConnectionLineProps } from '@vue-flow/core'
import { BaseEdge, getBezierPath } from '@vue-flow/core'

const CustomConnectionLine: FunctionalComponent<ConnectionLineProps> = (props: ConnectionLineProps) => {
  const path = getBezierPath(props)

  return h(BaseEdge, { path: path[0], class: 'test-custom-connection-line' })
}

describe('Check if custom connection lines are rendered', () => {
  beforeEach(() => {
    cy.vueFlow(
      {
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

        cy.get('.test-custom-connection-line').should('have.length', 1)

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
