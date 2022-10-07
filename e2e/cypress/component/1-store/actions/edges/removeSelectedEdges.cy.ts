import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeSelectedEdges`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomNumber: number
  let randomNumber2: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    randomNumber = Math.floor(Math.random() * edges.length)
    randomNumber2 = Math.floor(Math.random() * randomNumber)
    store.addSelectedEdges(Array.from({ length: randomNumber }, (_, i) => store.edges.value[i]))
    store.removeSelectedEdges(Array.from({ length: randomNumber2 }, (_, i) => store.edges.value[i]))
  })

  it('removes selected edges from store', () => {
    expect(store.getSelectedEdges.value).to.have.length(randomNumber2)
  })

  it('removes `selected` class from edges', () => {
    cy.get('.vue-flow__edge').then((edges) => {
      expect(edges[randomNumber2 - 1]).to.have.class('selected')
    })
  })
})
