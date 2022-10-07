import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../../utils'

const { nodes } = getElements()

describe('Store Action: `setMinZoom`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
    })
  })

  beforeEach(() => {
    store.setMinZoom(0.5)
  })

  it('sets min-zoom in store', () => {
    expect(store.minZoom.value).to.eq(0.5)
  })

  it('sets min-zoom in viewpane', () => {
    cy.viewPort().trigger('wheel', {
      deltaY: 100,
      wheelDelta: 1000,
      wheelDeltaX: 1000,
      wheelDeltaY: 1000,
      bubbles: true,
    })

    cy.transformationPane().should('have.css', 'transform', 'matrix(0.5, 0, 0, 0.5, -12.5, 128.5)')
  })
})
