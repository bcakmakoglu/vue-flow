import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5127 + #5132: in RF the initial `fitView` is queued (`fitViewQueued`) and resolved by the
// BatchProvider when the node queue flushes — which broke when the controlled flow's `onNodesChange` produced
// no changes (#5127) or wasn't defined at all (#5132). vue-flow has no batch queue: `useFitViewOnInit`
// reactively watches `nodesInitialized` (read straight from the measured node lookup) and fits once nodes are
// measured — independent of any change handler. These tests pin that down: the initial fit fires even with
// `autoApplyChanges: false` (no auto-applied changes) and with no change listener attached.
describe('fitView on init without node changes (#5127 / #5132 are N/A)', () => {
  let store: VueFlowStore;

  const IDENTITY = { x: 0, y: 0, zoom: 1 };

  function mount(extra: Record<string, unknown>) {
    cy.vueFlow({
      fitView: true,
      // nodes placed far from the origin so a successful fit must move the viewport off the identity transform
      nodes: [
        { id: '1', position: { x: 400, y: 400 }, width: 40, height: 40, data: {} },
        { id: '2', position: { x: 700, y: 600 }, width: 40, height: 40, data: {} },
      ],
      ...extra,
    });
    cy.then(() => {
      store = getStore();
    });
  }

  it('fits on init with autoApplyChanges disabled (no changes auto-applied)', () => {
    mount({ autoApplyChanges: false });

    cy.tryAssertion(() => {
      expect(store.viewport.value, 'viewport moved off identity → fit ran').to.not.deep.eq(IDENTITY);
    });
  });

  it('fits on init with no change listener attached', () => {
    mount({});
    // deliberately register no onNodesChange / onEdgesChange handler

    cy.tryAssertion(() => {
      expect(store.viewport.value, 'viewport moved off identity → fit ran').to.not.deep.eq(IDENTITY);
    });
  });
});
