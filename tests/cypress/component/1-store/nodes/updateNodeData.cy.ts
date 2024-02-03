import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `updateNodeData`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomIndex: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * nodes.length)
  })

  it('updates node data from object', () => {
    const nodeId = nodes[randomIndex].id
    const testData = Date.now().toString()

    store.updateNodeData(nodeId, { randomData: testData })

    const updatedNode = store.findNode(nodeId)

    if (!updatedNode) {
      throw new Error('Node not found in store')
    }

    expect(updatedNode.id).to.equal(nodeId)
    expect(updatedNode.data.randomData).to.equal(testData)
  })

  it('updates node data from function', () => {
    const nodeId = nodes[randomIndex].id

    let testData = ''

    store.updateNodeData(nodeId, (node) => {
      testData = node.data.randomData + Date.now().toString()

      return { randomData: testData }
    })

    const updatedNode = store.findNode(nodeId)

    if (!updatedNode) {
      throw new Error('Node not found in store')
    }

    expect(updatedNode.id).to.equal(nodeId)
    expect(updatedNode.data.randomData).to.equal(testData)
  })

  it('replaces node data when `replace` option is true', () => {
    const nodeId = nodes[randomIndex].id
    const testData = Date.now().toString()

    store.updateNodeData(nodeId, { testData }, { replace: true })

    const updatedNode = store.findNode(nodeId)

    if (!updatedNode) {
      throw new Error('Node not found in store')
    }

    expect(updatedNode.id).to.equal(nodeId)
    expect(updatedNode.data.testData).to.equal(testData)
    expect(updatedNode.data.randomData).to.not.exist
  })
})
