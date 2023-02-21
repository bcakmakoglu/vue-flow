import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../utils'

const { nodes } = getElements()

describe('Viewport drag / zoom', () => {
  const store = useVueFlow({ id: 'test' })
  beforeEach(() => {
    cy.vueFlow({
      nodes,
    })
  })

  it('drags pane', () => {
    cy.window().then(async (win) => {
      cy.get('.vue-flow__pane')
        .should('be.visible')
        .trigger('mousedown', 'center', { force: true, view: win })
        .trigger('mousemove', {
          force: true,
          clientX: -(store.dimensions.value.width / 10),
          clientY: store.dimensions.value.height / 2,
          view: win,
        })
        .trigger('mouseup', { force: true, view: win })

      await cy.tryAssertion(() => {
        cy.transformationPane()
          .should('exist')
          .should(
            'have.css',
            'transform',
            `matrix(${store.viewport.value.zoom}, 0, 0, ${store.viewport.value.zoom}, ${store.viewport.value.x}, ${store.viewport.value.y})`,
          )
      })
    })
  })
})
