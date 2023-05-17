import { useVueFlow } from '@vue-flow/core'
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
    // todo: can we avoid the timeout? without it, the test fails in ci
    setTimeout(() => {
      cy.get('.vue-flow__edge').then((els) => {
        els.each((index, edge) => {
          const edgeId = edge.getAttribute('data-id')
          const storedEdge = store.findEdge(edgeId!)

          expect(storedEdge).to.not.eq(undefined)

          if (index < randomNumber) {
            expect(!!storedEdge?.selected).to.eq(true)
            expect(edge).to.have.class('selected')
          } else {
            expect(!!storedEdge?.selected).to.eq(false)
            expect(edge).to.not.have.class('selected')
          }
        })
      })
    }, 1)
  })
})
