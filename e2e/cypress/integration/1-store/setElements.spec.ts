import type { Edge, Node, SetState, VueFlowStore } from '@vue-flow/renderer'
import { isEdge, isNode, useVueFlow } from '@vue-flow/renderer'
import { getElements } from '../../../../examples/vite/src/Stress/utils'

describe('test store action setElements', () => {
  const setElements = async (setState: SetState) => {
    const nodes: Node[] = [
      { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    ]
    const edges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', animated: true }]
    setState({
      nodes,
      edges,
    })
  }

  it('sets elements', async () => {
    const { setState, nodes, edges } = useVueFlow()
    await setElements(setState)
    expect(nodes.value).to.have.length(2)
    expect(edges.value).to.have.length(1)
  })

  context('elements pre-set', () => {
    let store: VueFlowStore
    beforeEach(async () => {
      store = useVueFlow()
      await setElements(store.setState)
    })

    it('parses elements to flow-elements', () => {
      store.getEdges.value.forEach((edge) => expect(isEdge(edge)).to.be.true)
      store.getNodes.value.forEach((node) => expect(isNode(node)).to.be.true)
    })

    it('parses elements to flow-elements (199 elements - stress test)', async () => {
      const { nodes, edges } = getElements()
      store.setState({
        nodes,
        edges,
      })
      store.getEdges.value.forEach((edge) => expect(isEdge(edge)).to.be.true)
      store.getNodes.value.forEach((node) => expect(isNode(node)).to.be.true)
    })

    it('has correct element ids', () => {
      store.nodes.value.forEach((el) => expect(['1', '2']).to.include(el.id))
      store.edges.value.forEach((el) => expect(['e1-2']).to.include(el.id))
    })

    it('has correct element types', () => {
      store.nodes.value.forEach((el) => expect(['input', 'default']).to.include(el.type))
    })

    it('nodes have correct label', () => {
      store.getNodes.value.forEach((el) => {
        if (el.id === '1') expect(el.data.label).to.eq('Node 1')
        else expect(el.data.label).to.eq('Node 2')
      })
    })

    it('nodes have correct position', () => {
      store.getNodes.value.forEach((el) => {
        if (el.id === '1') expect(JSON.stringify(el.position)).to.eq(JSON.stringify({ x: 250, y: 5 }))
        else expect(JSON.stringify(el.position)).to.eq(JSON.stringify({ x: 100, y: 100 }))
      })
    })

    it('edge has correct target and source', () => {
      store.getEdges.value.forEach((el) => {
        expect(el.source).to.eq('1')
        expect(el.target).to.eq('2')
      })
    })

    it('edge has correct targetnode and sourceNode', () => {
      store.getEdges.value.forEach((el) => {
        expect(el.sourceNode.id).to.eq('1')
        expect(el.targetNode.id).to.eq('2')
      })
    })

    it('edge is animated', () => {
      store.getEdges.value.forEach((el) => expect(el.animated).to.eq(true))
    })
  })
})
