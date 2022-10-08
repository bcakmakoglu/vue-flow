import { isEdge, useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

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
    expect(store.getSelectedEdges.value).to.have.length(randomNumber - randomNumber2)
  })

  it('removes `selected` class from edges', () => {
    cy.get('.vue-flow__edge').then((els) => {
      els.each((index, edge) => {
        const edgeId = edge.getAttribute('data-id')
        const storedEdge = store.findEdge(edgeId!)

        expect(storedEdge && isEdge(storedEdge)).to.eq(true)

        if (index >= randomNumber2 && index < randomNumber) {
          expect(!!storedEdge?.selected).to.eq(true)
          cy.wait(1).then(() => {
            expect(edge).to.have.class('selected')
          })
        } else {
          expect(!!storedEdge?.selected).to.eq(false)
          cy.wait(1).then(() => {
            expect(edge).to.not.have.class('selected')
          })
        }
      })
    })
  })
})
