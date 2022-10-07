import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `addSelectedNodes`', () => {
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
    store.addSelectedNodes(Array.from({ length: randomNumber }, (_, i) => store.nodes.value[i]))
  })

  it('adds selected nodes to store', () => {
    expect(store.getSelectedNodes.value).to.have.length(randomNumber)
  })

  it('adds `selected` class to nodes', () => {
    cy.get('.vue-flow__node').then((nodes) => {
      expect(nodes[randomNumber - 1]).to.have.class('selected')
    })
  })
})
