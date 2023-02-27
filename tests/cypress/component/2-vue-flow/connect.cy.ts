import { useVueFlow } from '@vue-flow/core'

describe('Check if nodes can be connected', () => {
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

  describe('by dragging', () => {
    let startCount = 0
    let connectCount = 0
    let endCount = 0

    store.onConnectStart(() => {
      startCount++
    })

    store.onConnect(() => {
      connectCount++
    })

    store.onConnectEnd(() => {
      endCount++
    })

    beforeEach(() => {
      startCount = 0
      connectCount = 0
      endCount = 0

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
        })
      })
    })

    it('creates connection by dragging', () => {
      cy.get('.vue-flow__edge').should('have.length', 1)

      expect(store.edges.value).to.have.length(1)

      const edge = store.edges.value[0]
      expect(edge.source).to.eq('1')
      expect(edge.target).to.eq('2')

      const sourceHandleId = `1__handle-bottom`
      const targetHandleId = `2__handle-top`

      expect(edge.sourceHandle).to.eq(sourceHandleId)
      expect(edge.targetHandle).to.eq(targetHandleId)
    })

    describe('Emits events?', () => {
      it('emits onConnectStart (once)', () => {
        expect(startCount).to.eq(1)
      })

      it('emits onConnect (once)', () => {
        expect(connectCount).to.eq(1)
      })

      it('emits onConnectEnd (once)', () => {
        expect(endCount).to.eq(1)
      })
    })
  })

  describe('by clicking', () => {
    store.connectOnClick.value = true

    beforeEach(() => {
      const sourceHandle = cy.get(`[data-nodeid="1"].source`)
      const targetHandle = cy.get(`[data-nodeid="2"].target`)

      sourceHandle.click()
      targetHandle.click()

      cy.get('.vue-flow__edge').should('have.length', 1)
    })

    it('creates connection by clicking', () => {
      cy.get('.vue-flow__edge').should('have.length', 1)

      expect(store.edges.value).to.have.length(1)

      const edge = store.edges.value[0]
      expect(edge.source).to.eq('1')
      expect(edge.target).to.eq('2')

      const sourceHandleId = `1__handle-bottom`
      const targetHandleId = `2__handle-top`

      expect(edge.sourceHandle).to.eq(sourceHandleId)
      expect(edge.targetHandle).to.eq(targetHandleId)
    })
  })
})
