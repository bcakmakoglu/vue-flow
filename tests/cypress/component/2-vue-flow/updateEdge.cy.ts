import { useVueFlow } from '@vue-flow/core'

describe('Check if edges are updatable', () => {
  const store = useVueFlow({ id: 'test' })
  store.onEdgeUpdate((params) => store.updateEdge(params.edge, params.connection))

  beforeEach(() => {
    cy.vueFlow({
      fitViewOnInit: false,
      edgesUpdatable: true,
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
        {
          id: '3',
          label: 'Node 3',
          position: { x: 300, y: 0 },
        },
        {
          id: 'e1-2',
          source: '1',
          target: '2',
        },
      ],
      autoConnect: true,
    })
  })

  it('updates edge', () => {
    cy.window().then((win) => {
      const edgeAnchor = cy.get('.vue-flow__edgeupdater[data-type="target"]')
      const targetHandle = cy.get(`[data-nodeid="3"].target`)

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
            clientX: x,
            clientY: y,
            force: true,
          })
          .trigger('mouseup', {
            clientX: x,
            clientY: y,
            force: true,
            view: win,
          })

        await cy.tryAssertion(() => {
          const storedEdges = store.edges.value
          expect(storedEdges).to.have.length(1)
          expect(storedEdges[0].target).to.equal('3')
          expect(storedEdges[0].source).to.equal('1')
        })
      })
    })
  })
})
