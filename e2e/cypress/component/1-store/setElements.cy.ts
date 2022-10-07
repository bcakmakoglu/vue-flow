import { isEdge, isNode, useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../utils'

const { nodes, edges } = getElements()

describe('test store action setElements', () => {
  const store = useVueFlow()

  it('sets elements', () => {
    store.setElements([...nodes, ...edges])

    expect(store.nodes.value).to.have.length(nodes.length)
    expect(store.edges.value).to.have.length(edges.length)
  })

  context('elements pre-set', () => {
    it('parses elements to flow-elements', () => {
      store.getEdges.value.forEach((edge) => expect(isEdge(edge)).to.be.true)
      store.getNodes.value.forEach((node) => expect(isNode(node)).to.be.true)
    })

    it('has correct element ids', () => {
      const nodeIds = nodes.map((node) => node.id)
      const edgeIds = edges.map((edge) => edge.id)

      store.nodes.value.forEach((el) => expect(nodeIds).to.include(el.id))
      store.edges.value.forEach((el) => expect(edgeIds).to.include(el.id))
    })

    it('has correct element types', () => {
      const nodeTypes = nodes.map((node) => node.type)
      store.nodes.value.forEach((el) => expect(nodeTypes).to.include(el.type))
      const edgeTypes = edges.map((edge) => edge.type)
      store.edges.value.forEach((el) => expect(edgeTypes).to.include(el.type))
    })

    describe('test node properties', () => {
      it('has correct label', () => {
        store.getNodes.value.forEach((el) => {
          const node = nodes.find((node) => node.id === el.id)
          expect(el.label).to.eq(node?.label)
        })
      })

      it('has correct position', () => {
        store.getNodes.value.forEach((el) => {
          const node = nodes.find((node) => node.id === el.id)
          expect(JSON.stringify(el.position)).to.eq(JSON.stringify(node?.position || {}))
        })
      })

      it('has correct random data', () => {
        store.getNodes.value.forEach((el) => {
          const node = nodes.find((node) => node.id === el.id)
          expect(el.data.randomData).to.eq(node?.data.randomData)
        })
      })
    })

    describe('test edge properties', () => {
      it('has correct target and source', () => {
        store.getEdges.value.forEach((el) => {
          const edge = edges.find((edge) => edge.id === el.id)

          expect(el.source).to.eq(edge?.source)
          expect(el.target).to.eq(edge?.target)
        })
      })

      it('has correct target-node and source-node', () => {
        store.getEdges.value.forEach((el) => {
          const edge = edges.find((edge) => edge.id === el.id)

          expect(el.sourceNode.id).to.eq(edge?.source)
          expect(el.targetNode.id).to.eq(edge?.target)
        })
      })

      it('has correct random data', () => {
        store.getEdges.value.forEach((el) => {
          const edge = nodes.find((edge) => edge.id === el.id)
          expect(el.data.randomData).to.eq(edge?.data.randomData)
        })
      })

      it('is animated', () => {
        store.getEdges.value.forEach((el) => {
          const edge = edges.find((edge) => edge.id === el.id)

          expect(el.animated).to.eq(edge?.animated)
        })
      })
    })
  })
})
