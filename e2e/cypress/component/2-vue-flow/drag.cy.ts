import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../utils'

const { nodes } = getElements(1, 1)

describe('Check if nodes are draggable', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      modelValue: [nodes[0]],
    })
  })

  it('drags nodes', () => {
    cy.window().then(async (win) => {
      cy.get(`[data-id="${nodes[0].id}"]`)
        .trigger('mousedown', {
          which: 1,
          force: true,
          view: win,
        })
        .trigger('mousemove', {
          clientX: 100,
          clientY: 100,
          force: true,
        })
        .trigger('mouseup', {
          force: true,
          view: win,
        })

      await cy.tryAssertion(() => {
        cy.get(`[data-id="${nodes[0].id}"]`)
          .should('be.visible')
          .should(
            'have.css',
            'transform',
            `matrix(1, 0, 0, 1, ${store.nodes.value[0].computedPosition.x}, ${store.nodes.value[0].computedPosition.x})`,
          )
      })
    })
  })
})
