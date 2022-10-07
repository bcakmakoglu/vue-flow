import { useVueFlow } from '@braks/vue-flow'
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

  it('finds edge in store', () => {
    const storedEdge = store.findEdge(edges[randomIndex].id)
    expect(storedEdge?.id).to.equal(edges[randomIndex].id)
  })

  it('does not find edge in store when passed invalid id', () => {
    expect(store.findEdge('-123')).to.equal(undefined)
  })
})
