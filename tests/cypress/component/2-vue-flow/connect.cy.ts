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

      cy.dragConnection('1', '2')
    })

    it('creates connection by dragging', () => {
      cy.get('.vue-flow__edge')
        .should('have.length', 1)
        .then(() => {
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
      cy.connect('1', '2')

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
