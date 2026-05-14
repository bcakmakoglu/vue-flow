import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeSelectedNodes` / `removeSelectedEdges`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  // NOTE: `addSelectedNodes` deselects edges (and vice versa) when `multiSelectionActive` is false.
  // Tests below act on one collection at a time to keep behaviour deterministic.

  it('removes passed nodes from the node selection', () => {
    const selectCount = Math.max(2, Math.floor(nodes.length / 2))
    const removeCount = Math.floor(selectCount / 2)

    store.addSelectedNodes(Array.from({ length: selectCount }, (_, i) => store.getNodes.value[i]))
    store.removeSelectedNodes(Array.from({ length: removeCount }, (_, i) => store.getNodes.value[i]))

    expect(store.getSelectedNodes.value).to.have.length(selectCount - removeCount)
  })

  it('removes passed edges from the edge selection', () => {
    const selectCount = Math.max(2, Math.floor(edges.length / 2))
    const removeCount = Math.floor(selectCount / 2)

    store.addSelectedEdges(Array.from({ length: selectCount }, (_, i) => store.getEdges.value[i]))
    store.removeSelectedEdges(Array.from({ length: removeCount }, (_, i) => store.getEdges.value[i]))

    expect(store.getSelectedEdges.value).to.have.length(selectCount - removeCount)
  })

  it('resets all selected nodes/edges when no argument is passed', () => {
    const selectCount = Math.max(1, Math.floor(nodes.length / 2))

    store.addSelectedNodes(Array.from({ length: selectCount }, (_, i) => store.getNodes.value[i]))
    store.addSelectedEdges(Array.from({ length: selectCount }, (_, i) => store.getEdges.value[i]))

    store.removeSelectedNodes()
    store.removeSelectedEdges()

    expect(store.getSelectedNodes.value).to.have.length(0)
    expect(store.getSelectedEdges.value).to.have.length(0)
  })
})
