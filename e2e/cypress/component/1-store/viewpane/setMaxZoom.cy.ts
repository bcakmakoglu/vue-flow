import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes } = getElements()

describe('Store Action: `setMaxZoom`', () => {
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

  it('sets max-zoom in viewpane', async () => {
    cy.viewPort().trigger('wheel', {
      deltaY: -10000,
      wheelDelta: 0,
      wheelDeltaX: 0,
      wheelDeltaY: 0,
      bubbles: true,
    })

    await cy.tryAssertion(() => {
      cy.transformationPane().should(
        'have.css',
        'transform',
        `matrix(${store.viewport.value.zoom}, 0, 0, ${store.viewport.value.zoom}, ${store.viewport.value.x}, ${store.viewport.value.y})`,
      )
    })
  })
})
