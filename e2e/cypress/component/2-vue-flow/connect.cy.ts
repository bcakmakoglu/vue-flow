import { useVueFlow } from '@braks/vue-flow'

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

  it('creates connection', () => {
    cy.window().then((win) => {
      const sourceHandle = cy.get(`[data-nodeid="1"].source`)
      const targetHandle = cy.get(`[data-nodeid="2"].target`)
      targetHandle.then((handle) => {
        const target = handle[0]
        const { x, y } = target.getBoundingClientRect()

        sourceHandle
          .trigger('mousedown', {
            which: 1,
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

        cy.wait(100).then(() => {
          expect(store.edges.value).to.have.length(1)
        })
      })
    })
  })
})
