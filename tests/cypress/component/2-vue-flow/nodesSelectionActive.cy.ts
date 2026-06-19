import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// `nodesSelectionActive` (the visual multi-selection box) only ever turns on via a user drag-select. If the
// selected nodes later empty out (e.g. they were deleted), it must turn back off — otherwise a subsequent
// programmatic select would wrongly render the `NodesSelection` rect. See xyflow/react #5727.
describe('nodesSelectionActive auto-clear', () => {
  let store: VueFlowStore;

  function mount(nodes: { id: string; position: { x: number; y: number }; data: object; selected?: boolean }[]) {
    cy.vueFlow({ fitView: false, nodes });
    cy.then(() => {
      store = getStore();
    });
  }

  it('clears when the last selected node is removed', () => {
    mount([{ id: '1', position: { x: 0, y: 0 }, data: {}, selected: true }]);

    cy.then(() => {
      // simulate the state left behind by a drag-select
      store.nodesSelectionActive.value = true;
      // re-commit nodes with nothing selected (mirrors deleting the selected node)
      store.setNodes([{ id: '2', position: { x: 100, y: 100 }, data: {} }]);
    });

    cy.tryAssertion(() => {
      expect(store.nodesSelectionActive.value, 'selection box cleared once no node is selected').to.eq(false);
    });
  });

  it('does not clear while a selected node remains', () => {
    mount([{ id: '1', position: { x: 0, y: 0 }, data: {}, selected: true }]);

    cy.then(() => {
      store.nodesSelectionActive.value = true;
      // re-commit nodes while keeping the selection (adds a node, node 1 stays selected)
      store.setNodes([
        { id: '1', position: { x: 0, y: 0 }, data: {}, selected: true },
        { id: '2', position: { x: 100, y: 100 }, data: {} },
      ]);
    });

    cy.then(() => {
      expect(store.nodesSelectionActive.value, 'selection box kept while a node is selected').to.eq(true);
    });
  });

  it('does not revive the selection box for a later programmatic select', () => {
    // the full #5727 repro: select → delete (box goes stale) → add + select a new node → box must stay off
    mount([{ id: '1', position: { x: 0, y: 0 }, data: {}, selected: true }]);

    cy.then(() => {
      store.nodesSelectionActive.value = true;
      store.setNodes([]); // delete the selected node → box clears
    });

    cy.tryAssertion(() => {
      expect(store.nodesSelectionActive.value).to.eq(false);
    });

    cy.then(() => {
      // add and immediately select a brand-new node
      store.setNodes([{ id: '2', position: { x: 100, y: 100 }, data: {}, selected: true }]);
    });

    cy.then(() => {
      expect(store.nodesSelectionActive.value, 'no stale selection box around the new node').to.eq(false);
    });
  });
});
