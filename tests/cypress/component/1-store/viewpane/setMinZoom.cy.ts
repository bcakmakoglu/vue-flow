import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

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
      deltaY: 10000,
      wheelDelta: 0,
      wheelDeltaX: 0,
      wheelDeltaY: 0,
      bubbles: true,
    })

    cy.transformationPane().should(
      'have.css',
      'transform',
      `matrix(${store.viewport.value.zoom}, 0, 0, ${store.viewport.value.zoom}, ${store.viewport.value.x}, ${store.viewport.value.y})`,
    )
  })
})
