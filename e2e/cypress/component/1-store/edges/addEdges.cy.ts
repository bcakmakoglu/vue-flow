import { useVueFlow } from '@braks/vue-flow'
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

  it('adds edges to viewpane', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length)
  })
})
