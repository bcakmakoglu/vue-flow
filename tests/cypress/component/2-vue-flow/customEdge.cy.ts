import type { EdgeComponent } from '@vue-flow/core'
import { BaseEdge, getBezierPath } from '@vue-flow/core'
import { h, markRaw } from 'vue'

const CustomEdge: EdgeComponent = (props) => {
  const path = getBezierPath(props)
  return h(BaseEdge as any, { path: path[0], class: 'test-custom-edge' })
}

describe('Check if custom nodes are rendered', () => {
  beforeEach(() => {
    cy.vueFlow({
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
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          type: 'custom',
        },
      ],
      edgeTypes: {
        custom: markRaw(CustomEdge),
      },
    })
  })

  it('renders custom edge', () => {
    cy.get('.vue-flow__edge-custom').should('have.length', 1)

    cy.get('.test-custom-edge').should('have.length', 1)
  })
})
