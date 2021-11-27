import { getElements } from '../../../examples/Stress/utils'
import { useStore } from '~/composables'
import { FlowStore } from '~/types'
import { isGraphEdge, isGraphNode } from '~/utils'

describe('test store action setElements', () => {
  const setElements = async (store: FlowStore) => {
    const elements = [
      { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
      { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
      { id: 'e1-2', source: '1', target: '2', animated: true },
    ]
    await store.setElements(elements)
  }

  it('sets elements', async () => {
    const store = useStore()
    await setElements(store)
    expect(store.elements).to.have.length(3)
    store.$dispose()
  })

  context('elements pre-set', () => {
    let store: FlowStore
    beforeEach(async () => {
      store = useStore()
      await setElements(store)
    })
    afterEach(() => store.$dispose())

    it('adds elements', () => {
      store.addElements([{ id: '4', data: { label: 'Node 4' }, position: { x: 500, y: 500 } }])
      expect(store.elements).to.have.length(4)
    })

    it('parses elements to flow-elements', () => {
      store.getEdges.forEach((edge) => expect(!isGraphNode(edge)).to.be.true)
      store.getNodes.forEach((node) => expect(!isGraphEdge(node)).to.be.true)
    })

    it('parses elements to flow-elements (199 elements - stress test)', async () => {
      await store.setElements(getElements())
      store.getEdges.forEach((edge) => expect(!isGraphNode(edge)).to.be.true)
      store.getNodes.forEach((node) => expect(!isGraphEdge(node)).to.be.true)
    })

    it('has correct element ids', () => {
      store.elements.forEach((el) => expect(['1', '2', 'e1-2']).to.include(el.id))
    })

    it('has correct element types', () => {
      store.elements.forEach((el) => expect(['input', 'default']).to.include(el.type))
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
