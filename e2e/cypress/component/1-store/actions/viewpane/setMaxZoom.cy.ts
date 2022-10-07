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
    store.setMaxZoom(2)
  })

  it('sets max-zoom in store', () => {
    expect(store.maxZoom.value).to.eq(2)
  })

  it('sets max-zoom in viewpane', () => {
    cy.viewPort().trigger('wheel', {
      deltaY: -1000,
      wheelDelta: 0,
      wheelDeltaX: 0,
      wheelDeltaY: 0,
      bubbles: true,
    })

    cy.transformationPane().should('have.css', 'transform', 'matrix(2, 0, 0, 2, -800, -236)')
  })
})
