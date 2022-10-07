import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeEdges`', () => {
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
    store.removeEdges(Array.from({ length: randomNumber }, (_, i) => edges[i].id))
  })

  it('removes edges from store', () => {
    expect(store.edges.value).to.have.length(edges.length - randomNumber)
  })

  it('removes edges from viewpane', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length - randomNumber)
  })
})
