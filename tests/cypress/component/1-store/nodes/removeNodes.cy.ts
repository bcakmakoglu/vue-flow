import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeNodes`', () => {
  const store = useVueFlow({ id: 'test' })
  let deletedNodes: string[]

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    const randomNumber = Math.floor(Math.random() * nodes.length)
    deletedNodes = Array.from({ length: randomNumber }, (_, i) => nodes[i].id)
    store.removeNodes(deletedNodes)
  })

  it('removes nodes from store', () => {
    expect(store.nodes.value).to.have.length(nodes.length - deletedNodes.length)
  })

  it('removes nodes from view', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length - deletedNodes.length)
  })

  it('removes nodes from DOM', () => {
    // todo: can we avoid the timeout? without it, the test fails in ci
    setTimeout(() => {
      cy.get('.vue-flow__node').then((els) => {
        els.each((index, node) => {
          const nodeId = node.getAttribute('data-id')
          const storedNode = store.findNode(nodeId)

          expect(deletedNodes).to.not.include(nodeId)
          expect(storedNode).to.not.eq(undefined)
        })
      })
    }, 1)
  })
})
