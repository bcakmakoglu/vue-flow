import type { VueFlowStore } from '@vue-flow/core'
import { getStore } from '../../../support/component'

describe('Store Action: `setState`', () => {
  let store: VueFlowStore

  beforeEach(() => {
    cy.vueFlow()

    cy.then(() => {
      store = getStore()
    })
  })

  it('has any initial state', () => expect(store).to.exist)

  it('has default initial state', () => {
    // a freshly-mounted flow (no element props) starts empty with an initialized viewport/dimensions
    expect(store.nodes.value).to.deep.eq([])
    expect(store.edges.value).to.deep.eq([])
    expect(store.viewport.value).to.exist
    expect(store.dimensions.value).to.exist
    expect(store.initialized.value).to.be.true
  })

  it('sets state', () => {
    store.setState({
      zoomOnScroll: false,
    })
    expect(store.zoomOnScroll.value).to.eq(false)
  })

  it('takes initial options via props', () => {
    // options are now passed to `<VueFlow>` as props (no `useVueFlow(options)`); remount with the prop set
    cy.vueFlow({
      zoomOnScroll: false,
    })

    cy.then(() => {
      expect(getStore().zoomOnScroll.value).to.eq(false)
    })
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
