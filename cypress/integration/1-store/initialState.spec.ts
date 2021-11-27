import { useStore } from '~/composables'
import { initialState } from '~/utils'
import { FlowState } from '~/types'
describe('flow store', () => {
  it('has any initial state', () => {
    const store = useStore()
    expect(store.$state).to.exist
    store.$dispose()
  })

  it('has default initial state', () => {
    const store = useStore()
    const initial = initialState()
    Object.keys(store.$state).forEach((state) => {
      const storedState = store[<keyof FlowState>state]
      const initialVal = initial[<keyof FlowState>state]
      expect(JSON.stringify(storedState)).to.eq(JSON.stringify(initialVal))
    })
    store.$dispose()
  })

  it('has state with options', () => {
    const store = useStore({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll).to.eq(false)
    store.$dispose()
  })
})
