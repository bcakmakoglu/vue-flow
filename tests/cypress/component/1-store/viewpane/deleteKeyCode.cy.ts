import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

describe('Store State: `deleteKeyCode`', () => {
  const store = useVueFlow({ id: 'test' })
  const defaultKeyCode = store.deleteKeyCode.value
  const nodeToDelete = nodes[Math.floor(Math.random() * nodes.length)]
  const edgeToDelete = edges[Math.floor(Math.random() * edges.length)]

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })

    // reset the deleteKeyCode to default
    store.deleteKeyCode.value = defaultKeyCode
  })

  it('deleteKeyCode is `Backspace` by default', () => {
    expect(defaultKeyCode).to.equal('Backspace')
  })

  it('deletes node', () => {
    cy.get(`[data-id="${nodeToDelete.id}"]`).click()

    cy.get('body').trigger('keydown', { key: defaultKeyCode })

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('not.exist')

    cy.tryAssertion(() => {
      expect(store.findNode(nodeToDelete.id)).to.equal(undefined)
    })
  })

  it('changes key code and deletes node', () => {
    store.deleteKeyCode.value = 'Delete'

    cy.get(`[data-id="${nodeToDelete.id}"]`).click()

    cy.get('body').trigger('keydown', { key: 'Delete' })

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('not.exist')

    cy.tryAssertion(() => {
      expect(store.findNode(nodeToDelete.id)).to.equal(undefined)
    })
  })

  it('does not delete node when node is not deletable', () => {
    cy.get(`[data-id="${nodeToDelete.id}"]`).click()

    store.findNode(nodeToDelete.id)!.deletable = false

    cy.get('body').trigger('keydown', { key: defaultKeyCode })

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('exist')

    expect(store.findNode(nodeToDelete.id)).to.not.equal(undefined)
  })

  it('does not delete node when node is not selected', () => {
    cy.get(`[data-id="${nodeToDelete.id}"]`).click()

    store.findNode(nodeToDelete.id)!.selected = false

    cy.get('body').trigger('keydown', { key: defaultKeyCode })

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('exist')

    expect(store.findNode(nodeToDelete.id)).to.not.equal(undefined)
  })

  it('deletes edge', () => {
    cy.get(`[data-id="${edgeToDelete.id}"]`).click()

    cy.get('body').trigger('keydown', { key: defaultKeyCode })

    cy.get(`[data-id="${edgeToDelete.id}"]`).should('not.exist')

    expect(store.findNode(edgeToDelete.id)).to.equal(undefined)
  })

  it('does not delete edge when edge is not deletable', () => {
    cy.get(`[data-id="${edgeToDelete.id}"]`).click()

    store.findEdge(edgeToDelete.id)!.deletable = false

    cy.get('body').trigger('keydown', { key: defaultKeyCode })

    cy.get(`[data-id="${edgeToDelete.id}"]`).should('exist')

    expect(store.findEdge(edgeToDelete.id)).to.not.equal(undefined)
  })

  it('does not delete edge when edge is not selected', () => {
    cy.get(`[data-id="${edgeToDelete.id}"]`).click()

    store.findEdge(edgeToDelete.id)!.selected = false

    cy.get('body').trigger('keydown', { key: defaultKeyCode })

    cy.get(`[data-id="${edgeToDelete.id}"]`).should('exist')

    expect(store.findEdge(edgeToDelete.id)).to.not.equal(undefined)
  })
})
