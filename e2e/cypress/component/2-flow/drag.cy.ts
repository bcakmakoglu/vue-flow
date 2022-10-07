import { getElements } from '../../utils'

const { nodes } = getElements(1, 1)

describe('Check if nodes are draggable', () => {
  beforeEach(() => {
    cy.vueFlow({
      modelValue: [nodes[0]],
    })
  })

  it('drags nodes', () => {
    cy.window().then((win) => {
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

      cy.get(`[data-id="${nodes[0].id}"]`).should('have.css', 'transform', 'matrix(1, 0, 0, 1, 17, 74)')
    })
  })
})
