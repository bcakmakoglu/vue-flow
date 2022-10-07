import { useVueFlow } from '@braks/vue-flow'
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
    expect(store.getSelectedEdges.value).to.have.length(randomNumber)
  })

  it('adds `selected` class to edges', () => {
    cy.get('.vue-flow__edge').then((edges) => {
      expect(edges[randomNumber - 1]).to.have.class('selected')
    })
  })
})
