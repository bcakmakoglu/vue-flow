import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeEdges`', () => {
  const store = useVueFlow({ id: 'test' })
  let deletedEdges: string[]

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    const randomNumber = Math.floor(Math.random() * edges.length)
    deletedEdges = Array.from({ length: randomNumber }, (_, i) => edges[i].id)
    store.removeEdges(deletedEdges)
  })

  it('removes edges from store', () => {
    expect(store.edges.value).to.have.length(edges.length - deletedEdges.length)
  })

  it('removes edges from view', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length - deletedEdges.length)
  })

  it('removes edges from DOM', () => {
    // todo: can we avoid the timeout? without it, the test fails in ci
    setTimeout(() => {
      cy.get('.vue-flow__edge').then((els) => {
        els.each((index, edge) => {
          const edgeId = edge.getAttribute('data-id')
          const storedEdge = store.findEdge(edgeId)

          expect(deletedEdges).to.not.include(edgeId)
          expect(storedEdge).to.not.eq(undefined)
        })
      })
    }, 1)
  })
})
