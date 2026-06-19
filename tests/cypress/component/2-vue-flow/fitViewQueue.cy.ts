import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// Port of xyflow/react's fitView queue (#5127 / #5132 context): an imperative `fitView()` requested before
// the nodes have settled — e.g. right after `addNodes` — must wait until they're measured before fitting,
// otherwise `getFitViewNodes` (which skips unmeasured nodes) frames only the old nodes and ignores the new
// ones. vue-flow now defers the fit on `nodesInitialized`.
describe('imperative fitView defers until nodes are measured', () => {
  let store: VueFlowStore;

  it('frames a freshly added node instead of fitting stale geometry', () => {
    cy.vueFlow({ fitView: false, nodes: [{ id: '1', position: { x: 0, y: 0 }, data: { label: 'a' } }] });
    cy.then(() => {
      store = getStore();
    });
    // wait for the initial node to be measured so the flow is in a settled state first
    cy.tryAssertion(() => expect(store.getInternalNode('1')?.measured?.width).to.be.greaterThan(0));

    cy.then(async () => {
      // add a far-away node, then fit immediately — node 2 is not measured yet at this point
      store.addNodes([{ id: '2', position: { x: 2000, y: 2000 }, data: { label: 'far' } }]);

      const ok = await store.fitView({ padding: 0.1 });

      expect(ok, 'fitView resolved').to.eq(true);
      // the deferral guarantee: by the time fitView resolved, node 2 had been measured
      expect(store.getInternalNode('2')?.measured?.width, 'node 2 was measured before the fit ran').to.be.greaterThan(0);
      // and the fit framed the far node → zoomed out below 1 (a stale fit of only node 1 would clamp to maxZoom)
      expect(store.viewport.value.zoom, 'fit zoomed out to include the far node').to.be.lessThan(1);
    });
  });
});
