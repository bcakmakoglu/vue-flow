import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5361 (Fix/edge elevation) + #5637 (feat(nodes-edges): add zIndexMode): an edge's z-index is
// computed by the system's `getElevatedEdgeZIndex` — the base `zIndex`, +1000 when the edge is selected (with
// `elevateEdgesOnSelect`), and lifted by the `z` of any parented (child) endpoint so edges touching a child
// render above the parent. `zIndexMode: 'manual'` bypasses all elevation and uses the explicit `zIndex` verbatim.
//
// Each edge renders inside its own `<svg>` (an unclassed, `position: absolute` element sitting in the
// `.vue-flow__edges` wrapper `<div>`), and that per-edge svg carries the computed z-index as an inline
// style — so the resolved `z-index` on it is exactly what stacks the edge. Target that svg directly:
// `.closest('.vue-flow__edges')` would resolve to the shared wrapper div (no z-index), so use the svg.
describe('edge z-index (elevation + zIndexMode)', () => {
  function edgeZ(id: string) {
    return cy.get(`.vue-flow__edge[data-id="${id}"]`).closest('svg');
  }

  it('a plain edge between root nodes has z-index 0', () => {
    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: {} },
        { id: 'b', position: { x: 200, y: 0 }, data: {} },
      ],
      edges: [{ id: 'a-b', source: 'a', target: 'b' }],
    });

    edgeZ('a-b').should('have.css', 'z-index', '0');
  });

  it('an edge touching a child node is elevated to the child z (parent z + 1)', () => {
    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: 'p', position: { x: 0, y: 0 }, style: { width: 300, height: 300 }, data: {} },
        { id: 'c', position: { x: 20, y: 20 }, parentId: 'p', data: {} },
        { id: 'n', position: { x: 400, y: 0 }, data: {} },
      ],
      edges: [{ id: 'c-n', source: 'c', target: 'n' }],
    });

    cy.then(() => {
      const store: VueFlowStore = getStore();
      // child z = parent z (0) + 1 — the elevation the edge inherits
      expect(store.getInternalNode('c')!.internals.z).to.eq(1);
    });

    edgeZ('c-n').should('have.css', 'z-index', '1');
  });

  it('a selected edge is elevated by +1000 when elevateEdgesOnSelect is on', () => {
    cy.vueFlow({
      fitView: false,
      elevateEdgesOnSelect: true,
      nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: {} },
        { id: 'b', position: { x: 200, y: 0 }, data: {} },
      ],
      edges: [{ id: 'a-b', source: 'a', target: 'b', zIndex: 5, selected: true }],
    });

    edgeZ('a-b').should('have.css', 'z-index', '1005');
  });

  it('zIndexMode "manual" uses the explicit zIndex verbatim (no elevation)', () => {
    cy.vueFlow({
      fitView: false,
      zIndexMode: 'manual',
      elevateEdgesOnSelect: true,
      nodes: [
        { id: 'p', position: { x: 0, y: 0 }, style: { width: 300, height: 300 }, data: {} },
        { id: 'c', position: { x: 20, y: 20 }, parentId: 'p', data: {} },
        { id: 'n', position: { x: 400, y: 0 }, data: {} },
      ],
      edges: [{ id: 'c-n', source: 'c', target: 'n', zIndex: 7, selected: true }],
    });

    // neither the child elevation nor the +1000 selection bump apply in manual mode
    edgeZ('c-n').should('have.css', 'z-index', '7');
  });

  it('a runtime-selected edge elevates dynamically (the stable-id renderer re-renders only that edge)', () => {
    cy.vueFlow({
      fitView: false,
      elevateEdgesOnSelect: true,
      nodes: [
        { id: 'a', position: { x: 0, y: 0 }, data: {} },
        { id: 'b', position: { x: 200, y: 0 }, data: {} },
      ],
      edges: [{ id: 'a-b', source: 'a', target: 'b', zIndex: 5 }],
    });

    // base z-index, not selected
    edgeZ('a-b').should('have.css', 'z-index', '5');

    // select at runtime: with the stable-id v-for + v-memo, `EdgeRenderer` does NOT re-render (membership
    // unchanged), so the edge's own wrapper must self-re-render and lift z by +1000 — the dynamic path the
    // other specs (which mount already-selected) don't exercise.
    cy.then(() => {
      const store: VueFlowStore = getStore();
      store.setEdges(store.edges.value.map(edge => (edge.id === 'a-b' ? { ...edge, selected: true } : edge)));
    });

    edgeZ('a-b').should('have.css', 'z-index', '1005');
  });
});
