import { mount } from '@cypress/vue'
import VueFlow from '../../../src/container/VueFlow/VueFlow.vue'
import { Elements } from '~/types'
import { isEdge, isNode } from '~/utils'

describe('Render VueFlow', () => {
  const elements: Elements = [
    { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ]

  it('renders a Vue Flow container', () => {
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

    cy.get('.vue-flow')
      .should('exist')
      .get('.vue-flow__node')
      .should('have.length', elements.filter(isNode).length)
      .get('.vue-flow__edge')
      .should('have.length', elements.filter(isEdge).length)
  })
})
