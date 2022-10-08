import { useVueFlow } from '@braks/vue-flow'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store State: `selectionKeyCode`', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  it('triggers selection', () => {
    cy.window().then((win) => {
      cy.get('body').trigger('keydown', { key: 'Shift', release: false })

      cy.get('.vue-flow__selectionpane')
        .should('exist')
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
        .click()

      cy.get('body').trigger('keyup', { key: 'Shift', release: true })

      cy.wait(1).then(() => {
        expect(store.getSelectedElements.value).to.not.have.length(0)
      })
    })
  })

  it('changes keycode', () => {
    cy.window().then((win) => {
      store.selectionKeyCode.value = 'Control'
      cy.get('body').trigger('keydown', { key: 'Control', release: false })

      cy.get('.vue-flow__selectionpane')
        .should('exist')
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
        .click()

      cy.get('body').trigger('keyup', { key: 'Control', release: true })

      cy.wait(1).then(() => {
        expect(store.getSelectedElements.value).to.not.have.length(0)
      })
    })
  })

  it('allows `true` as keycode', () => {
    cy.window().then((win) => {
      store.selectionKeyCode.value = true

      cy.get('.vue-flow__selectionpane')
        .should('exist')
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
        .click()

      cy.wait(1).then(() => {
        expect(store.getSelectedElements.value).to.not.have.length(0)
      })
    })
  })
})
