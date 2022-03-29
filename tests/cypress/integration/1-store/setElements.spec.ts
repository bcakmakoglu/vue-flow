import { useVueFlow, isEdge, isNode, Edge, FlowStore, Node } from '@braks/vue-flow'
import { getElements } from '../../../../examples/src/Stress/utils'

describe('test store action setElements', () => {
  const setElements = async (store: FlowStore) => {
    const nodes: Node[] = [
      { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    ]
    const edges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', animated: true }]
    store.setState({
      nodes,
      edges,
    })
  }

  it('sets elements', async () => {
    const { store } = useVueFlow()
    await setElements(store)
    expect(store.nodes).to.have.length(2)
    expect(store.edges).to.have.length(1)
  })

  context('elements pre-set', () => {
    let store: FlowStore
    beforeEach(async () => {
      const { store: flowStore } = useVueFlow()
      store = flowStore
      await setElements(store)
    })

    it('parses elements to flow-elements', () => {
      store.getEdges.forEach((edge) => expect(!isEdge(edge)).to.be.true)
      store.getNodes.forEach((node) => expect(!isNode(node)).to.be.true)
    })

    it('parses elements to flow-elements (199 elements - stress test)', async () => {
      const { nodes, edges } = getElements()
      store.setState({
        nodes,
        edges,
      })
      store.getEdges.forEach((edge) => expect(!isEdge(edge)).to.be.true)
      store.getNodes.forEach((node) => expect(!isNode(node)).to.be.true)
    })

    it('has correct element ids', () => {
      store.nodes.forEach((el) => expect(['1', '2']).to.include(el.id))
      store.edges.forEach((el) => expect(['e1-2']).to.include(el.id))
    })

    it('has correct element types', () => {
      store.nodes.forEach((el) => expect(['input', 'default']).to.include(el.type))
    })

    it('nodes have correct label', () => {
      store.getNodes.forEach((el) => {
        if (el.id === '1') expect(el.data.label).to.eq('Node 1')
        else expect(el.data.label).to.eq('Node 2')
      })
    })

    it('nodes have correct position', () => {
      store.getNodes.forEach((el) => {
        if (el.id === '1') expect(JSON.stringify(el.position)).to.eq(JSON.stringify({ x: 250, y: 5 }))
        else expect(JSON.stringify(el.position)).to.eq(JSON.stringify({ x: 100, y: 100 }))
      })
    })

    it('edge has correct target and source', () => {
      store.getEdges.forEach((el) => {
        expect(el.source).to.eq('1')
        expect(el.target).to.eq('2')
      })
    })

    it('edge has correct targetnode and sourceNode', () => {
      store.getEdges.forEach((el) => {
        expect(el.sourceNode.id).to.eq('1')
        expect(el.targetNode.id).to.eq('2')
      })
    })

    it('edge is animated', () => {
      store.getEdges.forEach((el) => expect(el.animated).to.eq(true))
    })
  })
})
