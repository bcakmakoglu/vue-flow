import { isNode, useVueFlow } from '@vue-flow/core'
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
    cy.get('.vue-flow__node').then((els) => {
      els.each((index, node) => {
        const nodeId = node.getAttribute('data-id')
        const storedNode = store.findNode(nodeId!)

        expect(storedNode && isNode(storedNode)).to.eq(true)

        if (index < randomNumber) {
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
