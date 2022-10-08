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

  it('sets max-zoom in viewpane', () => {
    cy.viewPort().trigger('wheel', {
      deltaY: -10000,
      wheelDelta: 0,
      wheelDeltaX: 0,
      wheelDeltaY: 0,
      bubbles: true,
    })

    cy.transformationPane().then(($el) => {
      const transform = $el.css('transform')
      expect(transform).to.contain('matrix(2,')
    })
  })
})
