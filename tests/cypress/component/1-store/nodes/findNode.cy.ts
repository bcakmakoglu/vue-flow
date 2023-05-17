import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `findNode`', () => {
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

  it('finds node in store', () => {
    const storedNode = store.findNode(nodes[randomIndex].id)

    if (!storedNode) {
      throw new Error('Node not found in store')
    }

    expect(storedNode.id).to.equal(nodes[randomIndex].id)
  })

  it('does not find node in store when passed invalid id', () => {
    expect(store.findNode('some-invalid-id')).to.equal(undefined)
  })

  it('does not find node in store when passed undefined', () => {
    expect(store.findNode(undefined)).to.equal(undefined)
  })

  it('does not find node in store when passed empty string', () => {
    expect(store.findNode('')).to.equal(undefined)
  })

  it('does not find node in store when passed number', () => {
    expect(store.findNode(123 as any)).to.equal(undefined)
  })
})
