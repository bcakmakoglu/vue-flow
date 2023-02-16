import { getElements } from '../../../utils'
import App from './App.vue'

const { nodes, edges } = getElements()

describe('Render MiniMap', () => {
  beforeEach(() => {
    cy.mount(App, {
      props: {
        nodes,
        edges,
      },
      attrs: {
        style: {
          width: '100vw',
          height: '100vh',
        },
      },
    })
  })

  it('renders minimap', () => {
    cy.get('.vue-flow__minimap').should('exist')
  })

  it('renders minimap nodes', () => {
    cy.get('.vue-flow__minimap-node').should('have.length', nodes.length)
  })
})
