import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `findEdge`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomIndex: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * edges.length)
  })

  it('finds edge in store when passed a valid (string) and existing id', () => {
    const storedEdge = store.findEdge(edges[randomIndex].id)

    if (!storedEdge) {
      throw new Error('Edge not found in store')
    }

    expect(storedEdge.id).to.equal(edges[randomIndex].id)
  })

  it('does not find edge in store when passed invalid id', () => {
    expect(store.findEdge('some-invalid-id')).to.equal(undefined)
  })

  it('does not find edge in store when passed undefined', () => {
    expect(store.findEdge(undefined)).to.equal(undefined)
  })

  it('does not find edge in store when passed empty string', () => {
    expect(store.findEdge('')).to.equal(undefined)
  })

  it('does not find edge in store when passed number', () => {
    expect(store.findEdge(123 as any)).to.equal(undefined)
  })
})
