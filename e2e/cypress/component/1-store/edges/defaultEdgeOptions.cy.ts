import type { DefaultEdgeOptions } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

const defaultEdgeOptions: DefaultEdgeOptions = {
  class: 'custom-class',
  type: 'custom-type',
}

describe('Default Edge Options', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges: [
        {
          id: 'customEdge',
          source: nodes[0].id,
          target: nodes[1].id,
          type: 'custom',
        },
        ...edges,
      ],
      defaultEdgeOptions,
    })
  })

  it('sets default edge options', () => {
    store.edges.value.forEach((edge) => {
      expect(edge.class).to.equal(defaultEdgeOptions.class)
    })

    cy.get('.vue-flow__edge').should('have.class', defaultEdgeOptions.class)
  })

  it('does not override edge values with defaults', () => {
    store.edges.value.forEach((edge) => {
      if (edge.id === 'customEdge') {
        return expect(edge.type).to.equal('custom')
      }

      expect(edge.type).to.equal(defaultEdgeOptions.type)
    })

    // uses fallback default slot
    cy.get('.vue-flow__edge').should('have.class', 'vue-flow__edge-default')
  })
})
