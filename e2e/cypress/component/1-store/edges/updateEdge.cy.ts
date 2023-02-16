import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

describe('Store Action: `updateEdge`', () => {
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

  it('updates edge', () => {
    store.updateEdge(store.edges.value[randomIndex], {
      sourceHandle: null,
      targetHandle: null,
      source: nodes[0].id,
      target: nodes[1].id,
    })

    const storedEdge = store.edges.value[randomIndex]

    expect(storedEdge.source).to.equal(nodes[0].id)
    expect(storedEdge.target).to.equal(nodes[1].id)
  })
})
