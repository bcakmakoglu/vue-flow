import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `updateNode`', () => {
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

  it('updates node from object', () => {
    const nodeId = nodes[randomIndex].id

    const newPosition = {
      x: Math.random() * 100,
      y: Math.random() * 100,
    }

    store.updateNode(nodeId, { position: newPosition })

    const updatedNode = store.findNode(nodeId)

    if (!updatedNode) {
      throw new Error('Node not found in store')
    }

    expect(updatedNode.id).to.equal(nodeId)
    expect(updatedNode.position.x).to.equal(newPosition.x)
    expect(updatedNode.position.y).to.equal(newPosition.y)
  })

  it('updates node from function', () => {
    const nodeId = nodes[randomIndex].id

    let newPosition = {
      x: 0,
      y: 0,
    }

    store.updateNode(nodeId, (node) => {
      newPosition = {
        x: node.position.x + 10,
        y: node.position.y + 10,
      }

      return { position: newPosition }
    })

    const updatedNode = store.findNode(nodeId)

    if (!updatedNode) {
      throw new Error('Node not found in store')
    }

    expect(updatedNode.id).to.equal(nodeId)
    expect(updatedNode.position.x).to.equal(newPosition.x)
    expect(updatedNode.position.y).to.equal(newPosition.y)
  })

  it('replaces node when `options.replace` is true', () => {
    const nodeId = nodes[randomIndex].id
    const testLabel = Date.now().toString()

    const newNode = {
      id: nodeId,
      label: testLabel,
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
    }

    store.updateNode(nodeId, newNode, { replace: true })

    const updatedNode = store.findNode(nodeId)

    if (!updatedNode) {
      throw new Error('Node not found in store')
    }

    expect(updatedNode.id).to.equal(nodeId)
    expect(updatedNode.position.x).to.equal(newNode.position.x)
    expect(updatedNode.position.y).to.equal(newNode.position.y)
    expect(updatedNode.data).to.equal(undefined)
  })
})
