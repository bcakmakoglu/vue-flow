import { useVueFlow } from '~/composables'
import { FlowState, FlowStore } from '~/types'
import useState from '~/store/state'
describe('test store state', () => {
  let store: FlowStore

  beforeEach(() => ({ store } = useVueFlow()))

  it('has any initial state', () => {
    expect(store.state).to.exist
  })

  it('has default initial state', () => {
    const initial = useState()
    Object.keys(store.state).forEach((state) => {
      const storedState = store[<keyof FlowState>state]
      const initialVal = initial[<keyof FlowState>state]
      if (state === 'initialized') return expect(storedState).to.be.true
      expect(JSON.stringify(storedState)).to.eq(JSON.stringify(initialVal))
    })
  })

  it('sets state', () => {
    store.setState({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll).to.eq(false)
  })

  it('takes initial options', () => {
    const { store } = useVueFlow({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll).to.eq(false)
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
    expect(Object.keys(store.getNodeTypes)).to.contain('custom')
  })

  it('gets custom edge types', () => {
    store.setState({
      edges: [
        {
          id: '1',
          source: '1',
          target: '2',
          type: 'custom',
        },
      ],
    })
    expect(Object.keys(store.getEdgeTypes)).to.contain('custom')
  })
})
