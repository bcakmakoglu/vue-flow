import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes } = getElements()

const initialNodes = [{ id: '1e3', position: { x: 0, y: 0 }, label: 'Node 1e3' }]

describe('Store Action: `addNodes`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes: initialNodes,
    })
  })

  beforeEach(() => {
    store.addNodes(nodes)
  })

  it('adds nodes to store', () => {
    expect(store.nodes.value).to.have.length(nodes.length + initialNodes.length)
  })

  it('adds nodes to view', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length + initialNodes.length)
  })

  it('adds nodes to DOM', () => {
    cy.get('.vue-flow__node').then((els) => {
      els.each((index, node) => {
        const nodeId = node.getAttribute('data-id')
        const storedNode = store.findNode(nodeId)

        expect(storedNode).to.not.eq(undefined)
        expect(storedNode?.id).to.eq(nodeId)
      })
    })
  })

  it('does not add invalid nodes', () => {
    // @ts-expect-error invalid nodes
    store.addNodes([null, undefined, '', 0, false, true, {}, []])
    expect(store.nodes.value).to.have.length(nodes.length + initialNodes.length)
  })
})
