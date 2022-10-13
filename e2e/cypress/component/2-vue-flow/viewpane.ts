import { getElements } from '../../utils'

const { nodes } = getElements()

describe('Viewpane drag / zoom', () => {
  beforeEach(() => {
    cy.vueFlow({
      nodes,
    })
  })

  it('drag pane', () => {
    cy.window().then((win) => {
      cy.get('.vue-flow__pane')
        .trigger('mousedown', 'center', { force: true, view: win })
        .trigger('mousemove', { force: true, clientX: 500, clientY: 250, view: win })
        .trigger('mouseup', { force: true, view: win })
    })
  })
})
