import { getElements } from '../../utils'

const { nodes, edges } = getElements()

describe('Render Basic Example', () => {
  beforeEach(() => {
    cy.vueFlow({
      modelValue: [...nodes, ...edges],
    })
  })

  it('renders a Vue Flow container', () => {
    cy.get('.vue-flow').should('exist')
  })

  it('renders nodes', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length)
  })

  it('renders edges', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length)
  })

  it('renders correct node labels', () => {
    cy.get('.vue-flow__node').each((node) => expect(nodes.some((el) => el.label === node.text())).to.be.true)
  })

  it('renders nodes at correct position', () => {
    cy.get('.vue-flow__node').each((el) => {
      const node = nodes.find((node) => node.id === el.attr('data-id'))!

      expect(node).to.exist

      expect(el)
        .to.have.css('transform')
        .and.match(new RegExp(`matrix\\(1, 0, 0, 1, ${node.position.x}, ${node.position.y}\\)`))
    })
  })
})
