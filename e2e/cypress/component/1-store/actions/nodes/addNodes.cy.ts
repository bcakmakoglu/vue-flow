import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../../utils'

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

  it('adds nodes to viewpane', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length + initialNodes.length)
  })
})
