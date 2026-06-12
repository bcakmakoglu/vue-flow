import type { VueFlowStore } from '@vue-flow/core'
import { getStore } from '../../../support/component'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

describe('Store Action: `reconnectEdge`', () => {
  let store: VueFlowStore
  let randomIndex: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })

    cy.then(() => {
      store = getStore()
    })
  })

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * edges.length)
  })

  it('updates edge', () => {
    store.reconnectEdge(store.edges.value[randomIndex], {
      sourceHandle: null,
      targetHandle: null,
      source: nodes[0].id,
      target: nodes[1].id,
    })

    const storedEdge = store.edges.value[randomIndex]

    expect(storedEdge.source).to.equal(nodes[0].id)
    expect(storedEdge.target).to.equal(nodes[1].id)
  })

  // regression: `reconnectEdge` used to rebuild the connection lookup from ONLY the updated edge
  // (`updateConnectionLookup` clears it first), erasing every other edge's connections
  it('keeps other edges in the connection lookup', () => {
    const edgeToUpdate = store.edges.value.find((edge) => edge.source === '2' && edge.target === '3')

    if (!edgeToUpdate) {
      throw new Error('Edge 2->3 not found in store')
    }

    store.reconnectEdge(edgeToUpdate, {
      sourceHandle: null,
      targetHandle: null,
      source: '2',
      target: '4',
    })

    const lookup = store.connectionLookup.value

    expect(lookup.get('1-source')?.size, 'connections of untouched edge 1->2').to.equal(1)
    expect(lookup.get('3-source')?.size, 'connections of untouched edge 3->4').to.equal(1)
    expect(lookup.get('4-target')?.size, 'connections of node 4 after reconnect').to.equal(2)
  })
})
