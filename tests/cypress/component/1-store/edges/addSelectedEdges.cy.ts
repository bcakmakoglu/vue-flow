import { isEdge, useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `addSelectedEdges`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomNumber: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    randomNumber = Math.floor(Math.random() * edges.length)
    store.addSelectedEdges(Array.from({ length: randomNumber }, (_, i) => store.edges.value[i]))
  })

  it('adds selected edges to store', () => {
    cy.tryAssertion(() => expect(store.getSelectedEdges.value).to.have.length(randomNumber))
  })

  it('adds `selected` class to edges', () => {
    cy.get('.vue-flow__edge').then((els) => {
      els.each((index, edge) => {
        const edgeId = edge.getAttribute('data-id')
        const storedEdge = store.findEdge(edgeId!)

        expect(storedEdge && isEdge(storedEdge)).to.eq(true)

        if (index < randomNumber) {
          expect(!!storedEdge?.selected).to.eq(true)
          cy.tryAssertion(() => expect(edge).to.have.class('selected'))
        } else {
          expect(!!storedEdge?.selected).to.eq(false)
          cy.tryAssertion(() => expect(edge).to.not.have.class('selected'))
        }
      })
    })
  })
})
