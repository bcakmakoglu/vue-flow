import { useVueFlow } from '@vue-flow/core'

describe('Check if nodes are connectable', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      fitViewOnInit: false,
      modelValue: [
        {
          id: '1',
          label: 'Node 1',
          position: { x: 0, y: 0 },
        },
        {
          id: '2',
          label: 'Node 2',
          position: { x: 300, y: 300 },
        },
      ],
      autoConnect: true,
    })
  })

  it('creates connection by dragging', () => {
    cy.window().then((win) => {
      const sourceHandle = cy.get(`[data-nodeid="1"].source`)
      const targetHandle = cy.get(`[data-nodeid="2"].target`)

      targetHandle.then((handle) => {
        const target = handle[0]
        const { x, y } = target.getBoundingClientRect()

        sourceHandle
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

        cy.get('.vue-flow__edge').should('have.length', 1)
      })
    })
  })

  it('creates connection by clicking', () => {
    store.connectOnClick.value = true

    const sourceHandle = cy.get(`[data-nodeid="1"].source`)
    const targetHandle = cy.get(`[data-nodeid="2"].target`)

    sourceHandle.click()
    targetHandle.click()

    cy.get('.vue-flow__edge').should('have.length', 1)
  })
})
