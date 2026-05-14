import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `addSelectedNodes` / `addSelectedEdges`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  // NOTE: `addSelectedNodes` deselects edges (and `addSelectedEdges` deselects nodes) when
  // `multiSelectionActive` is false — that's the default. The tests below select one type at a time
  // to verify each action in isolation.

  it('adds selected nodes to store', () => {
    const count = Math.max(1, Math.floor(Math.random() * nodes.length))
    store.addSelectedNodes(Array.from({ length: count }, (_, i) => store.getNodes.value[i]))
    expect(store.getSelectedNodes.value).to.have.length(count)
  })

  it('adds selected edges to store', () => {
    const count = Math.max(1, Math.floor(Math.random() * edges.length))
    store.addSelectedEdges(Array.from({ length: count }, (_, i) => store.getEdges.value[i]))
    expect(store.getSelectedEdges.value).to.have.length(count)
  })
})
