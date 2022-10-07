import { useVueFlow } from '@braks/vue-flow'
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
      deltaY: 100,
      wheelDelta: 1000,
      wheelDeltaX: 1000,
      wheelDeltaY: 1000,
      bubbles: true,
    })

    cy.transformationPane().then(($el) => {
      const transform = $el.css('transform')
      expect(transform).to.contain('matrix(0.5')
    })
  })
})
