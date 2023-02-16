import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store State: `deleteKeyCode`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  it('deletes node', () => {
    cy.window().then(() => {
      cy.get(`[data-id="${nodes[0].id}"]`).click()

      cy.get('body').trigger('keydown', { key: 'Backspace' })

      cy.tryAssertion(() => {
        cy.get(`[data-id="${nodes[0].id}"]`).should('not.exist')
        expect(store.nodes.value.some((node) => node.id === nodes[0].id)).to.equal(false)
      })
    })
  })

  it('changes key code', () => {
    store.deleteKeyCode.value = 'Delete'
    cy.window().then(() => {
      cy.get(`[data-id="${nodes[0].id}"]`).click()

      cy.get('body').trigger('keydown', { key: 'Delete' })

      cy.tryAssertion(() => {
        cy.get(`[data-id="${nodes[0].id}"]`).should('not.exist')
        expect(store.nodes.value.some((node) => node.id === nodes[0].id)).to.equal(false)
      })
    })
  })
})
