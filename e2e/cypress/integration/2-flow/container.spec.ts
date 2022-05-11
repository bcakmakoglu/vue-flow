import { mount } from '@cypress/vue'
import type { Elements } from '@braks/vue-flow'
import { VueFlow, isEdge, isNode } from '@braks/vue-flow'
import '@braks/vue-flow/dist/style.css'
import '@braks/vue-flow/dist/theme-default.css'

describe('Render VueFlow', () => {
  const elements: Elements = [
    { id: '1', type: 'input', label: 'Node 1', position: { x: 250, y: 5 } },
    { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ]

  beforeEach(() => {
    mount(VueFlow, {
      props: {
        modelValue: elements,
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
    cy.get('.vue-flow__node').should('have.length', elements.filter(isNode).length)
  })

  it('renders edges', () => cy.get('.vue-flow__edge').should('have.length', elements.filter(isEdge).length))

  it('renders correct node labels', () =>
    cy.get('.vue-flow__node').each((node) => expect(elements.some((el) => el.label === node.text())).to.be.true))

  it('renders nodes at correct position', () =>
    cy
      .get('.vue-flow__node')
      .each(
        (node) =>
          expect(
            elements.filter(isNode).some((el) => el.position.x === node.position().left && el.position.y === node.position().top),
          ).to.be.true,
      ))
})
