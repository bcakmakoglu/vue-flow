import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

const edgesFirstHalf = edges.slice(0, Math.floor(edges.length / 2))
const edgesSecondHalf = edges.slice(Math.floor(edges.length / 2))

describe('Store Action: `addEdges`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges: edgesFirstHalf,
    })
  })

  beforeEach(() => {
    store.addEdges(edgesSecondHalf)
  })

  it('adds edges to store', () => {
    expect(store.edges.value).to.have.length(edges.length)
  })

  it('adds edges to view', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length)
  })

  it('adds edges to DOM', () => {
    cy.get('.vue-flow__edge').then((els) => {
      els.each((index, edge) => {
        const edgeId = edge.getAttribute('data-id')
        const storedEdge = store.findEdge(edgeId)

        expect(storedEdge).to.not.eq(undefined)
        expect(storedEdge?.id).to.eq(edgeId)
      })
    })
  })

  it('does not add invalid edges', () => {
    // @ts-expect-error invalid edges
    store.addEdges([null, undefined, '', 0, false, true, {}, []])
    expect(store.edges.value).to.have.length(edges.length)
  })
})
