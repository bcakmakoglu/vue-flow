import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeSelectedNodes`', () => {
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
    randomNumber = Math.floor(Math.random() * nodes.length)
    randomNumber2 = Math.floor(Math.random() * randomNumber)
    store.addSelectedNodes(Array.from({ length: randomNumber }, (_, i) => store.nodes.value[i]))
    store.removeSelectedNodes(Array.from({ length: randomNumber2 }, (_, i) => store.nodes.value[i]))
  })

  it('removes selected nodes from store', () => {
    expect(store.getSelectedNodes.value).to.have.length(randomNumber - randomNumber2)
  })

  it('removes `selected` class from nodes', () => {
    cy.get('.vue-flow__node').then((nodes) => {
      expect(nodes[randomNumber2 - 1]).to.not.have.class('selected')
    })
  })
})
