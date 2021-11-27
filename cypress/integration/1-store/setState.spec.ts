import { useStore } from '~/composables'
import { initialState } from '~/utils'
import { FlowState, FlowStore } from '~/types'
describe('test store state', () => {
  let store: FlowStore

  beforeEach(() => (store = useStore()))
  afterEach(() => store.$dispose())

  it('has any initial state', () => {
    expect(store.$state).to.exist
  })

  it('has default initial state', () => {
    const initial = initialState()
    Object.keys(store.$state).forEach((state) => {
      const storedState = store[<keyof FlowState>state]
      const initialVal = initial[<keyof FlowState>state]
      expect(JSON.stringify(storedState)).to.eq(JSON.stringify(initialVal))
    })
  })

  it('sets state', () => {
    store.setState({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll).to.eq(false)
  })

  it('takes options', () => {
    const store = useStore({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll).to.eq(false)
    store.$dispose()
  })
})
