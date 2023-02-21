import App from './App.vue'

describe('Render Background', () => {
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

  it('renders background', () => {
    cy.get('.vue-flow__background').should('exist')
  })
})
