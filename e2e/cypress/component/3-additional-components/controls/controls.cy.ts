import App from './App.vue'

describe('Render Controls', () => {
  beforeEach(() => {
    cy.mount(App, {
      attrs: {
        style: {
          width: '100vw',
          height: '100vh',
        },
      },
    })
  })

  it('renders controls', () => {
    cy.get('.vue-flow__controls').should('exist')
  })
})
