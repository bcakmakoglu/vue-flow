import type { DefaultEdgeOptions, VueFlowStore } from '@vue-flow/core'
import { getStore } from '../../../support/component'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

const defaultEdgeOptions: DefaultEdgeOptions = {
  class: 'custom-class',
  type: 'custom-type',
}

describe('Default Edge Options', () => {
  let store: VueFlowStore

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

    cy.then(() => {
      store = getStore()
    })
  })

  it('applies default edge options at render without stamping stored edges', () => {
    // stored edges stay the user's objects verbatim (xyflow parity) — defaults merge at render time
    store.edges.value.forEach((edge) => {
      expect(edge.class).to.be.undefined
    })

    cy.get('.vue-flow__edge').should('have.class', defaultEdgeOptions.class)
  })

  it('does not overwrite existing values and keeps stored types verbatim', () => {
    store.edges.value.forEach((edge) => {
      if (edge.id === 'customEdge') {
        return expect(edge.type).to.equal('custom')
      }

      expect(edge.type).to.be.undefined
    })

    // defaultEdgeOptions.type is unregistered, so rendering falls back to the default slot
    cy.get('.vue-flow__edge').should('have.class', 'vue-flow__edge-default')
  })
})
