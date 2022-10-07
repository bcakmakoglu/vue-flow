import { VueFlow } from '@braks/vue-flow'
import { getElements } from '../../utils'

const { nodes, edges } = getElements()

describe('render Vue Flow', () => {
  beforeEach(() => {
    cy.mount(VueFlow, {
      props: {
        modelValue: [...nodes, ...edges],
      },
      attrs: {
        key: 'flowy',
        style: {
          height: '100vh',
          width: '100vw',
        },
      },
    })
  })

  it('renders a Vue Flow container', () => {
    cy.get('.vue-flow').should('exist')
  })

  it('renders nodes', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length)
  })

  it('renders edges', () => cy.get('.vue-flow__edge').should('have.length', edges.length))

  it('renders correct node labels', () =>
    cy.get('.vue-flow__node').each((node) => expect(nodes.some((el) => el.label === node.text())).to.be.true))

  it('renders nodes at correct position', () =>
    cy
      .get('.vue-flow__node')
      .each(
        (node) =>
          expect(nodes.some((el) => el.position.x === node.position().left && el.position.y === node.position().top)).to.be.true,
      ))
})
