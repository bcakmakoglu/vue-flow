import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5482: with `partially=false`, full containment counts as intersecting *either way* — the
// node inside the area, or the area inside the node (the latter was previously missed).
describe('isNodeIntersecting', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({ fitView: false, nodes: [], edges: [] });
    cy.then(() => {
      store = getStore();
    });
  });

  it('treats an area fully contained in the node as intersecting (partially = false)', () => {
    cy.then(() => {
      // 200×200 node fully contains the 50×50 area
      expect(store.isNodeIntersecting({ x: 0, y: 0, width: 200, height: 200 }, { x: 50, y: 50, width: 50, height: 50 }, false)).to.eq(true);
    });
  });

  it('treats the node fully contained in the area as intersecting (partially = false)', () => {
    cy.then(() => {
      expect(store.isNodeIntersecting({ x: 50, y: 50, width: 50, height: 50 }, { x: 0, y: 0, width: 200, height: 200 }, false)).to.eq(true);
    });
  });

  it('returns false for a partial overlap when partially = false', () => {
    cy.then(() => {
      expect(store.isNodeIntersecting({ x: 0, y: 0, width: 100, height: 100 }, { x: 50, y: 50, width: 100, height: 100 }, false)).to.eq(false);
    });
  });

  it('returns true for a partial overlap when partially = true', () => {
    cy.then(() => {
      expect(store.isNodeIntersecting({ x: 0, y: 0, width: 100, height: 100 }, { x: 50, y: 50, width: 100, height: 100 }, true)).to.eq(true);
    });
  });

  it('returns false when there is no overlap', () => {
    cy.then(() => {
      expect(store.isNodeIntersecting({ x: 0, y: 0, width: 50, height: 50 }, { x: 100, y: 100, width: 50, height: 50 }, false)).to.eq(false);
    });
  });
});
