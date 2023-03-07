import { useVueFlow } from '@vue-flow/core'
import type { ValidConnectionFunc } from '@vue-flow/core'

const isValidConnection: ValidConnectionFunc = (connection) => {
  return connection.target === 'B' || connection.source === 'B'
}

describe('isValidConnection Prop', () => {
  const store = useVueFlow({ id: 'test' })
  store.onEdgeUpdate((params) => store.updateEdge(params.edge, params.connection))

  beforeEach(() => {
    cy.vueFlow({
      modelValue: [
        {
          id: 'A',
          label: 'Node A',
          position: { x: 0, y: 0 },
        },
        {
          id: 'B',
          label: 'Node B',
          position: { x: 300, y: 300 },
        },
        {
          id: 'C',
          label: 'Node C',
          position: { x: 300, y: 0 },
        },
      ],
      connectOnClick: true,
      autoConnect: true,
      edgesUpdatable: true,
      isValidConnection,
    })
  })

  it('only connectable to node with id `B`', () => {
    cy.connect('A', 'B')

    cy.get('.vue-flow__edge').should('have.length', 1)

    cy.connect('A', 'C')

    cy.get('.vue-flow__edge').should('have.length', 1)
  })

  it('cannot update to other handles', () => {
    cy.connect('A', 'B')

    cy.get('.vue-flow__edge').should('have.length', 1)

    cy.window().then((win) => {
      const edgeAnchor = cy.get(`.vue-flow__edgeupdater[data-type="target"]`)
      const targetHandle = cy.get(`[data-nodeid="C"].target`)

      targetHandle.then(async (handle) => {
        const target = handle[0]
        const { x, y } = target.getBoundingClientRect()

        edgeAnchor
          .trigger('mousedown', {
            button: 0,
            force: true,
            view: win,
          })
          .trigger('mousemove', {
            clientX: x + 5,
            clientY: y + 5,
            force: true,
          })
          .trigger('mouseup', {
            clientX: x + 5,
            clientY: y + 5,
            force: true,
            view: win,
          })

        cy.get('.vue-flow__edge[data-id="vueflow__edge-AA__handle-bottom-BB__handle-top"]').should('exist')
        cy.get('.vue-flow__edge[data-id="vueflow__edge-AA__handle-bottom-CC__handle-top"]').should('not.exist')
      })
    })
  })
})
