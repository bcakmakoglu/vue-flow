import { isNode, useVueFlow } from '@vue-flow/core'
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
    cy.get('.vue-flow__node').then((els) => {
      els.each((index, node) => {
        const nodeId = node.getAttribute('data-id')
        const storedNode = store.findNode(nodeId!)

        expect(storedNode && isNode(storedNode)).to.eq(true)

        if (index >= randomNumber2 && index < randomNumber) {
          expect(!!storedNode?.selected).to.eq(true)
          cy.tryAssertion(() => {
            expect(node).to.have.class('selected')
          })
        } else {
          expect(!!storedNode?.selected).to.eq(false)
          cy.tryAssertion(() => {
            expect(node).to.not.have.class('selected')
          })
        }
      })
    })
  })
})
