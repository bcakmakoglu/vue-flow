import { useVueFlow } from '@braks/vue-flow'
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
    expect(storedNode?.id).to.equal(nodes[randomIndex].id)
  })

  it('does not find node in store when passed invalid id', () => {
    expect(store.findNode('-123')).to.equal(undefined)
  })
})
