import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';

describe('Store Action: `setState`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow();

    cy.then(() => {
      store = getStore();
    });
  });

  it('has any initial state', () => expect(store).to.exist);

  it('has default initial state', () => {
    // a freshly-mounted flow (no element props) starts empty with an initialized viewport/dimensions
    expect(store.nodes.value).to.deep.eq([]);
    expect(store.edges.value).to.deep.eq([]);
    expect(store.viewport.value).to.exist;
    expect(store.dimensions.value).to.exist;
    expect(store.initialized.value).to.be.true;
  });

  it('sets state', () => {
    store.setState({
      zoomOnScroll: false,
    });
    expect(store.zoomOnScroll.value).to.eq(false);
  });

  it('takes initial options via props', () => {
    // options are now passed to `<VueFlow>` as props (no `useVueFlow(options)`); remount with the prop set
    cy.vueFlow({
      zoomOnScroll: false,
    });

    cy.then(() => {
      expect(getStore().zoomOnScroll.value).to.eq(false);
    });
  });

  it('gets custom node types', () => {
    store.setState({
      nodes: [
        {
          id: '1',
          position: { x: 0, y: 0 },
          type: 'custom',
        },
      ],
    });
    expect(Object.keys(store.getNodeTypes.value)).to.contain('custom');
  });

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
    });
    expect(Object.keys(store.getEdgeTypes.value)).to.contain('custom');
  });

  it('re-clamps preloaded nodes to a nodeExtent passed in the same setState call', () => {
    // regression: setState set nodeExtent via the generic loop (no recompute), so nodes adopted by the
    // earlier setNodes call were never clamped to the extent
    store.setState({
      nodes: [{ id: '1', position: { x: 500, y: 500 } }],
      nodeExtent: [
        [0, 0],
        [100, 100],
      ],
    });

    // assert the node was clamped INTO the extent, not the exact corner: the clamped value depends on the
    // node's measured size (`x_max = extentMaxX - width`), which changes once the ResizeObserver measures
    // it — so `{100,100}` only held transiently for an unmeasured 0-width node. `<= 100` holds before and
    // after measurement and still catches the regression (an unclamped node stays at 500).
    cy.tryAssertion(() => {
      const pos = store.getInternalNode('1')?.internals.positionAbsolute;
      expect(pos?.x, 'x clamped into extent').to.be.at.most(100);
      expect(pos?.y, 'y clamped into extent').to.be.at.most(100);
    });
  });
});
