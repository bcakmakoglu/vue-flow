import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5217: a pane click clears the selection — but NOT while `elementsSelectable` is false, so a
// selection set before selection was disabled (or set programmatically) survives the click. The reset is
// centralized in the gated `resetSelectedElements` action, distinct from the unconditional
// `removeSelectedNodes`/`removeSelectedEdges` (xyflow/react's `unselectNodesAndEdges`).
describe('pane click keeps selection when elementsSelectable is false (#5217)', () => {
  let store: VueFlowStore;

  function mount(elementsSelectable: boolean) {
    cy.vueFlow({
      fitView: false,
      elementsSelectable,
      // positioned away from the pane's top-left so the click target is the pane, not the node
      nodes: [{ id: '1', position: { x: 200, y: 200 }, data: {}, selected: true }],
    });
    cy.then(() => {
      store = getStore();
    });
  }

  it('keeps the selection on a pane click while selection is disabled', () => {
    mount(false);
    cy.then(() => expect(store.getSelectedNodes.value.map(n => n.id)).to.deep.eq(['1']));

    cy.get('.vue-flow__pane').trigger('click');

    cy.tryAssertion(() => {
      expect(store.getSelectedNodes.value.map(n => n.id), 'selection survives the pane click').to.deep.eq(['1']);
    });
  });

  it('clears the selection on a pane click when selection is enabled', () => {
    mount(true);
    cy.then(() => expect(store.getSelectedNodes.value.map(n => n.id)).to.deep.eq(['1']));

    cy.get('.vue-flow__pane').trigger('click');

    cy.tryAssertion(() => {
      expect(store.getSelectedNodes.value, 'selection cleared by the pane click').to.have.length(0);
    });
  });

  it('resetSelectedElements is a no-op while disabled, but removeSelectedNodes still clears', () => {
    mount(false);

    cy.then(() => store.resetSelectedElements());
    cy.tryAssertion(() => {
      expect(store.getSelectedNodes.value.map(n => n.id), 'resetSelectedElements no-op when not selectable').to.deep.eq(['1']);
    });

    // the unconditional path still works regardless of selectability
    cy.then(() => store.removeSelectedNodes());
    cy.tryAssertion(() => {
      expect(store.getSelectedNodes.value, 'removeSelectedNodes clears regardless of selectability').to.have.length(0);
    });
  });
});
