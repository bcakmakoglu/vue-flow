import type { StartHandle } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements(2, 2)

describe('Store Action: `startConnection`, `updateConnection`, `endConnection`', () => {
  const store = useVueFlow({ id: 'test' })
  const startHandle: StartHandle = { nodeId: nodes[0].id, type: 'source', handleId: null }

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  it('starts connection', () => {
    store.startConnection(startHandle, { x: 0, y: 0 })

    const storedStartHandle = store.connectionStartHandle.value
    expect(storedStartHandle?.handleId).to.equal(startHandle.handleId)
    expect(storedStartHandle?.nodeId).to.equal(startHandle.nodeId)
    expect(storedStartHandle?.type).to.equal(startHandle.type)
    expect(store.connectionPosition.value).to.deep.equal({ x: 0, y: 0 })
  })

  it('updates connection', () => {
    store.startConnection(startHandle, { x: 0, y: 0 })
    store.updateConnection({ x: 100, y: 100 })

    expect(store.connectionPosition.value).to.deep.equal({ x: 100, y: 100 })
  })

  it('shows connection line on viewpane', () => {
    store.startConnection(startHandle, { x: 0, y: 0 })
    store.updateConnection({ x: 100, y: 100 })

    cy.viewPort().find('.vue-flow__connection').should('exist')
  })

  it('ends/cancels connection', () => {
    store.startConnection(startHandle, { x: 0, y: 0 })
    store.updateConnection({ x: 100, y: 100 })
    store.endConnection()

    expect(store.connectionStartHandle.value).to.equal(null)
    expect(store.connectionPosition.value).to.deep.equal({ x: NaN, y: NaN })
    cy.viewPort().find('.vue-flow__connection').should('not.exist')
  })
})
