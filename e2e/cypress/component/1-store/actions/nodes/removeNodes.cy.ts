import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeNodes`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomNumber: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    randomNumber = Math.floor(Math.random() * nodes.length)
    store.removeNodes(Array.from({ length: randomNumber }, (_, i) => nodes[i].id))
  })

  it('removes nodes from store', () => {
    expect(store.nodes.value).to.have.length(nodes.length - randomNumber)
  })

  it('removes nodes from viewpane', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length - randomNumber)
    cy.get('.vue-flow__node').each(($el, index) => {
      expect($el).to.have.attr('data-id', nodes[index + randomNumber].id)
    })
  })
})
