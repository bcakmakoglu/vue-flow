import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

describe('Viewport Helper: `fitView`', () => {
  const store = useVueFlow({ id: 'test' })

  it('fits view', () => {
    cy.vueFlow({
      nodes,
      edges,
      fitViewOnInit: false,
    })

    cy.tryAssertion(() => {
      cy.transformationPane().should('have.css', 'transform', `matrix(1, 0, 0, 1, 0, 0)`)
    }).then(() => {
      cy.wrap(store.fitView()).then(() => {
        cy.tryAssertion(() => {
          cy.transformationPane().should(
            'have.css',
            'transform',
            `matrix(${store.viewport.value.zoom}, 0, 0, ${store.viewport.value.zoom}, ${store.viewport.value.x}, ${store.viewport.value.y})`,
          )
        })
      })
    })
  })

  it('does not fit view when no node exist', () => {
    cy.vueFlow({
      nodes: [],
      edges: [],
    })

    cy.tryAssertion(() => {
      cy.transformationPane().should('have.css', 'transform', `matrix(1, 0, 0, 1, 0, 0)`)
    }).then(() => {
      cy.wrap(store.fitView()).then(() => {
        cy.tryAssertion(() => {
          cy.transformationPane().should('have.css', 'transform', `matrix(1, 0, 0, 1, 0, 0)`)
        })
      })
    })
  })
})
