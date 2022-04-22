import { isRef } from 'vue'
import { useVueFlow, State } from '@braks/vue-flow'

describe('test store state', () => {
  let store = useVueFlow()

  const initial = useVueFlow({ id: 'initial' })

  beforeEach(() => (store = useVueFlow()))

  it('has any initial state', () => expect(store).to.exist)

  it('has default initial state', () => {
    Object.keys(store).forEach((state) => {
      const storedState = store[<keyof State>state]?.value
      const initialVal = initial[<keyof State>state]?.value

      if (state === 'initialized') return expect(storedState).to.be.true

      if (state === 'getEdgeTypes' || state === 'getNodeTypes' || state === 'nodeTypes' || state === 'edgeTypes') return

      if (Array.isArray(initialVal)) return expect((storedState as any[]).length).to.eq(initialVal.length)

      if (!(initialVal instanceof Function) && !isRef(initialVal)) {
        return expect(JSON.stringify(storedState)).to.eq(JSON.stringify(initialVal))
      }
    })
  })

  it('sets state', () => {
    store.setState({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll.value).to.eq(false)
  })

  it('takes initial options', () => {
    store = useVueFlow({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll.value).to.eq(false)
  })

  it('gets custom node types', () => {
    store.setState({
      nodes: [
        {
          id: '1',
          position: { x: 0, y: 0 },
          type: 'custom',
        },
      ],
    })
    expect(Object.keys(store.getNodeTypes.value)).to.contain('custom')
  })

  it('gets custom edge types', () => {
    store.setState({
      nodes: [
        {
          id: '1',
          position: { x: 0, y: 0 },
        },
        {
          id: '2',
          position: { x: 50, y: 50 },
        },
      ],
      edges: [
        {
          id: '1',
          source: '1',
          target: '2',
          type: 'custom',
        },
      ],
    })
    expect(Object.keys(store.getEdgeTypes.value)).to.contain('custom')
  })
})
